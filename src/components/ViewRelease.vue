<template>
  <div>
    <div style="width: 85%; float:right">
      <b-card class="col-lg-9 offset-lg-1 mt-5">
        <form
          @submit.prevent="submit"
          style="padding: 0 20px; font-size: 16px"
          class="mt-2 col-lg-12"
        >
          <div class="row float-right">
            <b-dropdown
              class="row"
              dropleft
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <div style="cursor: pointer">
                  <i
                    style="font-size: 20px"
                    class="fas fa-ellipsis-h text-dark float-left"
                  ></i>
                </div>
              </template>
              <b-dropdown-item @click="editRelease(id)">Edit</b-dropdown-item>
              <b-dropdown-item v-b-modal.deleteModal>Delete</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="col-sm-12 mb-5">
            <router-link to="/collection"
              ><i class="fas fa-angle-left"></i> Back</router-link
            >
          </div>
          <div class="row">
            <img
              v-if="form.img_uri"
              style="max-with:250px; max-height: 250px"
              class="img img-responsive ml-4 mr-3 mb-4"
              :src="form.img_uri"
              alt=""
            />
            <div class="col">
              <div class="col-lg-12">
                <div class="mb-5">
                  <h4 class="col-lg-12 pl-0">
                    <b>{{ form.artist }}</b>
                  </h4>
                  <h4 class="col-lg-12 pl-0">{{ form.title }}</h4>
                </div>
                <div v-if="form.label" class="form-group row">
                  <label class="col-lg-4 col-form-label">Label: </label>
                  <div class="col form-control-plaintext">
                    {{ form.label }}
                  </div>
                </div>
                <div v-if="form.genre" class="form-group row">
                  <label class="col-lg-4 col-form-label">Genre: </label>
                  <div class="col form-control-plaintext">
                    {{ form.genre }}
                  </div>
                </div>
                <div v-if="form.year" class="form-group row">
                  <label class="col-lg-4 col-form-label">Year: </label>
                  <div class="col form-control-plaintext">
                    {{ form.year }}
                  </div>
                </div>
                <div v-if="form.condition" class="form-group row">
                  <label class="col-lg-4 col-form-label">Condition: </label>
                  <div class="col form-control-plaintext">
                    {{ form.condition }}
                  </div>
                </div>
                <div v-if="form.price" class="form-group row">
                  <label class="col-lg-4 col-form-label">Price: </label>
                  <div class="col form-control-plaintext">
                    {{ form.price ? form.price + ' €' : '-' }}
                  </div>
                </div>
                <div v-if="form.status" class="form-group row">
                  <label class="col-lg-4 col-form-label">Status: </label>
                  <div
                    v-if="form.status === 'sold'"
                    class="text-warning col form-control-plaintext"
                  >
                    Sold
                  </div>
                  <div
                    v-if="form.status === 'inStock'"
                    class="text-success col form-control-plaintext"
                  >
                    Available
                  </div>
                </div>
                <div v-if="form.notes" class="form-group row">
                  <label class="col-lg-4 col-form-label">Notes: </label>
                  <div class="col form-control-plaintext">
                    <i style="font-weight: 300">{{ form.notes }}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </b-card>
      <b-modal
        id="deleteModal"
        ok-variant="dark"
        cancel-variant="light"
        hide-header
        @ok="deleteRelease"
      >
        <div class="d-block text-center">
          <h5>Are you sure you want to delete the release?</h5>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      form: {
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
      },
    };
  },

  watch: {
    getRecord() {
      delete this.getRecord.__typename;
      this.form = this.getRecord;
    },
  },

  methods: {
    editRelease() {
      this.$router.push({
        name: 'edit-release',
        params: {
          id: this.form.id,
        },
      });
    },

    deleteRelease() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation removeRecord($id: String!) {
              removeRecord(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: this.form.id,
          },
          fetchPolicy: 'no-cache',
        })
        .then(() => {
          this.$router.push({
            name: 'collection',
          });
        });
    },
  },

  apollo: {
    getRecord: {
      query: gql`
        query getRecord($id: String!) {
          getRecord(id: $id) {
            id
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
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: 800;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #b1b1b1;
}

.form-group {
  margin-bottom: 0 !important;
}
</style>
