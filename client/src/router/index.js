import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { RouteHelper } from './helpers'
import Home from '@/components/Home'
import Player from '@/components/Player'
import Artists from '@/components/Artists'
import Artist from '@/components/Artist'
import RegisterArtist from '@/components/RegisterArtist'

Vue.use(Router)

const router = new Router({
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

router.beforeEach(async (to, from, next) => {
    if(to.name === 'register-artist') {
        
    } else if (to.name === 'artists') {
        await RouteHelper.beforeArtists()
    }
    NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router