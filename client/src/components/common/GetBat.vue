<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="Artist Detail" id="modal">
            <div class="d-block text-center">
                <b-row class="my-1">
                    <b-col sm="2"><label>Title:</label></b-col>
                    <b-col sm="9">
                        <b-form-input id="input-bat"
                                      type="number"
                                      v-model="bat">
                        </b-form-input>
                    </b-col>
                </b-row>
            </div>
            <b-btn class="mt-3"
                   variant="outline-danger"
                   block
                   @click="submitUploadForm">
                Pay for BAT
            </b-btn>
        </b-modal>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        bat: 0
      }
    },
    methods: {
      showModal () {
        this.$refs.createForm.show()
      }
    },
    mounted () {
      this.$EventBus.$on('getBATButtonClicked', this.showModal)
    }
  }
</script>
