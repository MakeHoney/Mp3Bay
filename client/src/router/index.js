import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { RouteHelper } from './helpers'
import { CheckPerson } from '@/utils/checkPerson'
import Home from '@/components/Home'
import Player from '@/components/Player'
import Artists from '@/components/Artists'
import Artist from '@/components/Artist'
import RegisterArtist from '@/components/RegisterArtist'
import artistProfile from '@/components/artistProfile'

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
        // URL 수정 필요
        path: '/artist/profile',
        name: 'artist-profile',
        component: artistProfile
    },
    {
        path: '/register-artist',
        name: 'register-artist',
        component: RegisterArtist
    }
  ]
})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if(to.name !== 'home') {
        await RouteHelper.setBasicInform()
    }
    // change this with switch statement
    if(to.name === 'artist-profile') {
        if(await CheckPerson.isArtist()) {
            next()
        } else {
            alert('아티스트 등록을 먼저 해주세요!')
            next({ name: 'register-artist' })
        }
    } else if (to.name === 'artists') {
        await RouteHelper.beforeArtists()
        next()
    } else if (to.name === 'register-artist') {
        // 이미 아티스트로 등록돼 있다면 알림(alert())후 리디렉션
        next()
        
    } else {
        next()
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router