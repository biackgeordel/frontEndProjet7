<template>
        <div>
          <div >
            <div v-for="items in data" :key="items.id">
                       <div>
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
props:['datas'],
computed:{
  data(){
    return this.datas;
  }

},

}

</script>
<style lang="scss" scoped>

</style>