<template>
  <div id="app">
    <Sidebar v-if="$route.path != '/login'" />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: { Sidebar },
}
</script>

<style lang="css">
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    background-color: #f0f0f0
  };
  
</style>
