<template>
  <div class="pt-2">
    <div style="width: 85%; float: right;">
      <b-navbar>
        <b-form-input
          v-model="filter"
          class="col-sm-3 searchbar mb-2"
          placeholder="Search..."
        ></b-form-input>
        <button
          type="button"
          class="btn btn-link text-dark pt-0 ml-3"
          @click="selectToggle = !selectToggle"
        >
          {{ selectToggle ? 'Cancel' : 'Select' }}
        </button>
        <div class="ml-5" :class="!selectToggle ? 'invisible' : 'visible'">
          <button
            type="button"
            v-if="$route.params.page != 'sold'"
            class="pt-0 btn btn-link text-warning"
            @click="markRowsSold"
          >
            Set Sold
          </button>
          <button
            type="button"
            v-if="$route.params.page != 'inStock'"
            class="pt-0 btn btn-link text-success"
            @click="markRowsInStock"
          >
            Set Available
          </button>
          <button
            type="button"
            class="pt-0 btn btn-link text-danger"
            v-b-modal.deleteRowsModal
            @click="selectedToDelete = selectedRows"
          >
            Delete
          </button>
        </div>
        <div class="col">
          <router-link to="/new" class="nav-item float-right">
            <button style="border-radius: 20px;" class="btn btn-dark">
              + Add Release
            </button>
          </router-link>
        </div>
      </b-navbar>
      <div>
        <b-table
          @row-clicked="rowClick"
          no-sort-reset
          style="cursor: pointer; margin-bottom: 60px;"
          :tbody-tr-class="rowClass"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          sticky-header
          borderless
          striped
          hover
          head-variant="dark"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template v-slot:head(img)="data">
            <b-form-checkbox
              v-model="selectAll"
              size="lg"
              style="margin-left: 10px;"
              v-if="selectToggle"
            ></b-form-checkbox>
          </template>
          <template v-slot:cell(img)="data">
            <div class="checkbox-img">
              <img
                :style="selectToggle ? ' filter: brightness(60%)' : ''"
                style="max-width: 40px;"
                :src="
                  isLink(data.item.img_uri)
                    ? data.item.img_uri
                    : 'https://upload.wikimedia.org/wikipedia/commons/1/11/Vinyl_record_orange.png'
                "
                alt="artwork"
              />
              <b-form-checkbox
                v-model="selectedRows"
                :value="data.item.id"
                size="lg"
                class="checkbox"
                v-if="selectToggle"
              ></b-form-checkbox>
            </div>
          </template>
          <template v-slot:cell(price)="data">{{
            data.item.price ? data.item.price + ' €' : '-'
          }}</template>
          <template v-slot:cell(date_added)="data">{{
            new Date(data.item.date_added).toLocaleDateString()
          }}</template>
          <template v-slot:cell(options)="data">
            <b-dropdown
              variant="link"
              dropleft
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <div style="cursor: pointer;">
                  <i class="fas fa-ellipsis-v text-dark"></i>
                </div>
              </template>
              <b-dropdown-item
                @click="changeStatus(data.item.id, data.item.status)"
                >{{
                  data.item.status === 'sold' ? 'Set Available' : 'Set Sold'
                }}</b-dropdown-item
              >
              <b-dropdown-item @click="editRelease(data.item.id)"
                >Edit</b-dropdown-item
              >
              <b-dropdown-item
                v-b-modal.deleteModal
                @click="selectedToDelete = [data.item.id]"
                >Delete</b-dropdown-item
              >
            </b-dropdown>
          </template>
        </b-table>
      </div>
      <div>
        <b-modal
          id="deleteModal"
          ok-variant="dark"
          cancel-variant="light"
          hide-header
          @ok="remove"
        >
          <div class="d-block text-center">
            <h5>Are you sure you want to delete the release?</h5>
          </div>
        </b-modal>
        <b-modal
          id="deleteRowsModal"
          v-if="selectedRows.length > 0"
          ok-variant="dark"
          cancel-variant="light"
          hide-header
          @ok="remove"
        >
          <div class="d-block text-center">
            <h5>
              {{
                'Are you sure you want to delete ' +
                  selectedRows.length +
                  ' record(s)?'
              }}
            </h5>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'home',
  data() {
    return {
      shop: null,
      selectAll: false,
      selectToggle: false,
      selectedRows: [],
      selectedToDelete: [],
      sortBy: 'date_added',
      sortDesc: true,
      fields: [
        {
          key: 'img',
          label: '',
          sortable: false,
        },
        {
          key: 'title',
          sortable: true,
        },
        {
          key: 'artist',
          sortable: true,
        },
        {
          key: 'label',
          sortable: true,
        },
        {
          key: 'year',
          sortable: true,
        },
        {
          key: 'genre',
          sortable: false,
        },
        {
          key: 'condition',
          sortable: false,
        },
        {
          key: 'date_added',
          label: 'Date',
          sortable: true,
        },
        {
          key: 'price',
          sortable: true,
        },
        {
          key: 'options',
          label: '',
          sortable: false,
        },
      ],
      items: [],
      filter: null,
    };
  },

  created: function() {
    this.fetchData();
  },

  watch: {
    $route: function() {
      this.fetchData();
    },

    selectAll: function() {
      if (this.selectedRows.length < this.items.length) {
        this.items.forEach((i) => this.selectedRows.push(i.id));
      } else this.selectedRows = [];
    },
  },

  methods: {
    isLink(str) {
      try {
        new URL(str);
        if (str.match(/\.(jpeg|jpg|gif|png)$/) != null) return true;
      } catch (_) {
        return false;
      }
    },

    rowClass(item) {
      if (!item) return;
      if (item.status === 'sold' && !this.$route.params.page)
        return 'table-warning';
    },

    rowClick(row) {
      if (!this.selectToggle) {
        this.$router.push({
          name: 'view-release',
          params: {
            id: row.id,
          },
        });
      }
    },

    fetchData() {
      if (this.$route.params.page === 'sold') {
        this.fetchSoldRecords();
      } else if (this.$route.params.page === 'inStock') {
        this.fetchStockRecords();
      } else {
        this.fetchAllRecords();
      }
    },

    fetchAllRecords() {
      this.$apollo
        .query({
          query: gql`
            query getAllRecords {
              getAllRecords {
                id
                artist
                title
                status
                label
                date_added
                condition
                genre
                price
                year
                notes
                img_uri
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          this.items = result.data.getAllRecords;
        });
    },

    fetchSoldRecords() {
      this.$apollo
        .query({
          query: gql`
            query getSoldRecords {
              getSoldRecords {
                id
                artist
                title
                status
                label
                date_added
                condition
                genre
                price
                year
                notes
                img_uri
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })
        .then((result) => (this.items = result.data.getSoldRecords));
    },
    fetchStockRecords() {
      this.$apollo
        .query({
          query: gql`
            query getStockRecords {
              getStockRecords {
                id
                artist
                title
                status
                label
                date_added
                condition
                genre
                price
                year
                notes
                img_uri
              }
            }
          `,
          fetchPolicy: 'no-cache',
        })
        .then((result) => (this.items = result.data.getStockRecords));
    },

    changeStatus(id, status) {
      if (status === 'sold') {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation setInStock($id: String!) {
                setInStock(id: $id) {
                  id
                }
              }
            `,
            variables: {
              id,
            },
            fetchPolicy: 'no-cache',
          })
          .then(() => this.fetchData());
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation setSold($id: String!) {
                setSold(id: $id) {
                  id
                }
              }
            `,
            variables: {
              id,
            },
            fetchPolicy: 'no-cache',
          })
          .then(() => this.fetchData());
      }
    },

    editRelease(id) {
      this.$router.push({
        name: 'edit-release',
        params: {
          id,
        },
      });
    },

    remove() {
      var items = 0;
      this.selectedToDelete.forEach((e) => {
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
              id: e,
            },
            fetchPolicy: 'no-cache',
          })
          .then(() => {
            items++;
            if (items === this.selectedToDelete.length) {
              this.fetchData();
            }
          });
      });
    },

    markRowsSold() {
      var items = 0;
      this.selectedRows
        .forEach((e) => {
          this.changeStatus(e, 'inStock');
        })
        .then(() => {
          items++;
          if (items === this.selectedRows.length) {
            this.$router.go();
          }
        });
    },

    markRowsInStock() {
      var items = 0;
      this.selectedRows
        .forEach((e) => {
          this.changeStatus(e, 'sold');
        })
        .then(() => {
          items++;
          if (items === this.selectedRows.length) {
            this.$router.go();
          }
        });
    },
  },
};
</script>

<style lang="css"></style>
