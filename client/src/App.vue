<template>
  <div id="app">
      <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/player">player</router-link> |
          <router-link to="/artists">artists</router-link> |
          <router-link to="/register">register artist</router-link>
      </div>
      <router-view/>
  </div>
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch('registerWeb3')
    }
}
</script>


<style>
</style>
