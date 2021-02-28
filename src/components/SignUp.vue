<template>
  <div class="body">
    <div class="navi">
      <div class="container flex">
        <router-link to="/"><h3 class="brand">Record Shop</h3></router-link>
      </div>
    </div>
    <p class="text-center title">create new account</p>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <label class="label" for="email">email</label>
        <input id="email" required v-model="form.email" type="email" />
      </div>
      <div class="form-group">
        <label class="label" for="name">name</label>
        <input id="name" v-model="form.name" type="text" />
      </div>
      <div class="form-group">
        <label class="label" for="password">password</label>
        <input required type="password" v-model="form.password" id="password" />
      </div>
      <div class="form-group">
        <label class="label" for="confirm-password">confirm password</label>
        <input
          required
          type="password"
          v-model="form.confirmPassword"
          id="confirm-password"
        />
      </div>
      <div>
        <small
          class="text-danger"
          :style="this.error ? ' display: block' : 'display: none'"
        >
          {{ error }}
        </small>
        <div class="text-center btn-wrap">
          <button id="submit" type="submit" class="signInBtn">sign up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { clientLogin } from "../auth";
import store from "../store";
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      error: null,
      dots: "",
      form: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
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
      confrimPassword: { sameAsPassword: sameAs("form.password") },
    },
  },

  methods: {
    signUp() {
      if (!this.$v.$invalid) {
        return this.$apollo
          .mutate({
            mutation: gql`
              mutation signUp(
                $email: String!
                $password: String!
                $name: String
              ) {
                signUp(email: $email, password: $password, name: $name) {
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
              name: this.form.name,
            },
          })
          .then((authData) => {
            console.log(authData);
            clientLogin(authData.data.signUp.token);
          })
          .catch((e) => {
            this.error = e;
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
  font-size: 30px;
  color: #dddddd;
  font-family: Helvetica;
  font-weight: bold;
}

form {
  max-width: 1000px;
  margin: 2% 15%;
}

.label {
  font-family: Helvetica-Bold;
  font-size: 36px;
  color: #dddddd;
  text-align: right;
  align-items: center;
  padding-right: 60px;
  width: 50%;
}

input {
  width: 50%;
  font-family: Helvetica-Bold;
  font-size: 36px;
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
  padding-top: 30px;
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
  padding-top: 40px;
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
