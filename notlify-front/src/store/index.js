import { createStore, createLogger } from 'vuex'
import kanban from './modules/kanban.js'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    kanban
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})