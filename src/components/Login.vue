<template>
  <div style="padding-top: 100px">
    <b-form>
      <b-card bg-variant="light" class="offset-lg-4 col-lg-4">
        <h3 class="text-center mt-4">LOGIN</h3>
        <b-form-group
          style="margin-top: 50px"
          label="Email"
          label-cols="3"
          label-align="center"
          label-for="email"
        >
        <b-form-input v-model="form.email" id="email"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-cols="3"
          label-align="center"
          label-for="password"
        >
          <b-form-input type="password" v-model="form.password" id="password"></b-form-input>
        </b-form-group>
        <b-form-group>
          <button @click="login" type="button" style="display: block; margin: 20px auto" class="btn btn-secondary">SIGN IN</button>
        </b-form-group>
    </b-card>
  </b-form>
</div>
</template>

<script>
import firebase from 'firebase';

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push({ name: 'collection'})
        })
        .catch(function(error) {
          return error
        });
      },
    }
  }
</script>