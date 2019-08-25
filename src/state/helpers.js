import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentBusOwner: (state) => state.currentBusOwner,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const items = mapGetters('specs', ['SPECS', 'PROPERTIES'])

export const ticketPurchaseAttemptsGetters = mapGetters('tickets', [
  'TICKET_PURCHASE_ATTEMPTS',
])

export const ticketPurchaseAttemptsMethods = mapActions('tickets', [
  'FETCH_TICKET_PURCHASE_ATTEMPTS',
])

export const busesGetters = mapGetters('buses', ['BUSES'])
export const busesMethods = mapActions('buses', [
  'INSERT_BUS',
  'FETCH_BUSES',
  'INSERT_SEAT',
  'EDIT_SEAT',
])
export const journiesGetters = mapGetters('journies', ['JOURNIES'])
export const journiesMethods = mapActions('journies', [
  'INSERT_JOURNEY',
  'FETCH_JOURNIES',
  'ADD_SOURCE_CITY',
  'ADD_DESTINATION_CITY',
  'ADD_TICKETS',
])
export const citiesGetters = mapGetters('cities', ['CITIES'])
export const citiesMethods = mapActions('cities', ['FETCH_CITIES'])

export const toggleDrawer = mapMutations('navbar', ['TOGGLE_DRAWER'])
export const drawerState = mapGetters('navbar', ['DRAWER'])

export const modelInstanceMethods = mapActions('modelInstances', [
  'SET_CURRENT_MODEL',
  'NEW_INSTANCE',
  'FETCH_DATA',
  'DELETE_INSTANCE',
  'UPDATE_INSTANCE',
])

export const modelInstanceComputed = {
  ...mapState('modelInstances', ['currentModel']),
  ...mapState('modelInstances', ['data']),
}

export const modelInstanceGetters = mapGetters('modelInstances', [
  'CURRENT_MODEL',
  'GET_INSTANCE',
  'CURRENT_INSTANCES',
])
