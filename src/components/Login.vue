<template>
  <div class="landing-side">
    <h3>LOGIN</h3>
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
        <h4
          class="text-warning text-center"
          :style="this.error && !userPassError ? ' opacity: 1' : 'opacity: 0'"
        >
          {{ error }}
        </h4>
        <h4
          id="credentials-error"
          :style="userPassError ? ' opacity: 1' : 'opacity: 0'"
          class="text-warning"
        >
          Wrong username or password
        </h4>
        <div class="text-center btn-wrap">
          <button id="submit" type="submit" class="signInBtn">enter</button>
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

<style lang="scss" scoped>
form {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 50px;
}

h3 {
  text-align: center;
  font-family: Helvetica-Bold;
  font-size: 25px;
  color: #dddddd;
}
.label {
  font-family: Helvetica-Bold;
  font-size: 20px;
  color: #dddddd;
  text-align: right;
  align-items: center;
  padding-right: 40px;
  width: 30%;
}

input {
  width: 50%;
  font-family: Helvetica-Bold;
  font-size: 20px;
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
  font-size: 30px;
  border: none;
  transition: opacity 0.1s;
  transition: color 0.1s;
}

.signInBtn:focus {
  outline: none;
  opacity: 0.8;
}
</style>
