import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import { RouteHelper } from './helpers'
import { userIdentification } from '../utils'
import Home from '@/components/Home'
import Artists from '@/components/Artists'
import Artist from '@/components/Artist'
import RegisterArtist from '@/components/register/RegisterArtist'
import RegisterListener from '@/components/register/RegisterListener'
import RegisterSong from '@/components/register/RegisterSong'

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
            path: '/artist/register-song',
            name: 'register-song',
            component: RegisterSong
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
    if(to.name === 'register-song') {
        if((await userIdentification.userType()) === 'Artist') {
            next()
        } else {
            alert('아티스트 등록을 먼저 해주세요!')
            next({ name: 'register-artist' })
        }
    } else if (to.name === 'artists') {
        // await RouteHelper.beforeArtists()
        next()
    } else if (to.name === 'register-artist') {
        if((await userIdentification.userType()) === 'Artist') {
            let { name, id } = await RouteHelper
                .getArtistInfoByArtistAcc(store.state.blockSync.web3.coinbase)

            alert(` 이미 아티스트 등록이 되어있습니다.\n
            아티스트명: ${name}\n
            아티스트 ID: ${id}`)

            next({ name: 'register-song' })
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
