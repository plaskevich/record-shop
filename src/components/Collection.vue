<template>
  <div id="home" style="padding: 10px">
    <Sidebar />
    <div style="width: 85%; float:right">
      <div class="navbar">
        <b-form-input style="border-radius: 20px" v-model="filter" class="col-sm-3" placeholder="Search..."></b-form-input>
        <router-link to="/new" class="nav-item" style="float:right ">
          <button style="border-radius: 20px" class="btn btn-dark">+ Add Release</button>
        </router-link>
      </div>
      <div>
        <b-table
          :tbody-tr-class="rowClass"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          sticky-header
          borderless
          striped
          head-variant="dark">
          <template v-slot:cell(title)="data">
            <router-link style="color: inherit"
                        v-bind:to="{ name: 'view-release', params: { id: data.item.id }},">
                        {{ data.item.title }}
            </router-link>
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
              <b-dropdown-item v-b-modal.deleteModal @click="selected = data.item.id">Delete</b-dropdown-item>
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
      </div>
    </div>
  </div>
</template>

<script>
  import db from '../firebase/firebase'
  import Sidebar from './Sidebar'

  export default {
    components: { Sidebar },
    name: 'home',
    data () {
      return {
        selected: null,
        sortBy: 'date_added',
        sortDesc: true,
        fields: [
          { key: 'title', sortable: true },
          { key: 'artist', sortable: true },
          { key: 'label', sortable: true },
          { key: 'year', sortable: true },
          { key: 'genre', sortable: false },
          { key: 'condition', sortable: false },
          { key: 'date_added', label: 'Date', sortable: true },
          { key: 'price', sortable: true },
          { key: 'options', label: '', sortable: false },
        ],
        items: [],
        filter: null,
        loading: true,
      }
    },

    created () {
      this.fetchData();
    },

    watch: {
      '$route.params.page': function() {
        this.fetchData()
      }
    },

    methods: {
      rowClass(item) {
        if (!item) return
        if (item.status === 'sold' && !this.$route.params.page) return 'table-warning'
      },

      fetchData() {
        this.items = [];
        if (this.$route.params.page === 'sold' || this.$route.params.page === 'in-stock') {
          db.collection('shops').doc('libertine')
          .collection('collection').where('status', '==', this.$route.params.page)
          .get().then((querySnapshot) => {
            this.loading = false
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
              }
              this.items.push(data)
            })
          })
        } else {
          db.collection('shops').doc('libertine').collection('collection')
          .get().then((querySnapshot) => {
            this.loading = false
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
              }
              this.items.push(data)
            })
          })
        }
      },

      changeStatus(id, status) {
        if (status === 'sold') {
          db.collection('shops').doc('libertine').collection('collection')
          .doc(id).update({status: 'in-stock'}).then(() => this.fetchData())
        } else {
          db.collection('shops').doc('libertine').collection('collection')
          .doc(id).update({status: 'sold'}).then(() => this.fetchData())
        }
      },

      editRelease(id) {
        this.$router.push({ name: 'edit-release', params: {id}})
      },

      deleteRelease() {
       db.collection('shops').doc('libertine').collection('collection')
       .doc(this.selected).delete().then(() => {
          this.fetchData();
        })
      },
    }
  }
</script>

<style lang="css">
  
</style>
