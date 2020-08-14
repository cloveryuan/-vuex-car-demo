import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')// ＄1是正则里的捕获,就是前面（）里的东西
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 自定义插件carPlugin，只有car模块里面调用motution，就保存购物车最新详情
const carPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('car-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  plugins: [carPlugin]
})
export default store
