<template>
     
       <div class="cont" >
           <router-view ></router-view>    
       </div>              
 
</template>

<script>

export default {
  name: 'Accueil',
   
}
  
</script>

<style lang="scss" scoped>
  .cont{
    background-color:rgba(47, 54, 64,1.0);
     //background-color:rgba(30, 39, 46,1),;
  // background-image:url("../../assets/fond-forme-geometrique-degrade_78532-307.jpg");
 
  }
</style>
