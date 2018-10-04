<template>
  <div id="app">
      <div id="nav">
          <router-link to="/">audio</router-link>|
          <router-link to="/artists">artists</router-link>|
          <router-link to="/register">register artist</router-link>
      </div>
      <router-view/>
  </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('registerWeb3')
    }
}
</script>


<style>
</style>
