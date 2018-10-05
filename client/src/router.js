import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Player from './components/Player.vue'
import Artists from './components/Artists.vue'
import Artist from './components/Artist.vue'
import RegisterArtist from './components/RegisterArtist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/player',
        name: 'player',
        component: Player
    },
    {
        path: '/artists',
        name: 'artists',
        component: Artists
    },
    {
        path: '/artists/:id',
        name: 'artist',
        component: Artist
    },
    {
        path: '/register',
        name: 'register-artist',
        component: RegisterArtist
}
  ]
})
