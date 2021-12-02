<template>
 <message :items="items" ></message> 
    
</template>
<script>
import Message from '../user/Message.vue'
export default{
  components: { Message },
name:'Item-message',
props:['items']
}


</script>
<style lang="scss" scoped>

</style>
