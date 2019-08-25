import { api } from '@utils/axiosHttp'
import { keyBy } from 'lodash'

export const state = {
  currentModel: null,
  data: {},
}

export const getters = {
  CURRENT_MODEL(state) {
    return state.currentModel
  },
  CURRENT_INSTANCES(state) {
    return state.data[state.currentModel]
  },
  GET_INSTANCE(state) {
    return (id) => {
      return keyBy(state.data[state.currentModel], 'id')[id]
    }
  },
}

export const mutations = {
  SET_DATA(state, data) {
    if (state.currentModel)
      state.data = { ...state.data, [state.currentModel]: data }
  },
  UPDATE_INSTANCE(state, instance) {
    if (state.data[state.currentModel] instanceof Array)
      state.data[state.currentModel] = state.data[state.currentModel].map(
        (inst) => {
          if (instance.id === inst.id) return instance
          return inst
        }
      )
  },
  DELETE_INSTANCE(state, instance) {
    if (state.data[state.currentModel] instanceof Array)
      state.data[state.currentModel] = state.data[state.currentModel].filter(
        (inst) => {
          return instance.id !== inst.id
        }
      )
  },
  SET_CURRENT_MODEL(state, model) {
    state.currentModel = model
  },
}

export const actions = {
  FETCH_DATA({ state, commit, rootState }) {
    if (state.currentModel)
      return api
        .get(
          `/api${keyBy(rootState.specs.specs, 'name')[state.currentModel].path}`
        )
        .then((result) => {
          if (Object.keys(result.data).includes('rows'))
            // handle the effect of lb count mixin
            commit('SET_DATA', result.data.rows)
          else commit('SET_DATA', result.data)
          return result
        })
  },
  UPDATE_INSTANCE({ state, commit, rootState }, instance) {
    if (state.currentModel)
      return api
        .patch(
          `/api${
            keyBy(rootState.specs.specs, 'name')[state.currentModel].path
          }/${instance.id}`,

          instance
        )
        .then((result) => {
          commit('UPDATE_INSTANCE', result.data)
          return result
        })
    else throw new Error()
  },
  NEW_INSTANCE({ state, dispatch, rootState }, newInstance) {
    if (state.currentModel)
      return api.post(
        `/api${keyBy(rootState.specs.specs, 'name')[state.currentModel].path}`,
        newInstance
      )
    else throw new Error()
  },
  DELETE_INSTANCE({ state, commit, rootState, dispatch }, instance) {
    if (state.currentModel)
      return api
        .delete(
          `/api${
            keyBy(rootState.specs.specs, 'name')[state.currentModel].path
          }/${instance.id}`
        )
        .then((result) => {
          if (result.data.count > 0) dispatch('FETCH_DATA')

          return result
        })
  },
  SET_CURRENT_MODEL({ state, commit, rootState }, model) {
    return api.get(`/specs`).then((result) => {
      if (result.data.filter(({ name }) => name === model).length) {
        commit('SET_CURRENT_MODEL', model)
        return result
      } else throw new Error()
    })
  },
}
