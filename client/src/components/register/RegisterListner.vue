<template>
    <form @submit.prevent="submitForm(formData)">
        <b-container fluid>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-none">Wallet Account:</label></b-col>
                <b-col sm="9">
                    <p>{{ web3.coinbase }}</p>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-nickname">nickname:</label></b-col>
                <b-col sm="9">
                    <b-form-input id="input-nickname"
                                  type="text"
                                  v-model="formData.nickname">
                    </b-form-input>
                </b-col>
            </b-row>

            <input type="submit" id="submit" value="작성">
        </b-container>
    </form>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'register-listener',
        data () {
            return {
                formData: {
                    nickname: ''
                }
            }
        },
        methods: {
            submitForm (formData) {

            }
        },
        computed: {
            ...mapGetters([
                'web3'
            ])
        }
    }
</script>
