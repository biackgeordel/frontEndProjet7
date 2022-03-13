<template>
  <div id="app">
    <header>
        <the-header></the-header>
    </header>
    <main>       
        <router-view></router-view>  

    </main>  
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

<style lang="scss">
  #app{
     font-family: 'Shippori Antique B1', sans-serif;
 

   
  }
  .v-enter{
    opacity:0;
    transform: translateY(-10px);
 
  }
  .v-enter-active{
     transition: opacity 2s ease-in-out,transform 1s ease-in-out 1s;
  }

  .v-leave-to{
      opacity:0;

  }
  .v-leave-active{
    transition: opacity 1s ease-in-out,transform 1s ease-in-out 2s;
  }




</style>
