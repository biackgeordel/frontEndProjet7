<template>
 <message :user="user" :items="items"></message> 
    
</template>
<script>
import Message from '../user/Message.vue'
export default{
  components: { Message },
name:'Item-message',
props:['items','user']

}

</script>
<style lang="scss" scoped>

</style>
