<template>
  <div id="home" style="padding: 10px">
    <div class="navbar">
      <b-form-input style="border-radius: 20px" v-model="filter" class="col-sm-3" placeholder="Search..."></b-form-input>
      <!-- <h2 class="nav-item"><b>All Releases</b></h2> -->
      <router-link to="/new" class="nav-item" style="float:right ">
      
        <button style="border-radius: 20px" class="btn btn-success">+ Add Release</button>
      </router-link>
    </div>
    <div style="margin: 20px 0">
      
    </div>
    <div>
      <b-table
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filter"
        head-variant="light">

        <!-- <template slot="icon">
          <i class="fas fa-compact-disc"></i>
        </template> -->
        <template slot="title" slot-scope="data">
          <router-link style="color: inherit"
                       v-bind:to="{ name: 'view-release', params: { id: data.item.id }},">
                       {{ data.item.title }}
          </router-link>
        </template>
        <!-- <template slot="condition" slot-scope="data">
          <star-rating :star-size=18 read-only :show-rating=false rounded-corners v-model="data.item.condition"></star-rating>
        </template> -->
        <template slot="price" slot-scope="data">
          {{ data.item.price ? data.item.price + ' €' : '-'}}
        </template>
        <template slot="date_added" slot-scope="data">
          {{moment(data.item.date_added).format('DD/MM/YY')}}
        </template>
        <template slot="edit" slot-scope="data">
          <router-link v-bind:to="{ name: 'edit-release', params: { id: data.item.id }},"><i class="fas fa-edit text-primary"></i></router-link>
        </template>
        <template slot="remove" slot-scope="data">
          <div v-b-modal.deleteModal @click="id=data.item.id" style="cursor: pointer"><i class="fas fa-trash text-danger"></i></div>
        </template>
      </b-table>
      </div>
    <div>
      <b-modal id="deleteModal" hide-header @ok="deleteRelease(id)">
        <div class="d-block text-center">
          <h5>Are you sure you want to delete the release?</h5>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import db from './firebase'
  // import StarRating from 'vue-star-rating'

  export default {
    //  components: { StarRating },
    name: 'home',
    data () {
      return {
        sortBy: 'date_added',
        sortDesc: true,
        fields: [
          // { key: 'icon', label: '', sortable: false },
          { key: 'title', sortable: true },
          { key: 'artist', sortable: true },
          { key: 'label', sortable: true },
          { key: 'year', sortable: true },
          { key: 'genre', sortable: false },
          { key: 'condition', sortable: false },
          { key: 'date_added', sortable: true },
          { key: 'price', sortable: true },
          { key: 'edit', label: '', sortable: false },
          { key: 'remove', label: '', sortable: false },
        ],
        items: [],
        filter: null,
        loading: true,
      }
    },

    created () {
      this.fetchData();
    },

    methods: {
      fetchData() {
        this.items = [];
        db.collection('vinyl').get().then((querySnapshot) => {
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
              'date_added': new Date(doc.data().date_added.seconds * 1000)
            }
            this.items.push(data)
          })
        })
      },

      deleteRelease(id) {
        db.collection('vinyl').doc(id).delete().then(() => {
          this.fetchData();
        })
      },
    }
  }
</script>
