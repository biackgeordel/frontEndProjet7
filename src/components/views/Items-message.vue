<template>
      <div>
           <message :items="items" :message="message"></message> 
      </div>


    
</template>
<script>
import Message from '../user/Message.vue'
export default{
  components: { Message },
name:'Item-message',
props:['items','message']
}


</script>
<style lang="scss" scoped>

</style>
