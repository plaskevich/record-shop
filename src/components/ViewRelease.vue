<template>
  <div>
    <Sidebar />
    <div style="width: 85%; float:right">
      <b-card class="col-md-9 row" style="margin: 50px; padding: 20px">
        
        <form @submit.prevent="submit"
              style="padding: 0 30px; font-size: 16px" class="mt-4 col-md-12">
              <div class="row float-right">
                <b-dropdown class="float-right row" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  <div style="cursor: pointer"><i style="font-size: 20px" class="fas fa-ellipsis-v text-dark float-left"></i></div>
                </template>
                <b-dropdown-item @click="editRelease(id)">Edit</b-dropdown-item>
                <b-dropdown-item v-b-modal.deleteModal>Delete</b-dropdown-item>
              </b-dropdown>
              </div>
            <div class="row">
              <img style="max-width: 250px; max-height:250px" class="img img-responsive ml-3 mr-4 mb-4" :src="img_uri" alt="">
              <div class="form-group">
            <div class="col-md-12">
              <div class="mb-4">
                <h4 class="col-md-12 pl-0"><b>{{ artist }}</b></h4>
                <h4 class="col-md-12 pl-0">{{ title }}</h4>
              </div>
              <div v-if="label" class="form-group row">
                <label class="ml-3 col-form-label">Label: </label>
                <div class="col form-control-plaintext">
                  {{ label }}
                </div>
              </div>
          <div v-if="genre" class="form-group row">
            <label class="ml-3 col-form-label">Genre: </label>
            <div class="col form-control-plaintext">
              {{ genre }}
            </div>
          </div>
          <div v-if="year" class="form-group row">
            <label class="ml-3 col-form-label">Year: </label>
            <div class="col form-control-plaintext">
              {{ year }}
            </div>
          </div>
          <div v-if="condition" class="form-group row">
            <label class="ml-3 col-form-label">Condition: </label>
            <div class="col form-control-plaintext">
              {{ condition }}
            </div>
          </div>
          <div v-if="price" class="form-group row">
            <label class="ml-3 col-form-label">Price: </label>
            <div class="col form-control-plaintext">
              {{ price ? price + ' €' : '-'}}
            </div>
          </div>
          <div v-if="notes" class="form-group row">
            <label class="ml-3 col-form-label">Notes: </label>
            <div class="col form-control-plaintext">
              <i style="font-weight: 300">{{ notes }}</i>
            </div>
          </div>
            </div>
          </div>
          </div>
        </form>
      </b-card>
      <b-modal id="deleteModal" ok-variant="dark" cancel-variant="light" hide-header @ok="deleteRelease">
          <div class="d-block text-center">
            <h5>Are you sure you want to delete the release?</h5>
          </div>
      </b-modal>
    </div> 
  </div>
</template>

<script>
import db from '../firebase/firebase'
import Sidebar from './Sidebar'

export default {
  components: { Sidebar },
  created () {
    this.fetchData();
  },

    data () {
      return {
        id: null,
        title: null,
        artist: null,
        label: null,
        genre: null,
        year: null,
        condition: null,
        price: null,
        notes: null,
        img_uri: null,
      }
    },

    methods: {
      fetchData() {
        db.collection('shops').doc('libertine').collection('collection')
        .doc(this.$route.params.id).get().then((doc) => {
          this.id = doc.id
          this.artist = doc.data().artist
          this.title = doc.data().title
          this.label = doc.data().label
          this.genre = doc.data().genre
          this.year = doc.data().year
          this.condition = doc.data().condition
          this.price = doc.data().price
          this.notes = doc.data().notes
          this.img_uri = doc.data().img_uri
        })
      },

      editRelease(id) {
        this.$router.push({ name: 'edit-release', params: {id}})
      },

      deleteRelease() {
        db.collection('shops').doc('libertine').collection('collection')
        .doc(this.id).delete().then(() => {
          this.$router.push({ name: 'collecion' })
        })
      },
    }
}
</script>

<style scoped>
  .col-form-label{
    font-weight: 800
  }
  .dropdown-item.active, .dropdown-item:active {
    background-color: #b1b1b1;
}

.form-group {
  margin-bottom: 0!important;
}
  
</style>