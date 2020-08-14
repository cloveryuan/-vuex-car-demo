let _Vue = null // 存放vue构造函数
class Store {
  constructor (options) {
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispatch (type, payload) {
    this._actions[type](this, payload)
  }
}
function install (Vue) {
  _Vue = Vue
  _Vue.mixin({ // 只有实例中$options才有store，组件$options中没有，只需要实例化的时候调用install就好了
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store // 实例上的store注入原型上去，这样可以直接this.$store获取到store
      }
    }
  })
}
export default { install, Store }
