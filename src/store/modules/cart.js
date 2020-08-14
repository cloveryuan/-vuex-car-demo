const cart = {
  namespaced: true,
  state: {
    cartProducts: window.localStorage.getItem('car-products') ? JSON.parse(window.localStorage.getItem('car-products')) : []
  },
  getters: {
    totalCount (state) {
      return state.cartProducts.reduce((pre, cur) => pre + cur.count, 0)
    },
    totalPrice (state) {
      return state.cartProducts.reduce((pre, cur) => pre + cur.totalPrice, 0)
    },
    checkedCount (state) {
      return state.cartProducts.reduce((pre, cur) => {
        if (cur.isChecked) {
          pre += cur.count
        }
        return pre
      }, 0)
    },
    checkedPrice (state) {
      // 不行 return state.cartProducts.reduce((pre, cur) => cur.isChecked ? pre + cur.totalPrice : '', 0)
      return state.cartProducts.reduce((pre, cur) => {
        if (cur.isChecked) {
          pre += cur.totalPrice
        }
        return pre
      }, 0)
    }
  },
  mutations: {
    addToCart (state, pro) {
      const product = state.cartProducts.find(f => f.id === pro.id)
      if (product) {
        product.count += 1
        product.isChecked = true
        product.totalPrice = product.count * product.price
        state.cartProducts.splice(0, 0)
      } else {
        pro.count = 1
        pro.isChecked = true
        pro.totalPrice = pro.count * pro.price
        state.cartProducts.push(pro)
      }
    },
    deleteFromCart (state, pro) {
      state.cartProducts = state.cartProducts.filter(f => !(f.id === pro.id))
    },
    updateAllProductChecked (state, isChecked) {
      state.cartProducts = state.cartProducts.map(m => {
        return { ...m, isChecked }
      })
    },
    updateProductChecked (state, pro) { // 单选
      const product = state.cartProducts.find(f => f.id === pro.id)
      product && (product.isChecked = pro.checked)
      state.cartProducts.splice(0, 0)
    },
    updateProductCount (state, pro) {
      const product = state.cartProducts.find(f => f.id === pro.id)
      if (product) {
        product.count = pro.count
        product.totalPrice = pro.count * product.price
      }
      state.cartProducts.splice(0, 0)
    }
  },
  actions: {}
}
export default cart
