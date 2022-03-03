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
//import { mapState } from 'vuex';
import TheHeader from "./components/views/TheHeader.vue";
export default {
  name: 'app',
  components: {  
    TheHeader
  },
  created(){
   // this.$store.dispatch('fetchGetCommentaire');
  },
  computed:{
   /* ...mapState([
      'commentaire'
    ]
      
    )*/
  }

}

  
</script>

<style lang="scss">
  #app{
    font-family: 'Shippori Antique B1', sans-serif;
    @media(max-width:950px){
      *{
        font-size:4vw;

      }
      h4{
        font-size:4vw;
      }
    }
  }


</style>
