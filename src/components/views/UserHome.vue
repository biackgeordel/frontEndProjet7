<template>
    <div>
         <message></message>     
    </div>



</template>
<script>
import Message from '../user/Message.vue';
export default{

    name:'UserHome',
    props:['user'],
    components:{
        Message,
        
    }, 
}

</script>
<style lang="scss" scoped>



</style>