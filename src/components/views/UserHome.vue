<template>
    <div >
        <div>
            <message></message> 
        </div>
              
           
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