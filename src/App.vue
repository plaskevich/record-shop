<template>
  <div id="app">
    <sidebar-menu hideToggle=true style="width: 15%" :menu="menu" />
    <div style="width: 85%; float:right">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Record Shop',
        },
        {
          href: '/',
          title: 'All Collection',
        },
        {
          href: '/in-store',
          title: 'In Store',
        },
        {
          href: '/sold',
          title: 'Sold',
        },
      ]
    }
  },
  name: 'app',
  components: {
  }
}
</script>

<style>
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    background-color: #F0F0F0
  };
</style>
