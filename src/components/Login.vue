<template>
  <div style="padding-top: 40px">
    <h1 class="text-center" style="font-weight: 800">Record Shop</h1>
    <b-form @submit.prevent="login" class="mt-5">
      <b-card bg-variant="light" class="offset-lg-4 col-lg-4">
        <h3 class="text-center mt-4">LOGIN</h3>
        <b-form-group
          style="margin-top: 30px"
          label="Email"
          label-cols="12"
          label-align="left"
          label-for="email"
        >
          <b-form-input required v-model="form.email" id="email"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-cols="12"
          label-align="left"
          label-for="password"
        >
          <b-form-input required type="password" v-model="form.password" id="password"></b-form-input>
        </b-form-group>
        <b-form-group>
          <small class="text-danger" v-if="this.error && !userPassError">
            {{ error.message }}
          </small> 
          <small v-if="userPassError" class="text-danger">
            Wrong username or password
          </small> 
          <button type="submit" :disabled="isLoading" style="display: block; margin: 20px auto" class="btn btn-dark">
            <span :style="this.dots">SIGN IN</span>
            <div class="bloading-dots" v-if="this.isLoading">
              <div class="bloading-dots--dot"></div>
              <div class="bloading-dots--dot"></div>
              <div class="bloading-dots--dot"></div>
            </div>
          </button>
        </b-form-group>
    </b-card>
  </b-form>
</div>
</template>

<script>
import firebase from 'firebase';
import { required } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        error: null,
        isLoading: false,
        dots: '',
        form: {
          email: '',
          password: '',
        },
      }
    },

    validations: {
      form: {
      email: { required },
      password: { required },
    },
    },

    methods: {
      login() {
        if(!this.$v.$invalid){
          this.isLoading = true
          this.dots = 'display: none';
          firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            this.$router.push({ name: 'collection'});
            this.isLoading = false;
          })
          .catch(err => {
            this.error = err
            this.isLoading = false;
            this.dots = '';
          });
        }
      },
    },

    computed: {
      userPassError() {
        if(this.error){
          return (this.error.code === 'auth/wrong-password' || this.error.code === 'auth/user-not-found')
        }
        else return false
      }
    },
  }
</script>

<style lang="scss" scopedSlots>
  @keyframes dot-keyframes {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}

.bloading-dots {
  text-align: center;
  width: 100%;

  &--dot {
    animation: dot-keyframes 1.5s infinite ease-in-out;
    background-color: #fff;
    border-radius: 10px;
    display: inline-block;
    height: 6px;
    width: 6px;
    margin-bottom: 2px;

    &:nth-child(1) {
      margin-right: 2px;
      margin-left: 18px;
    }

    &:nth-child(2) {
      animation-delay: 0.5s;
      margin-right: 2px ;
    }

    &:nth-child(3) {
      animation-delay: 1s;
      margin-right: 18px;
    }
  }
}

</style>