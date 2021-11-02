<template>
    <div>
            <h1>UserHome</h1>
         <div>USER {{user}}</div> 
         <list-message></list-message>
         

    </div>


</template>
<script>
import ListMessage from './List-message.vue';
export default{

    name:'UserHome',
    props:['user'],
    components:{
        ListMessage
    }
}

</script>
<style lang="scss">


</style>