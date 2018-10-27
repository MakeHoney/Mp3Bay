<template>
    <div class="artist">
        <div>
            <li>아티스트 명: {{ name }}</li>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            name: this.$route.params.name
        }
    }
}
</script>

