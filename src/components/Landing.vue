<template>
  <div class="body">
    <div class="navi">
      <div class="container flex">
        <router-link to="/"><h3 class="brand">Record Shop</h3></router-link>
        <ul>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </div>
    </div>
    <section class="content">
      <div class="container">
        <transition name="transright" mode="out-in">
          <span class="my content-text">manage your</span>
        </transition>
        <transition name="transleft" mode="out-in">
          <span class="rs content-text">record store</span>
        </transition>

        <span class="inv content-text">inventory</span>
        <div class="rect1"></div>
        <span class="id content-text">import directly</span>
        <span class="from content-text">from</span>
        <span class="discogs content-text">Discogs</span>
        <div class="rect2"></div>
        <div class="sign-up-block">
          <router-link class="sign-up-text" to="/signup"
            >sign up for free now</router-link
          >
        </div>
        <!-- <a href="#" class="sign-up-text"><span></span></a> -->
      </div>
    </section>
  </div>
</template>


<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #191919;
}
.body {
  min-height: 100hv;
}
.container {
  max-width: 1440px;
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
  font-size: 90px;
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