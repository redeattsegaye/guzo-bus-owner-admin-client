<script>
import appConfig from '@src/app.config'
import eventBus from '@src/eventBus'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      snackbar: false,
      snackbarData: {
        snackbarText: '',
        snackbarIcon: 'notification_important',
        snackbarColor: 'info',
        snackbarTimeout: 5000,
      },
    }
  },
  created() {
    eventBus.$on('notify', (data) => {
      this.snackbar = true
      this.snackbarData.snackbarText = data.text
      this.snackbarData.snackbarIcon = data.icon
        ? data.icon
        : this.snackbarData.snackbarIcon
      this.snackbarData.snackbarColor = data.color
        ? data.color
        : this.snackbarData.snackbarColor
      this.snackbarData.snackbarTimeout = data.timeout
        ? data.timeout
        : this.snackbarData.snackbarTimeout
    })
  },
}
</script>

<template>
  <v-app id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
    <!-- <v-snackbar
      v-model="snackbar"
      :color="snackbarData.snackbarColor"
      :timeout="snackbarData.snackbarTimeout"
      top
      right
    >
      <v-layout row align-center>
        <v-icon class="mr-1">{{ snackbarData.snackbarIcon }}</v-icon
        >{{ snackbarData.snackbarText }}
      </v-layout>
    </v-snackbar> -->
  </v-app>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: $color-body-bg;
}
#app {
  @extend %typography-small;
}

// ===
// Base element styles
// ===

a,
a:visited {
  color: $color-link-text;
}

h1 {
  @extend %typography-xxlarge;
}

h2 {
  @extend %typography-xlarge;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>
