import axios from 'axios'
const products = {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    getProducts_MUTATION (state, list) {
      state.products = list
    }
  },
  actions: {
    getProducts ({ commit }) {
      axios.get('http://127.0.0.1:3000/products').then(res => {
        const list = res.data
        commit('getProducts_MUTATION', list)
      })
    }
  }
}
export default products
