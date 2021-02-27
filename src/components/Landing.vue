<template>
  <div class="body">
    <div class="navi">
      <div class="container flex">
        <h3 class="brand">Record Shop</h3>
        <ul>
          <li><a href="#" class="login-btn">Login</a></li>
          <li><a href="#" class="signup-btn">Sign Up</a></li>
        </ul>
      </div>
    </div>
    <section class="content">
      <div class="container">
        <span class="my content-text">manage your</span>
        <span class="rs content-text">record store</span>
        <span class="inv content-text">inventory</span>
        <div class="rect1"></div>
        <span class="id content-text">import directly</span>
        <span class="from content-text">from</span>
        <span class="discogs content-text">Discogs</span>
        <div class="rect2"></div>
        <a href="#" class="sign-up-text">sign up for free now</a>
      </div>
    </section>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
.body {
  background-color: #191919;
  height: 100vh;
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
  font-size: 100px;
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

.sign-up-text {
  font-size: 70px;
  display: flex;
  justify-content: center;
  margin-top: 40%;
  color: #dddddd;
}

.sign-up-text:hover {
  color: #f05454;
  text-decoration: none;
}
</style>