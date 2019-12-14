<template>
  <div>
    <sidebar-menu hideToggle @item-click="onItemClick" style="width: 15%" :menu="menu" />
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';

export default {
  data() {
    return {
      user: {
        name: 'Alex',
      },

      menu: [
        {
          header: true,
          title: 'Record Shop',
        },
        {
          href: '/collection',
          title: 'All Collection',
          icon: 'fas fa-stream'
        },
        {
          href: '/collection/in-stock',
          title: 'In Stock',
          icon: 'fas fa-store'
        },
        {
          href: '/collection/sold',
          title: 'Sold',
          icon: 'fas fa-wallet'
        },
        // {
        //   href: '/settings',
        //   title: 'Settings',
        //   icon: 'fas fa-cogs'
        // },
        {
          title: 'Logout',
          icon: 'fas fa-sign-out-alt'
        },
      ]
    }
  },

  methods: {
    onItemClick(event, item) {
      if(item.title === 'Logout') {
        firebase.auth().signOut().then(function() {
          this.$router.push('login')
        }).catch(function(error) {
          console.log(error)
        });
      }
    }
  }
}
</script>
<style>
  .v-sidebar-menu .vsm--icon {
    background: none!important
  }
</style>