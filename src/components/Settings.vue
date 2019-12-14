<template>
  <div id="">
    <Sidebar />
    <b-alert style="width: 85%" class="float-right text-center" v-model="showDismissibleAlert" variant="success" dismissible>
      Password changed successfully!
    </b-alert>
    <div style="width: 85%; float:right">
      <b-card class="m-5 col-lg-6 pl-5">
        <form @submit.prevent="submit"
              class=" col-md-12 rounded"
              style="padding: 20px 40px; margin-bottom: 20px;">
          <h4 class="text-center mb-5">Change password</h4>
          <!-- <div class="form-group row">
            <label class="col-sm-5 col-form-label">Current password</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" required v-model="currentPassword">
            </div>
          </div> -->
          <div class="form-group row">
            <label class="col-sm-5 col-form-label">New password</label>
            <div class="col-sm-7">
              <input type="password" class="form-control" required v-model="newPass">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-5 col-form-label">Confirm password</label>
            <div class="col-sm-7">
              <input type="password" class="form-control" required v-model="confirmPass">
            </div>
          </div>
          <div class="form-group text-center">
            <small class="text-danger" v-if="this.error">
            {{ error }}
          </small>
          </div>
          
          <div class="mt-5 text-center">
            <button type="submit" class="btn btn-dark" style="margin-right: 10px">
              <span :style="this.dots">Save</span>
              <div class="loading-dots" v-if="this.isLoading">
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
              </div>
            </button>

          <router-link to="/"> <button class="btn btn-light">Cancel</button></router-link>
          </div>
        </form>
        </b-card>
      </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Sidebar from './Sidebar';
  import { required, sameAs } from 'vuelidate/lib/validators';

  export default {
    components: { Sidebar },

    data () {
      return {
        current: '',
        newPass: '',
        confirmPass: '',
        error: null,
        showDismissibleAlert: false,
        isLoading: false,
        dots: '',
      }
    },

    methods: {
      submit() {
        if(!this.$v.$invalid){
          this.isLoading = true
          this.dots = 'display: none';
          const user = firebase.auth().currentUser;
          user.updatePassword(this.newPass)
          .then(() => {
            this.newPass = '';
            this.confirmPass = '';
            this.showDismissibleAlert = true;
            this.isLoading = false
            this.dots = '';
          })
          .catch(err => this.error = err.message)
        } else if (this.newPass != this.confirmPass){
          this.error = 'Passwords don\'t match';
          this.isLoading = false
          this.dots = '';
        }
      }
    },

    validations: {
      newPass: { required },
      confirmPass: { required, sameAsPassword: sameAs('newPass') },
    },
  }
</script>

<style lang="scss">
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

.loading-dots {
  text-align: center;
  width: 100%;

  &--dot {
    animation: dot-keyframes 1.5s infinite ease-in-out;
    background-color: #fff;
    border-radius: 10px;
    display: inline-block;
    height: 5px;
    width: 5px;
    margin: 0 3.5px 3px 3.5px;

    &:nth-child(2) {
      animation-delay: 0.5s;
    }

    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

</style>