import * as modelInstancesModule from './model-instances'

describe('@state/modules/model-instances', () => {
  it('exports a valid Vuex module', () => {
    expect(modelInstancesModule).toBeAVuexModule()
  })
})
