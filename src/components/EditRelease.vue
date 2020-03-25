<template>
<div id="form-release">
  <div style="width: 85%; float:right">
    <div class="form-group row">
      <h4 class="mt-3 offset-lg-1 col">Edit Record</h4>
    </div>
    <b-card class="col-lg-10 offset-lg-1 mt-3">
      <div class="col-sm-12">
        <a href="javascript:history.go(-1)"><i class="fas fa-angle-left"></i> Back</a>
      </div>
      <form @submit.prevent="submit" class=" col-md-12 pt-2 pb-2">
        <h6 class="text-center mb-4 text-muted">Import data from Disogs:</h6>
        <div class="form-group row">
          <div class="col-sm-3 offset-md-4">
            <input placeholder="Release ID" type="text" class="form-control" v-model="discogsId">
          </div>
          <button type="button" style="height: 2rem; line-height:1.2rem" @click="addFromDiscogs(discogsId)" class="btn btn-dark">OK</button>
          <small class="col-sm-3 offset-md-4 text-danger mt-2" v-if="error">{{ error }}</small>
        </div>
        <h6 class="text-center m-4 text-muted">Add manually:</h6>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" required v-model="title">
          </div>
          <label class="col-sm-2 col-form-label">Condition</label>
          <div class="col-sm-4">
            <select class="form-control col-sm-12" v-model="condition">
              <option disabled selected value> -- Select Condition -- </option>
              <option value="M">Mint</option>
              <option value="NM">Near Mint</option>
              <option value="VG+">Very Good Plus</option>
              <option value="VG">Very Good</option>
              <option value="G">Good</option>
              <option value="P">Poor</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Artist</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" required v-model="artist">
          </div>
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="price">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Label</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="label">
          </div>
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-4">
            <select class="form-control col-sm-12" v-model="status">
              <option value="in-stock" selected>In Stock</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Genre</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="genre">
          </div>
          <label class="col-sm-2 col-form-label">Image URL</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="img_uri">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Year</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="year">
          </div>
          <label class="col-sm-2 col-form-label">Notes</label>
          <div class="col-sm-4">
            <textarea maxlength="250" style="resize: none;" rows="2" class="form-control" v-model="notes">
              </textarea>
          </div>
        </div>
        <div class="text-right mt-4">
          <button type="submit" class="btn btn-dark" style="margin-right: 10px">Save</button>
        </div>
      </form>
    </b-card>
  </div>
</div>
</template>

<script>
import db from '../firebase/firebase'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      error: null,
      id: null,
      title: null,
      artist: null,
      label: null,
      genre: null,
      year: null,
      condition: null,
      price: null,
      notes: null,
      status: 'in-stock',
      img_uri: null,
      discogsId: null,
    }
  },

  created() {
    var vm = this;
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection('users').doc(user.uid).get()
        .then((doc => vm.shop = doc.data().shop)).then(() => {
          if (vm.$route.params.id) {
            vm.fetchData()
          }
        })
    });
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData() {
      db.collection('shops').doc(this.shop).collection('collection')
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
          this.status = doc.data().status
          this.img_uri = doc.data().img_uri
        })
    },

    submit() {
      this.editable ? this.updateRecord() : this.addRecord();
    },

    addRecord() {
      db.collection('shops').doc(this.shop)
        .collection('collection').add({
          artist: this.artist,
          title: this.title,
          label: this.label,
          genre: this.genre,
          year: this.year,
          condition: this.condition,
          price: this.price,
          date_added: new Date(),
          notes: this.notes,
          status: this.status,
          img_uri: this.img_uri,
        })
        .then(() => {
          this.$router.go(-1)
        })
    },

    updateRecord() {
      db.collection('shops').doc(this.shop).collection('collection')
        .doc(this.$route.params.id).get().then((doc) => {
          doc.ref.update({
              artist: this.artist,
              title: this.title,
              label: this.label,
              genre: this.genre,
              year: this.year,
              condition: this.condition,
              price: this.price,
              notes: this.notes,
              status: this.status,
              img_uri: this.img_uri
            })
            .then(() => {
              this.$router.go(-1)
            });
        })
    },

    addFromDiscogs(id) {
      const myKey = 'RQjHhwSaMHxwGbPxJxXz';
      const mySecret = 'BIdsSStHDrPRlaWqpKiEeKTEkaHmSrwY';
      axios.get(`https://api.discogs.com/releases/${id}?key=${myKey}&secret=${mySecret}`).then((response) => {
          this.discogsId = null;
          const data = response.data;
          let artists = [];
          let labels = [];
          this.title = data.title;
          data.artists.forEach(e => artists.push(e.name))
          this.artist = artists.join(' & ');
          data.labels.forEach(e => labels.push(e.name))
          this.label = labels.join(', ');
          this.genre = data.genres.join(', ');
          this.year = data.year;
          this.img_uri = data.images[0].uri
        })
        .catch(() => this.error = 'This release couldn\'t be found')
    },
  }
}
</script>
