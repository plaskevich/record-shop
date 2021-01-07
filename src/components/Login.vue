<template>
  <div style="padding-top: 40px">
    <h1 class="text-center" style="font-weight: 800">Record Shop</h1>
    <b-form @submit.prevent="login" class="mt-5">
      <b-card
        bg-variant="light"
        class="offset-lg-4 offset-md-3 offset-sm-2 offset-xs-1 col-lg-4 col-md-6 col-sm-8 col-xs-10"
      >
        <h3 class="text-center mt-4">Welcome!</h3>
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
          <b-form-input
            required
            type="password"
            v-model="form.password"
            id="password"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <small class="text-danger" v-if="this.error && !userPassError">
            {{ error.message }}
          </small>
          <small v-if="userPassError" class="text-danger">
            Wrong username or password
          </small>
          <button
            type="submit"
            :disabled="isLoading"
            style="display: block; margin: 20px auto; height: 44px"
            class="btn btn-dark col-sm-3"
          >
            <span :style="this.dots">SIGN IN</span>
            <div v-if="this.isLoading" class="loader loader--style8">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="24px"
                height="30px"
                viewBox="0 0 24 30"
                style="enable-background: new 0 0 50 50"
                xml:space="preserve"
              >
                <rect
                  x="0"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="8"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="16"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>
          </button>
        </b-form-group>
      </b-card>
    </b-form>
  </div>
</template>

<script>
// import firebase from 'firebase/app';
import gql from "graphql-tag";
import { clientLogin } from "../auth";
import store from "../store";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      error: null,
      isLoading: false,
      dots: "",
      form: {
        email: "",
        password: "",
      },
    };
  },

  watch: {
    authenticated() {
      if (this.authenticated) {
        this.$router.push({ name: "collection" });
      }
    },
  },

  validations: {
    form: {
      email: { required },
      password: { required },
    },
  },

  methods: {
    login() {
      if (!this.$v.$invalid) {
        this.isLoading = true;
        this.dots = "display: none";
        return this.$apollo
          .mutate({
            mutation: gql`
              mutation signIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                  user {
                    id
                  }
                  token
                }
              }
            `,
            variables: {
              email: this.form.email,
              password: this.form.password,
            },
          })
          .then((authData) => {
            clientLogin(authData.data.signIn.token);
          });
      }
    },
  },

  computed: {
    userPassError() {
      if (this.error) {
        return (
          this.error.code === "auth/wrong-password" ||
          this.error.code === "auth/user-not-found"
        );
      } else return false;
    },

    authenticated() {
      return store.state.authenticated;
    },
  },
};
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
      margin-right: 2px;
    }

    &:nth-child(3) {
      animation-delay: 1s;
      margin-right: 18px;
    }
  }
}
</style>
