<template>
    <div class="audio">
        <audio controls controlsList="nodownload">
            <source src="http://localhost:3000/test" type="audio/mpeg">
        </audio>
    </div>
</template>

<script>
export default {
    name: 'audio'
}
</script>
