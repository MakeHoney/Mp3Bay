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
                <b-col sm="2"><label for="input-listenerName">Listener Name:</label></b-col>
                <b-col sm="9">
                    <b-form-input id="input-listenerName"
                                  type="text"
                                  v-model="formData.listenerName">
                    </b-form-input>
                </b-col>
            </b-row>

            <input type="submit" id="submit" value="Register">
        </b-container>
    </form>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    export default {
        name: 'register-listener',
        data () {
            return {
                formData: {
                    listenerName: ''
                }
            }
        },
        methods: {
            async submitForm (formData) {
                try {
                    console.log('formData', formData.listenerName)
                    const result = await this.contractMethods.registerListener(formData.listenerName).send({
                        gas: 1000000,
                        value: 0,
                        from: this.web3.coinbase
                    })

                    const { name, listenerAddr } = result.events.ListenerCreated.returnValues;
                    [this.user.type, this.user.name, this.user.address] =
                        ['Listener', name, listenerAddr]

                } catch(err) {
                    console.error('Error occurred at RegisterListener.vue', err)
                }
            }
        },
        computed: {
            ...mapState({
                web3: state => state.blockSync.web3,
                contractInstance: state => state.blockSync.contractInstance,
                user: state => state.user
            }),
            ...mapGetters('blockSync', [
                'contractMethods'
            ])
        }
    }
</script>
