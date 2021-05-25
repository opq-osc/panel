import './notification'
import './socket'
import Vue from 'vue'
import VCharts from 'v-charts'
import 'echarts/lib/chart/line'
import VueCodemirror from 'vue-codemirror'
import vuetify from './vuetify'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)
Vue.use(VCharts)
export { vuetify }
