<template>
    <!-- toggleable이 있어야 dropdown이 정상적으로 동작 -->
    <!-- size 조절 시 b-collapse 사라지는 문제 -->
    <b-navbar toggleable="md" variant="danger" type="light">
        <b-navbar-brand class="home-link-button" :to="{ name: 'home' }">MP3Bay</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item :to="{ name: 'player' }">Player</b-nav-item>
                <b-nav-item :to=" { name: 'artists' } ">Artists</b-nav-item>
                <b-nav-item :to=" { name: 'register-artist' } ">Register Artist</b-nav-item>
                <b-nav-item :to=" { name: 'register-listener' } ">Register Listener</b-nav-item>

            </b-navbar-nav>

            <b-navbar-nav v-if="web3.web3Instance" class="ml-auto">
                <!-- make condition -->
                <b-nav-item :to=" { name: 'artist-profile' } ">Artist Page</b-nav-item>

                <b-nav-item-dropdown text="유저 정보" right>
                    <b-dropdown-item href="#">Network: {{ web3.networkID }}</b-dropdown-item>
                    <b-dropdown-item href="#">Account: {{ web3.coinbase }}</b-dropdown-item>
                    <b-dropdown-item href="#">Balance: {{ web3.balance }} Wei</b-dropdown-item>
                    <b-dropdown-item href="#">type: {{ user.type }}</b-dropdown-item>
                    <b-dropdown-item href="#">name: {{ user.name }}</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'nav-bar',
        computed: {
            ...mapState({
                web3: state => state.blockSync.web3,
                user: state => state.user
            })
        }
    }
</script>

<style>
    .home-link-button {
        font-weight: bold;
    }
</style>
