<template>
  <div id="app">
    <Sidebar
      v-if="
        $route.path != '/login' &&
        $route.path != '/signup' &&
        $route.path != '/'
      "
    />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "app",
  components: { Sidebar },
};
</script>

<style lang="css">
body {
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  background-color: #f0f0f0;
}
</style>
