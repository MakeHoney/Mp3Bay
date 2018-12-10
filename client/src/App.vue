<template>
    <div id="app">
        <nav-bar/>
        <div clas1s="container">
            <!--<player/>-->
            <keep-alive include="player">
                <transition name="router-anim">
                    <router-view></router-view>
                </transition>
            </keep-alive>
        </div>
    </div>
</template>

<script>
  import NavBar from './components/common/NavBar'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapState({
        user: state => state.user,
        contractInstance: state => state.blockSync.contractInstance
      })
    },
    components: {
      NavBar
    },
    async created () {
      await this.$store.dispatch('blockSync/checkWeb3')
      await this.$store.dispatch('blockSync/getContractInstance')
      await this.$store.dispatch('initPlayList')
    }
  }
</script>


<style>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import url("http://fonts.googleapis.com/css?family=Oleo+Script");
    /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        background: white;

        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px white, 0 0 5px white;
        opacity: 1.0;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
    }

    #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: white;
        border-left-color: white;
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
        0%   { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .router-anim-enter-active {
        animation: coming 1s;
        animation-delay: .2s;
        opacity: 0;
    }
    .router-anim-leave-active {
        animation: going .2s;
    }

    @keyframes going {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50px);
            opacity: 0;
        }
    }
    @keyframes coming {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
