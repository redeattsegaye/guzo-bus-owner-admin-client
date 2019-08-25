<script>
import { authComputed, toggleDrawer } from '@state/helpers'

export default {
  data() {
    return {
      persistentNavRoutes: [
        {
          name: '/help',
          icon: 'help'
        },

      ],
      loggedInNavRoutes: [
        {
          name: '/profile',
          title: () => 'Logged in as ' + JSON.stringify(this.currentBusOwner.user.username),
        },
        {
          name: '/logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: '/login',
          title: 'Log in',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
  methods: {
    getRouteTitle(route) {
      return typeof route.title === 'function' ? route.title() : route.title
    },
    ...toggleDrawer,
  },
}
</script>

<template>
  <div>
    <v-toolbar :scroll-threshold="150"   prominent    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" scroll-off-screen>
      <v-toolbar-side-icon @click="TOGGLE_DRAWER"></v-toolbar-side-icon>
      <v-toolbar-title class="display-1" @click="$router.push('/')">
          <span class="green--text">ጉ</span>zo<span class="headline font-weight-light"> Bus Owner | Admin Panel</span>
      </v-toolbar-title>


      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
                <template v-if="loggedIn">
          <v-btn
            v-for="route in loggedInNavRoutes"
            :key="route.name"
            :to="route.name"
            flat
            >{{ getRouteTitle(route) }}</v-btn
          >
        </template>

        <template v-else>
          <v-btn
            v-for="route in loggedOutNavRoutes"
            :key="route.name"
            :to="route.name"
            flat
            >{{ getRouteTitle(route) }}</v-btn
          >
        </template>
                <template>
          <v-btn
            v-for="route in persistentNavRoutes"
            :key="route.name"
            :to="route.name"
            flat
            >
            <v-icon v-if="route.icon" class="px-2">{{route.icon}}</v-icon>
            <span v-if="route.title">
              {{ getRouteTitle(route) }}
            </span>
            </v-btn
          >
        </template>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>
