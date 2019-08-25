import * as navbarModule from './navbar'

describe('@state/modules/navbar', () => {
  it('exports a valid Vuex module', () => {
    expect(navbarModule).toBeAVuexModule()
  })
})
