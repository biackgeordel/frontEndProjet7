<template>
     
       <div>
           <div class="cont">
             <router-view ></router-view> 
             </div>   
       </div>              
 
</template>

<script>

export default {
  name: 'Accueil',
   
}
  
</script>

<style lang="scss" scoped>
     .cont{
       background-color:rgba(116, 125, 140,1.0)//#ecf0f1;
     }


</style>
