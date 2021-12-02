<template>
        <div>
          <div class="container">
            <div v-for="items in datas" :key="items.id">
                       <div class="message">
                      <items-message :items="items"></items-message>
                    </div>
                 
             </div>
         </div>
        </div>
    
    
</template>
<script>
   import ItemsMessage from "./Items-message.vue";

export default{
name:'Item-message',
components:{
    ItemsMessage,
   
},
props:['datas']
}

</script>
<style lang="scss" scoped>
  .container{
    width:100%;
    margin:auto;
    //border:1px solid red;
    display:flex;
    flex-direction:column;
    align-items:center;
    align-content: space-between;
 
    
  }
  

</style>