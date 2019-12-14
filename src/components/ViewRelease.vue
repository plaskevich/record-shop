<template>
  <div id="view-record">
    <Sidebar />
    <div style="width: 85%; float:right">
      <form @submit.prevent="submit"
            style="padding: 0 40px; font-size: 16px" class="col-sm-12">
        <div class="form-group row">
          <div class="col-sm-12 text-right">
              <button class="btn btn-link">
                <router-link v-bind:to="{ name: 'edit-release', params: { id }}">Edit</router-link>
              </button>
              <button class="btn btn-link text-danger" v-b-modal.deleteModal @click="id=data.item.id">Delete</button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <h3><b>{{ artist }}</b> - {{ title }}</h3>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Label: </label>
          <div class="col-sm-9 form-control-plaintext">
            {{ label }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Genre: </label>
          <div class="col-sm-9 form-control-plaintext">
            {{ genre }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Year: </label>
          <div class="col-sm-9 form-control-plaintext">
            {{ year }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Condition: </label>
          <div class="col-sm-9 form-control-plaintext">
            {{ condition }}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price: </label>
          <div class="col-sm-9 form-control-plaintext">
            {{ price ? price + ' €' : '-'}}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Notes: </label>
          <div class="col-sm-9 form-control-plaintext">
            <i style="font-weight: 300">{{ notes }}</i>
          </div>
        </div>
      </form>
      <b-modal id="deleteModal" hide-header @ok="deleteRelease(id)">
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

      deleteRelease(id) {
        db.collection('shops').doc('libertine').collection('collection')
        .doc(id).delete().then(() => {
          this.$router.push({ name: 'home' })
        })
      },
    }
}
</script>

<style lang="css">
  .col-form-label{
    font-weight: 800
  }
  
</style>