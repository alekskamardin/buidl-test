import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sm: 900,
    md: 1250,
    lg: Infinity
  },
  defaultBreakpoint: 'default'
})
