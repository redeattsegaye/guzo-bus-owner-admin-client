<script>
import NavBar from '@components/nav-bar'

export default {
  components: { NavBar },
}
</script>

<template>
  <div>
    <v-content v-scroll="onScroll">
      <NavBar ref="top" />
      <v-container fluid>
        <v-card>
          <v-card-title primary-title class="title">
            <slot name="title"></slot>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <slot />
          </v-card-text>
        </v-card>
      </v-container>
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
