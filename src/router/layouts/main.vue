<script>
import NavBar from '@components/nav-bar'
import SideBar from '@components/side-bar'

export default {
  components: { NavBar, SideBar },
  props: {
    noBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      displayFab: false,
    }
  },
  methods: {
    gotoTop() {
      this.$vuetify.goTo(this.$refs.top, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      })
    },
    onScroll(e) {
      this.displayFab = e.target.scrollingElement.scrollTop > 250
    },
  },
}
</script>

<template>
  <div>
    <SideBar />

    <v-content v-scroll="onScroll">
      <NavBar ref="top" />
        <slot />
      <v-fab-transition>
        <v-btn
          v-if="displayFab"
          color="#66676b"
          dark
          fab
          fixed
          bottom
          right
          @click="gotoTop()"
        >
          <v-icon>fa-angle-up</v-icon>
        </v-btn>
      </v-fab-transition>
      <template>
  <v-footer
    dark
    padless
    class="mt-5"
  >
    <v-card
      width="100%"
      flat
      tile
      class="mt-5 pt-0 green lighten-2 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ]"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Guzo is a travel and Booking system built in Ethiopia!
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Guzo.com.et</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

    </v-content>


     </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
