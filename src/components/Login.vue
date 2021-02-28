<template>
  <div class="body">
    <div class="navi">
      <div class="container flex">
        <router-link to="/"><h3 class="brand">Record Shop</h3></router-link>
      </div>
    </div>
    <p class="text-center title mt-5">login</p>
    <form @submit.prevent="login" class="mt-5">
      <div class="form-group">
        <label class="label" for="email">email</label>
        <input id="email" required v-model="form.email" type="email" />
      </div>
      <div class="form-group">
        <label class="label" for="password">password</label>
        <input required type="password" v-model="form.password" id="password" />
      </div>
      <div>
        <small
          class="text-danger"
          :style="
            this.error && !userPassError ? ' display: block' : 'display: none'
          "
        >
          {{ error }}
        </small>
        <small
          id="credentials-error"
          :style="userPassError ? ' display: block' : 'display: none'"
          class="text-danger"
        >
          Wrong username or password
        </small>
        <div class="text-center btn-wrap">
          <button id="submit" type="submit" class="signInBtn">sign in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { clientLogin } from "../auth";
import store from "../store";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      error: null,
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
          })
          .catch((e) => {
            this.error = e;
            this.isLoading = false;
            this.dots = "display: block";
          });
      }
    },
  },

  computed: {
    userPassError() {
      if (this.error) {
        // console.log(this.error);
        return this.error.message === "GraphQL error: Incorrect credentials";
      } else return false;
    },

    authenticated() {
      return store.state.authenticated;
    },
  },
};
</script>

<style lang="scss" scopedSlots>
.title {
  font-size: 36px;
  color: #dddddd;
  font-family: Helvetica;
  font-weight: bold;
}

form {
  max-width: 700px;
  margin: 0 auto;
}

.label {
  font-family: Helvetica-Bold;
  font-size: 48px;
  color: #dddddd;
  text-align: right;
  align-items: center;
  padding-right: 60px;
  width: 40%;
}

input {
  width: 60%;
  font-family: Helvetica-Bold;
  font-size: 48px;
  color: #f05454;
  background: #191919;
  border: none;
  border-bottom: 2px solid #dddddd;
  transition: border 0.3s;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #f05454;
}

.form-group {
  padding-top: 50px;
}

.signInBtn {
  color: #f05454;
  background: none;
  font-family: Helvetica-Bold;
  font-size: 60px;
  border: none;
  transition: opacity 0.1s;
  transition: color 0.1s;
}

.signInBtn:focus {
  outline: none;
  opacity: 0.8;
}

.btn-wrap {
  padding-top: 90px;
}

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
