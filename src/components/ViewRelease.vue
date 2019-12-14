<template>
  <div id="view-record">
    <Sidebar />
    <div style="width: 85%; float:right">
      <b-card class="col-md-8" style="margin: 50px">
        
      <form @submit.prevent="submit"
            style="padding: 10px 30px; font-size: 16px" class="col-md-12">
        <div class="form-group row">
          <b-dropdown class="p-1 mb-3" variant="link" dropright toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                <div style="cursor: pointer"><i style="font-size: 20px" class="fas fa-ellipsis-h text-dark float-left"></i></div>
              </template>
              <b-dropdown-item @click="editRelease(id)">Edit</b-dropdown-item>
              <b-dropdown-item v-b-modal.deleteModal>Delete</b-dropdown-item>
            </b-dropdown>
          <div class="col-md-12 row">
            <h3 class="col-md-12"><b>{{ artist }}</b> - {{ title }}</h3>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Label: </label>
          <div class="col-md-9 form-control-plaintext">
            {{ label }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Genre: </label>
          <div class="col-md-9 form-control-plaintext">
            {{ genre }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Year: </label>
          <div class="col-md-9 form-control-plaintext">
            {{ year }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Condition: </label>
          <div class="col-md-9 form-control-plaintext">
            {{ condition }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Price: </label>
          <div class="col-md-9 form-control-plaintext">
            {{ price ? price + ' €' : '-'}}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Notes: </label>
          <div class="col-md-9 form-control-plaintext">
            <i style="font-weight: 300">{{ notes }}</i>
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

<style lang="css">
  .col-form-label{
    font-weight: 800
  }
  .dropdown-item.active, .dropdown-item:active {
    background-color: #b1b1b1;
}
  
</style>