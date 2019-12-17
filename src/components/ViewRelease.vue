<template>
  <div>
    <div style="width: 85%; float:right">
      <b-card class="col-lg-9 offset-lg-1 mt-5">
        <form @submit.prevent="submit" style="padding: 0 20px; font-size: 16px" class="mt-2 col-lg-12">
          <div class="row float-right">
            <b-dropdown class="row" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
              <template v-slot:button-content>
                <div style="cursor: pointer"><i style="font-size: 20px" class="fas fa-ellipsis-h text-dark float-left"></i></div>
              </template>
              <b-dropdown-item @click="editRelease(id)">Edit</b-dropdown-item>
              <b-dropdown-item v-b-modal.deleteModal>Delete</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="col-sm-12 mb-5">
            <router-link to="/collection"><i class="fas fa-angle-left"></i> Back</router-link>
          </div>
          <div class="row">
            <img v-if="img_uri" style="max-with:250px; max-height: 250px" class="img img-responsive ml-4 mr-3 mb-4" :src="img_uri" alt="">
            <div class="col">
              <div class="col-lg-12">
                <div class="mb-5">
                  <h4 class="col-lg-12 pl-0"><b>{{ artist }}</b></h4>
                  <h4 class="col-lg-12 pl-0">{{ title }}</h4>
                </div>
                <div v-if="label" class="form-group row">
                  <label class="col-lg-4 col-form-label">Label: </label>
                  <div class="col form-control-plaintext">
                    {{ label }}
                  </div>
                </div>
                <div v-if="genre" class="form-group row">
                  <label class="col-lg-4 col-form-label">Genre: </label>
                  <div class="col form-control-plaintext">
                    {{ genre }}
                  </div>
                </div>
                <div v-if="year" class="form-group row">
                  <label class="col-lg-4 col-form-label">Year: </label>
                  <div class="col form-control-plaintext">
                    {{ year }}
                  </div>
                </div>
                <div v-if="condition" class="form-group row">
                  <label class="col-lg-4 col-form-label">Condition: </label>
                  <div class="col form-control-plaintext">
                    {{ condition }}
                  </div>
                </div>
                <div v-if="price" class="form-group row">
                  <label class="col-lg-4 col-form-label">Price: </label>
                  <div class="col form-control-plaintext">
                    {{ price ? price + ' €' : '-'}}
                  </div>
                </div>
                <div v-if="status" class="form-group row">
                  <label class="col-lg-4 col-form-label">Status: </label>
                  <div v-if="status==='sold'" class="text-warning col form-control-plaintext">
                    Sold
                  </div>
                  <div v-if="status==='in-stock'" class="text-success col form-control-plaintext">
                    Available
                  </div>
                </div>
                <div v-if="notes" class="form-group row">
                  <label class="col-lg-4 col-form-label">Notes: </label>
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

export default {
  created() {
    this.fetchData();
  },

  data() {
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
      status: null,
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
          this.status = doc.data().status
        })
    },

    editRelease(id) {
      this.$router.push({
        name: 'edit-release',
        params: {
          id
        }
      })
    },

    deleteRelease() {
      db.collection('shops').doc('libertine').collection('collection')
        .doc(this.id).delete().then(() => {
          this.$router.push({
            name: 'collecion'
          })
        })
    },
  }
}
</script>

<style scoped>
.col-form-label {
  font-weight: 800
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #b1b1b1;
}

.form-group {
  margin-bottom: 0 !important;
}
</style>
