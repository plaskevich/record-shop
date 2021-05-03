<template>
  <div class="body">
    <div class="navi">
      <div class="container flex">
        <router-link to="/"><h3 class="brand">Record Shop</h3></router-link>
      </div>
    </div>
    <div class="container content">
      <Login />
      <SignUp />
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import SignUp from "./SignUp";

export default {
  components: { Login, SignUp },
};
</script>


<style scoped>
.landing-side {
  width: 100%;
  padding-top: 150px;
}

.body {
  background-color: #191919;
  height: 100vh;
}
.container {
  max-width: 80%;
  margin: 0 auto;
}

ul {
  display: flex;
  list-style: none;
}
.flex {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-size: 50px;
  font-family: Helvetica;
  font-weight: bold;
  color: #f05454;
}
.navi {
  display: inline;
}
.navi a {
  text-decoration: none;
  color: #f05454;
  font-size: 36px;
  font-family: Helvetica;
  font-weight: bold;
  padding: 20px;
  margin: 0 10px;
  transition: color 0.3s;
}

.navi a:hover {
  color: #dddddd;
}

.content {
  color: #dddddd;
  font-family: Helvetica;
  font-weight: bold;
  display: flex;
  justify-content: space-evenly;
}

.content-text {
  position: absolute;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.my {
  font-size: 48px;
  top: 26%;
  left: 67%;
}

.rs {
  font-size: 72px;
  top: 32%;
  left: 60%;
}

.inv {
  font-size: 36px;
  top: 42%;
  left: 58%;
}

.rect1 {
  width: 25%;
  height: 16.5%;
  opacity: 0.3;
  background: #568aff;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 63%;
  z-index: 0;
}

.id {
  font-size: 59px;
  top: 50%;
  left: 7.5%;
}
.from {
  font-size: 36px;
  top: 61%;
  left: 12.3%;
}

.discogs {
  font-size: 72px;
  top: 58%;
  left: 18%;
}
.rect2 {
  width: 25%;
  height: 10.8%;
  opacity: 0.3;
  background: #568aff;
  border-radius: 10px;
  position: absolute;
  top: 54.6%;
  left: 13.3%;
  z-index: 0;
}

.sign-up-block {
  font-size: 70px;
  display: flex;
  justify-content: center;
  margin-top: 40%;
}

.sign-up-text {
  color: #dddddd;
  transition: color 0.3s;
}

.sign-up-text:hover {
  text-decoration: none;
  color: #f05454;
}
</style>