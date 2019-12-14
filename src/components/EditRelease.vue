<template>
  <div id="form-release">
    <Sidebar />
    <div style="width: 85%; float:right">
      <form @submit.prevent="submit"
            class=" col-md-7 rounded"
            style="padding: 20px 40px; margin-bottom: 20px;">
        <div class="form-group row">
          <button type="button" class="btn btn-link" v-b-modal.discogsModal>Add from Disogs</button>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Title</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" required v-model="title">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Artist</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" required v-model="artist">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Label</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" required v-model="label">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Genre</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="genre">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Year</label>
          <div class="col-sm-9">
            <input type="number" class="form-control" v-model="year">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Condition</label>
          <div class="col-sm-9">
            <!-- <star-rating :star-size=25 rounded-corners v-model="condition"></star-rating> -->
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
          <label class="col-sm-3 col-form-label">Price</label>
          <div class="col-sm-9">
            <input type="number" class="form-control" v-model="price">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Notes</label>
          <div class="col-sm-9">
            <textarea maxlength="250" style="resize: none;" rows="4" class="form-control" v-model="notes">
            </textarea>
          </div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary" style="margin-right: 10px">Submit</button>
        <router-link to="/"> <button class="btn btn-danger">Cancel</button></router-link>
        </div>
      </form>
      <b-modal id="discogsModal" hide-header @ok="addFromDiscogs(discogsId)">
          <div class="d-block text-center">
            <h5>Enter the release ID:</h5>
            <b-form-input autofocus class="offset-sm-3 col-sm-6" v-model="discogsId" style="border: 1px solid #343a40">
            </b-form-input>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
  import db from '../firebase/firebase'
  import axios from 'axios'
  import firebase from 'firebase';
  import Sidebar from './Sidebar'

  export default {
    components: { Sidebar },
    props: {
      editable: {
        type: Boolean,
        default: false
      }
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
        status: null,
        discogsId: null,
      }
    },

    beforeCreate() {
      if (this.$route.params.id){
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
      }
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData () {
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

      submit() {
        this.editable ? this.updateRecord() : this.addRecord();
      },

      addRecord() {
        db.collection('shops').doc('libertine')
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
        })
        .then(() => {
          this.$router.go(-1)
        })
      },
      
      updateRecord () {
        db.collection('shops').doc('libertine').collection('collection')
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
          })
          .then(() => {
            this.$router.go(-1)
          });
        })
      },

      addFromDiscogs(id) {
        this.discogsId = null;
        axios.get(`https://api.discogs.com/releases/${id}`).then((response) => {
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
        })
        .catch(() => alert("Such release doesn't exist"))
      },
    }
  }
</script>