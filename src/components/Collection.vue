<template>
<div id="home" class="pt-2">
  <Sidebar />
  <div style="width: 85%; float:right">
    <div class="navbar">
      <b-form-input style="border-radius: 20px" v-model="filter" class="col-sm-3 mb-2" placeholder="Search..."></b-form-input>
      <button type="button" class="btn btn-link text-dark" @click="selectClick">{{ selectToggle ? 'Hide' : 'Select' }}</button>
      <div :class="!selectToggle ? 'invisible' : 'visible'">
        <button type="button" v-if="$route.params.page != 'sold'" class="btn btn-link text-dark" @click="markRowsSold">Mark Sold</button>
        <button type="button" v-if="$route.params.page != 'in-stock'" class="btn btn-link text-dark" @click="markRowsInStock">Mark In Stock</button>
        <button type="button" class="btn btn-link text-dark" v-b-modal.deleteRowsModal>Delete</button>
      </div>
      <router-link to="/new" class="nav-item">
        <button style="border-radius: 20px" class="btn btn-dark">+ Add Release</button>
      </router-link>
    </div>
    <div>

      <b-table @row-clicked="rowClick" style="cursor: pointer; margin-bottom: 60px" :tbody-tr-class="rowClass" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" sticky-header borderless striped hover head-variant="dark">
        <template v-slot:cell(img)="data">
          <img style="max-width: 40px" :src="isLink(data.item.img_uri) ? data.item.img_uri : 'https://upload.wikimedia.org/wikipedia/commons/1/11/Vinyl_record_orange.png'" alt="artwork">
        </template>
        <template v-slot:cell(check)="data">
          <b-form-checkbox v-model="selectedRows" :value="data.item.id" style="width: 30px; height: 30px" class="pr-0" v-if="selectToggle">
          </b-form-checkbox>
        </template>
        <template v-slot:cell(price)="data">
          {{ data.item.price ? data.item.price + ' €' : '-'}}
        </template>
        <template v-slot:cell(date_added)="data">
          {{moment(data.item.date_added).format('DD/MM/YY')}}
        </template>
        <template v-slot:cell(options)="data">
          <b-dropdown variant="link" dropleft toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              <div style="cursor: pointer"><i class="fas fa-ellipsis-v text-dark"></i></div>
            </template>
            <b-dropdown-item @click="changeStatus(data.item.id, data.item.status)">
              {{ data.item.status === 'sold' ? 'Mark In-Stock' : 'Mark Sold' }}
            </b-dropdown-item>
            <b-dropdown-item @click="editRelease(data.item.id)">Edit</b-dropdown-item>
            <b-dropdown-item v-b-modal.deleteModal @click="selectedToDelete = data.item.id">Delete</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </div>
    <div>
      <b-modal id="deleteModal" ok-variant="dark" cancel-variant="light" hide-header @ok="deleteRelease">
        <div class="d-block text-center">
          <h5>Are you sure you want to delete the release?</h5>
        </div>
      </b-modal>
      <b-modal id="deleteRowsModal" v-if="selectedRows.length>0" ok-variant="dark" cancel-variant="light" hide-header @ok="deleteRows">
        <div class="d-block text-center">
          <h5>{{ 'Are you sure you want to delete ' + selectedRows.length + ' record(s)?' }}</h5>
        </div>
      </b-modal>
    </div>
  </div>
</div>
</template>

<script>
import db from '../firebase/firebase'
import Sidebar from './Sidebar'

export default {
  components: {
    Sidebar
  },
  name: 'home',
  data() {
    return {
      selectToggle: false,
      selectedRows: [],
      selectedToDelete: null,
      sortBy: 'date_added',
      sortDesc: true,
      fields: [{
          key: 'check',
          label: '',
          sortable: false,
          thClass: 'd-none',
          tdClass: 'd-none'
        },
        {
          key: 'img',
          label: '',
          sortable: false
        },
        {
          key: 'title',
          sortable: true
        },
        {
          key: 'artist',
          sortable: true
        },
        {
          key: 'label',
          sortable: true
        },
        {
          key: 'year',
          sortable: true
        },
        {
          key: 'genre',
          sortable: false
        },
        {
          key: 'condition',
          sortable: false
        },
        {
          key: 'date_added',
          label: 'Date',
          sortable: true
        },
        {
          key: 'price',
          sortable: true
        },
        {
          key: 'options',
          label: '',
          sortable: false
        },
      ],
      items: [],
      filter: null,
      loading: true,
    }
  },

  created() {
    this.fetchData();
  },

  watch: {
    '$route.params.page': function () {
      this.fetchData()
    }
  },

  computed: {

  },

  methods: {
    isLink(str) {
      try {
        new URL(str);
        if (str.match(/\.(jpeg|jpg|gif|png)$/) != null)
          return true;
      } catch (_) {
        return false;
      }
    },

    rowClass(item) {
      if (!item) return
      if (item.status === 'sold' && !this.$route.params.page) return 'table-warning'
    },

    rowClick(row) {
      if (!this.selectToggle) {
        this.$router.push({
          name: 'view-release',
          params: {
            id: row.id
          }
        })
      }

    },

    selectClick() {
      this.selectToggle = !this.selectToggle;
      this.fields[0].thClass = this.fields[0].thClass === '' ? 'd-none' : '';
      this.fields[0].tdClass = this.fields[0].tdClass === '' ? 'd-none' : '';
    },

    fetchData() {
      if (this.$route.params.page === 'sold' || this.$route.params.page === 'in-stock') {
        db.collection('shops').doc('libertine')
          .collection('collection').where('status', '==', this.$route.params.page)
          .get().then((querySnapshot) => {
            this.loading = false
            this.items = []
            querySnapshot.forEach((doc) => {
              const data = {
                'id': doc.id,
                'artist': doc.data().artist,
                'title': doc.data().title,
                'label': doc.data().label,
                'genre': doc.data().genre,
                'year': doc.data().year,
                'condition': doc.data().condition,
                'price': doc.data().price,
                'date_added': new Date(doc.data().date_added.seconds * 1000) || '',
                'status': doc.data().status,
                'img_uri': doc.data().img_uri,
              }
              this.items.push(data)
            })
          })
      } else {
        db.collection('shops').doc('libertine').collection('collection')
          .get().then((querySnapshot) => {
            this.loading = false
            this.items = []
            querySnapshot.forEach((doc) => {
              const data = {
                'id': doc.id,
                'artist': doc.data().artist,
                'title': doc.data().title,
                'label': doc.data().label,
                'genre': doc.data().genre,
                'year': doc.data().year,
                'condition': doc.data().condition,
                'price': doc.data().price,
                'date_added': new Date(doc.data().date_added.seconds * 1000),
                'status': doc.data().status,
                'img_uri': doc.data().img_uri,
              }
              this.items.push(data)
            })
          })
      }
    },

    changeStatus(id, status) {
      if (status === 'sold') {
        db.collection('shops').doc('libertine').collection('collection')
          .doc(id).update({
            status: 'in-stock'
          }).then(() => this.fetchData())
      } else {
        db.collection('shops').doc('libertine').collection('collection')
          .doc(id).update({
            status: 'sold'
          }).then(() => this.fetchData())
      }
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
        .doc(this.selectedToDelete).delete().then(() => {
          this.fetchData();
        })
    },

    markRowsSold() {
      var items = 0;
      this.selectedRows.forEach(e => {
        db.collection('shops').doc('libertine').collection('collection')
          .doc(e).update({
            status: 'sold'
          }).then(() => {
            items++;
            if (items === this.selectedRows.length) {
              this.$router.go()
            }
          })
      });
    },

    markRowsInStock() {
      var items = 0;
      this.selectedRows.forEach(e => {
        db.collection('shops').doc('libertine').collection('collection')
          .doc(e).update({
            status: 'in-stock'
          }).then(() => {
            items++;
            if (items === this.selectedRows.length) {
              this.$router.go()
            }
          })
      });
    },

    deleteRows() {
      var items = 0;
      this.selectedRows.forEach(e => {
        db.collection('shops').doc('libertine').collection('collection')
          .doc(e).delete().then(() => {
            items++;
            if (items === this.selectedRows.length) {
              this.$router.go()
            }
          })
      })
    },
  }
}
</script>

<style lang="css">

</style>
