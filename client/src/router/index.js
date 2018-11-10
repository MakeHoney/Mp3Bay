import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import { RouteHelper } from './helpers'
import { CheckPerson } from '@/utils/checkPerson'
import Home from '@/components/Home'
import Player from '@/components/Player'
import Artists from '@/components/Artists'
import Artist from '@/components/Artist'
import RegisterArtist from '@/components/register/RegisterArtist'
import RegisterListener from '@/components/register/RegisterListener'
import ArtistProfile from '@/components/ArtistProfile/Index'

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
            component: ArtistProfile
        },
        {
            path: '/register-artist',
            name: 'register-artist',
            component: RegisterArtist
        },
        {
            path: '/register-listener',
            name: 'register-listener',
            component: RegisterListener
        }
    ]
})

// next 좀 더 면밀히 알아본 뒤 수정
router.beforeEach(async (to, from, next) => {
    NProgress.start()

    // home doesn't need information of contract and user account
    if(to.name !== 'home') {
        await RouteHelper.setBasicInform()
        next()
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
        if(await CheckPerson.isArtist()) {
            let { name, id } = await RouteHelper
                .getArtistInfoByArtistAcc(store.state.blockSync.web3.coinbase)

            alert(` 이미 아티스트 등록이 되어있습니다.\n
            아티스트명: ${name}\n
            아티스트 ID: ${id}`)

            next({ name: 'artist-profile' })
        } else {
            next()
        }
    } else {
        next()
    }
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
