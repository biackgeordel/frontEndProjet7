
<template>
<div>
    {{ test.Likes}}
    {{test.DisLikes}}
   <message :items="test"></message>
   </div>

</template>



<script>
import { mapState } from 'vuex';
import message from './Message.vue';


export default{
name:'OneMessage',
props:['id'],//on recupére l'id du message envoyé dans le lien dans le header
components:{
    message
},
data(){
    return{
    
    }
},
mounted(){
    this.$store.dispatch('fetchGetOneMessage',this.id);
    
 
},

watch:{
id(){
    this.$store.dispatch('fetchGetOneMessage',this.id)
  },

 


}, 


computed:{
    ...mapState([
        'message'
    ]),

    test:function(){
    let  newVal=this.message;
        console.log('val:',newVal);
        return newVal;
    }
},





  

}
</script>
<style lang="scss" scoped>
</style>  