import { api } from '@utils/axiosHttp'

export const state = {
  ticketPurchaseAttempts: [],
}

export const getters = {
  TICKET_PURCHASE_ATTEMPTS({ ticketPurchaseAttempts }) {
    return ticketPurchaseAttempts
  },
}

export const mutations = {
  SET_TICKET_PURCHASE_ATTEMPTS(state, newTicketPurchaseAttempts) {
    state.ticketPurchaseAttempts = newTicketPurchaseAttempts
  },
}

export const actions = {
  init({ dispatch }) {
    dispatch('FETCH_TICKET_PURCHASE_ATTEMPTS')
  },
  FETCH_TICKET_PURCHASE_ATTEMPTS({ commit }) {
    return api
      .get(`api/TicketPurchaseAttempts/fetchTicketPurchaseAttempts`)
      .then((response) => {
        const ticketPurchaseAttempts = response.data
        commit('SET_TICKET_PURCHASE_ATTEMPTS', ticketPurchaseAttempts)
      })
  },
}
