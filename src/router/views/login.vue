<script>
import Layout from '@layouts/auth'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: { Layout },
  data() {
    return {
      username: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
      passwordVisible: false,
    }
  },
  computed: {
    placeholders() {
      return process.env.NODE_ENV === 'production'
        ? {}
        : {
            username: 'Use "user" to log in with the mock API',
            password: 'Use "password" to log in with the mock API',
          }
    },
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.username,
        password: this.password,
      })
        .then((token) => {
          this.tryingToLogIn = false

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <Layout>
    <template slot="title">
      Login
    </template>
    <v-form :class="$style.form" @submit.prevent="tryToLogIn">
      <v-text-field
        v-model="username"
        name="username"
        :label="placeholders.username"
        solo
      />
      <v-text-field
        v-model="password"
        name="name"
        :label="placeholders.password"
        hint="At least 8 characters"
        min="8"
        :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
        value="Password"
        error
        solo
        :type="!passwordVisible ? 'password' : 'text'"
        @click:append="() => (passwordVisible = !passwordVisible)"
      ></v-text-field>
      <v-btn :disabled="tryingToLogIn" type="submit">
        <BaseIcon v-if="tryingToLogIn" name="sync" spin />
        <span v-else>
          Log in
        </span>
      </v-btn>
      <p v-if="authError">
        There was an error logging in to your account.
      </p>
    </v-form>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.form {
  text-align: center;
}
</style>
