<template>
    <div>
        <div>
            <b-button @click="showRegisterForm">
                곡 등록
            </b-button>
            <b-button @click="showSongList">
                등록한 음악
            </b-button>
        </div>

        <b-modal ref="registerForm" hide-footer title="곡 등록">
            <div class="d-block text-center">
                <h3>곡 정보</h3>
                <input type="text" v-model="title">
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideRegisterForm">등록</b-btn>
        </b-modal>

        <b-modal ref="songList" hide-footer title="나의 음악">
            <div class="d-block text-center">
                <h3>~님이 등록한 음악</h3>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideSongList">닫기</b-btn>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: ''
        }
    },
    methods: {
        showRegisterForm () {
            this.$refs.registerForm.show()
        },
        hideRegisterForm () {
            this.$refs.registerForm.hide()
        },
        showSongList () {
            this.$refs.songList.show()
        },
        hideSongList () {
            this.$refs.songList.hide()
        }
    }
}
</script>