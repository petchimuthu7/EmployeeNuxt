
<template>
  <v-overlay v-if="overlay" class="align-center justify-center">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <section class="login">
    <div class="head">
      <h1 class="company">Welcome Back</h1>
    </div>
    <v-form
      ref="form"
      @submit.prevent="submit"
      class="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-alert v-if="isShowErrorMessage" type="error">{{
          this.errorMessage
        }}</v-alert>
        <v-progress-linear
          v-if="isEnableLoader"
          color="white"
          indeterminate
          rounded
        ></v-progress-linear>
        <br />
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="EmailAddress"
              label="Email Address"
              autocomplete="off"
              @blur="v$.EmailAddress.$touch()"
              :error-messages="emailErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="Password"
              onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"
              pattern="[A-Za-z0-9]+"
              label="Password"
              autocomplete="off"
              :type="show1 ? 'text' : 'password'"
              @blur="v$.Password.$touch()"
              :error-messages="passwordErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="text-align: center">
          <v-col cols="12">
            <v-btn
              class="btn-login"
              depressed
              autocomplete="off"
              elevation="1"
              x-large
              @click="submit"
              :disabled="isEnableLoader"
            >
              Sign In
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, minLength, maxLength } from "@vuelidate/validators";
import { useStore } from "~/store/index";

definePageMeta({
  layout: "login-layout",
  middleware: "login-auth"
});

const emailValidation = helpers.regex(
  "emailValidation",
  /^[a-zA-Z0-9!@#$%^&*();:?/+,._-\s]*$/i
);

const emailRegix = helpers.regex(
  "emailRegix",
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
  data() {
    return {
      v$: useVuelidate(),
      store: useStore(),
      valid: true,
      overlay: true,
      EmailAddress: "",
      emailAddressRules: [
        (v) => !!v || "Email Address is required",
        (v) =>
          /^[a-zA-Z0-9!@#$%^&*();:?/+,._-\s]*$/i.test(v) ||
          "Email Address must be valid",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Email Address must be valid",
      ],
      Password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      show1: false,
      isEnableLoader: false,
      isPageLoader: true,
      isShowErrorMessage: false,
      errorMessage: "",
    };
  },
  validations() {
    return {
      EmailAddress: {
        required,
        email,
        maxlength() {
          if (this.EmailAddress?.length < 150) {
            return true;
          } else {
            return false;
          }
        },
      },
      Password: {
        required,
      },
    };
  },
  mounted() {
    this.overlay = false;
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (this.overlay == false) {
        if (!this.v$.EmailAddress.$dirty) return errors;
        this.v$.EmailAddress.email.$invalid &&
          errors.push("Enter a valid Email Addres");
        this.v$.EmailAddress.required.$invalid && errors.push("Email Address required");
        this.v$.EmailAddress.maxlength.$invalid &&
          errors.push("Email address should be a maximum of 150 characters");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (this.overlay == false) {
        if (!this.v$.Password.$dirty) return errors;
        this.v$.Password.required.$invalid && errors.push("Password required");
      }
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$refs.form.validate();
      this.v$.$touch();
      const result = await this.v$.$validate();
      console.log(result);
      if (!result) {
        // notify user form is invalid
        return;
      } else {
        this.isEnableLoader = true;
        this.Login();
      }
    },
    async Login() {
      const user = await this.$axios
        .$post("/login", {
          EmailAddress: this.EmailAddress,
          Password: this.Password,
        })
        .then((user) => {
          if (user.Status == "Success" && user.UserId != "") {
            this.store.setUserId(user.UserId);
            this.store.setUserName(user.UserName);
            this.store.setEmailAddress(user.EmailAddress);
            location.href = "/employee";
          } else {
            this.isEnableLoader = false;
            this.errorMessage = user.Message;
            this.isShowErrorMessage = true;
            setTimeout(() => {
              this.isShowErrorMessage = false;
              this.errorMessage = "";
            }, 3000);
          }
        });
      return user;
    },
    async fetchSomething() {
      const ip = await this.$axios.$get("http://icanhazip.com");
      return ip;
    },
  },
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};
</script>

<style scoped>
body {
  background: #abcdef;
  font-family: Assistant, sans-serif;
  display: flex;
  min-height: 90vh;
}
.login {
  margin-top: 100px !important;
  width: 450px;
  margin: 0 auto;
  background-color: rgb(245, 241, 241);
  color: white;
  background: #136a8a;
  background: -webkit-linear-gradient(to right, #267871, #136a8a);
  background: linear-gradient(to right, #267871, #136a8a);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.3),
    0px 30px 60px 1px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 50px;
}
.login .head {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login .head .company {
  font-size: 2.2em;
}
.login .msg {
  text-align: center;
}
.login .form input[type="text"].text {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
}
.login .form .text::placeholder {
  color: #d3d3d3;
}
.login .form input[type="password"].password {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
  margin-bottom: 20px;
  margin-top: 20px;
}
.login .form .password::placeholder {
  color: #d3d3d3;
}
.login .form .btn-login {
  background: none;
  text-decoration: none;
  color: white;
  box-shadow: 0px 0px 0px 2px white;
  border-radius: 3px;
  padding: 5px 2em;
  transition: 0.5s;
  font-weight: 400;
}
.login .form .btn-login:hover {
  background: white;
  color: dimgray;
  transition: 0.5s;
  font-weight: 600;
}
.login .forgot {
  text-decoration: none;
  color: white;
  float: right;
}
footer {
  position: absolute;
  color: #136a8a;
  bottom: 10px;
  padding-left: 20px;
}
footer p {
  display: inline;
}
footer a {
  color: green;
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
}
footer .heart {
  color: #b22222;
  font-size: 1.5em;
}
</style>
