<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
    <mainTabbar />
  </div>
</template>

<script>
  import mainTabbar from 'components/content/mainTabbar/mainTabbar'
  export default {
    name: 'app',
    components: {
      mainTabbar
    }
  }
</script>

<style>
  @import "assets/css/base.css"
</style>
