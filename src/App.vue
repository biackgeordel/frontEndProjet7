<template>
    <div id="app">

        <div>
          <the-header></the-header>
          <component :is="page"></component>
        </div>
          
    
      
  
        
      
          
    </div>
</template>

<script>
    import TheForm from './components/TheForm.vue';
   import Accueil from './components/user/Accueil.vue';
   import TheHeader from './components/user/TheHeader.vue';
    import { eventBus } from './main';

export default {
  name: 'app',
  components: {
    TheForm,
   Accueil,
    TheHeader
   
  },
  data(){
    return{
      page:eventBus.page
    }

  },
  created(){
    this.page=eventBus.page;
    eventBus.$on('update:page',(page)=>{
      this.page=page;
       console.log("page de app.vue");
      console.log("test");
    })
  

  }
  }
  
</script>

<style lang="scss">

</style>
