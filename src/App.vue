<template>
    <div id="app">
          <the-header></the-header> 
          <router-view></router-view>    
    
    </div>
</template>

<script>


   import TheHeader  from './components/user/TheHeader.vue';

export default {
  name: 'app',
  components: {
    TheHeader,  
  },
  data(){
      return {
       
      }
  },
  created(){
    console.log('la route dans app.vue', this.$route.path);
      
    
  }
}
  
</script>

<style lang="scss">


</style>
