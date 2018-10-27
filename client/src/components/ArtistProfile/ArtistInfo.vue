<template>
    <div>
        <div class="artist-info">
            <li>아티스트 명: {{ name }}</li>
            <li>아티스트 월렛: {{ account }}</li>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        },
        account: {
            type: String
        }
    }
}
</script>

