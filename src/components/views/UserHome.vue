<template>
    <div>
         <list-message :datas="datas"></list-message>
        
    </div>



</template>
<script>

import ListMessage from '../views/List-message.vue';
export default{

    name:'UserHome',
    props:['user'],
    components:{
        ListMessage,
        
    },
    data(){
        return{
            datas:[]
        }
    },
    created(){
        console.log('creatded',this.datas);
         this.$http.get('allmessage').then(response=>{
                if(response.status===200){
                    this.datas=response.data;
             
                }
         }).catch(error=>{
             console.log(error);
         })
    },
}

</script>
<style lang="scss" scoped>



</style>