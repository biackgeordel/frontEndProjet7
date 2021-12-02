<template>
  <div id="app">
        <the-header></the-header>
        <router-view></router-view>    
    
  </div>
</template>



<script>
import TheHeader from "./components/views/TheHeader.vue";
export default {
  name: 'app',
  components: {  
    TheHeader
  },

 

}
  
</script>

<style lang="scss" scoped>
</style>
