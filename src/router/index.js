import Vue from 'vue'
import VueRouter from 'vue-router'
import TrafficLight from "@/components/TrafficLight";

Vue.use(VueRouter)

const routes = [
  {
    path: '/:color?',
    name: 'Home',
    props: true,
    component: TrafficLight
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router