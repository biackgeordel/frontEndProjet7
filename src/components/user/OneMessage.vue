<template>
<div>
<items-message :items="message"></items-message>


</div>


    
</template>
<script>
import { mapState } from 'vuex';
import itemsMessage from '../views/Items-message.vue';

export default{
name:'OneMessage',
components:{
itemsMessage
},
props:['id'],//on recupére l'id du message envoyé dans le lien dans le header
created(){
    this.$store.dispatch('fetchGetOneMessage',this.id);

},
watch:{
id(){
  this.$store.dispatch('fetchGetOneMessage',this.id);  
}
},
computed:{
    ...mapState([
        'message'
    ])
}



  

}



</script>
<style lang="scss" scoped>

</style>