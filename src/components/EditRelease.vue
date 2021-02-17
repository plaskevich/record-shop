<template>
  <div id="form-release">
    <div style="width: 85%; float: right">
      <div class="form-group row">
        <h4 v-if="editable" class="mt-3 offset-lg-1 col">Edit Record</h4>
        <h4 v-if="!editable" class="mt-3 offset-lg-1 col">Add Record</h4>
      </div>
      <b-card class="col-lg-10 offset-lg-1 mt-3">
        <div class="col-sm-12">
          <a href="javascript:history.go(-1)"
            ><i class="fas fa-angle-left"></i> Back</a
          >
        </div>
        <form @submit.prevent="submit" class="col-md-12 pt-2 pb-2">
          <h6 class="text-center mb-4 text-muted">Import data from Disogs:</h6>
          <div class="form-group row">
            <div class="col-sm-3 offset-md-4">
              <input
                id="discogs-id"
                placeholder="Release ID"
                type="text"
                class="form-control"
                v-model="discogsId"
              />
            </div>
            <button
              id="ok-btn"
              type="button"
              style="height: 2rem; line-height: 1.2rem"
              @click="addFromDiscogs(discogsId)"
              class="btn btn-dark"
            >
              OK
            </button>
            <small class="col-sm-3 offset-md-4 text-danger mt-2" v-if="error">{{
              error
            }}</small>
          </div>
          <h6 class="text-center m-4 text-muted">Add manually:</h6>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-4">
              <input
                id="title"
                type="text"
                class="form-control"
                required
                v-model="form.title"
              />
            </div>
            <label class="col-sm-2 col-form-label">Condition</label>
            <div class="col-sm-4">
              <select
                id="condition"
                class="form-control col-sm-12"
                v-model="form.condition"
                required
              >
                <option disabled selected value="null">
                  -- Select Condition --
                </option>
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
              <input
                id="artist"
                type="text"
                class="form-control"
                required
                v-model="form.artist"
              />
            </div>
            <label class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" v-model="form.price" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Label</label>
            <div class="col-sm-4">
              <input
                id="label"
                type="text"
                class="form-control"
                v-model="form.label"
              />
            </div>
            <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-4">
              <select
                id="status"
                class="form-control col-sm-12"
                v-model="form.status"
              >
                <option value="inStock" selected>In Stock</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Genre</label>
            <div class="col-sm-4">
              <input
                id="genre"
                type="text"
                class="form-control"
                v-model="form.genre"
              />
            </div>
            <label class="col-sm-2 col-form-label">Image URL</label>
            <div class="col-sm-4">
              <input
                id="imgUrl"
                type="text"
                class="form-control"
                v-model="form.img_uri"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Year</label>
            <div class="col-sm-4">
              <input
                id="year"
                type="number"
                class="form-control"
                v-model.number="form.year"
              />
            </div>
            <label class="col-sm-2 col-form-label">Notes</label>
            <div class="col-sm-4">
              <textarea
                id="notes"
                maxlength="250"
                style="resize: none"
                rows="2"
                class="form-control"
                v-model="form.notes"
              >
              </textarea>
            </div>
          </div>
          <div class="text-right mt-4">
            <button
              id="save-btn"
              type="submit"
              class="btn btn-dark"
              style="margin-right: 10px"
            >
              Save
            </button>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";

export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        title: null,
        artist: null,
        label: null,
        genre: null,
        year: null,
        condition: null,
        price: null,
        notes: null,
        status: "inStock",
        img_uri: null,
      },
      error: null,
      discogsId: null,
    };
  },

  created() {
    if (this.$route.params.id) {
      this.fetchData();
    }
  },

  watch: {
    $route: "fetchData",
  },

  methods: {
    fetchData() {
      this.$apollo
        .query({
          query: gql`
            query getRecord($id: String!) {
              getRecord(id: $id) {
                artist
                title
                status
                label
                condition
                genre
                price
                year
                notes
                img_uri
              }
            }
          `,
          variables: {
            id: this.$route.params.id,
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          delete result.data.getRecord.__typename;
          this.form = result.data.getRecord;
        });
    },

    submit() {
      this.editable ? this.updateRecord() : this.addRecord();
    },

    addRecord() {
      return this.$apollo
        .mutate({
          mutation: gql`
            mutation addRecord($data: RecordInput!) {
              addRecord(data: $data) {
                id
              }
            }
          `,
          variables: {
            data: this.form,
          },
          fetchPolicy: "no-cache",
        })
        .then(() => {
          this.$router.go(-1);
        });
    },

    updateRecord() {
      return this.$apollo
        .mutate({
          mutation: gql`
            mutation editRecord($id: String!, $data: RecordInput!) {
              editRecord(id: $id, data: $data) {
                id
              }
            }
          `,
          variables: {
            data: this.form,
            id: this.$route.params.id,
          },
          fetchPolicy: "no-cache",
        })
        .then(() => {
          this.$router.go(-1);
        });
    },

    addFromDiscogs(id) {
      const myKey = "RQjHhwSaMHxwGbPxJxXz";
      const mySecret = "BIdsSStHDrPRlaWqpKiEeKTEkaHmSrwY";
      axios
        .get(
          `https://api.discogs.com/releases/${id}?key=${myKey}&secret=${mySecret}`
        )
        .then((response) => {
          this.discogsId = null;
          const data = response.data;
          let artists = [];
          let labels = [];
          this.form.title = data.title;
          data.artists.forEach((e) => artists.push(e.name));
          this.form.artist = artists.join(" & ");
          data.labels.forEach((e) => labels.push(e.name));
          this.form.label = labels.join(", ");
          this.form.genre = data.genres.join(", ");
          this.form.year = data.year;
          this.form.img_uri = data.images[0].uri;
        })
        .catch(() => (this.error = "This release couldn't be found"));
    },
  },
};
</script>
