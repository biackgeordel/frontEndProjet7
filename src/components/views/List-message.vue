<template>

         <div class="container">
            <div  class="container-message" v-for="items in messages" :key="items.idMessage">
                <div class="message ">
                  <items-message :user="allUser" :items="items"></items-message>
                </div>
            <div class="commentaire " style="padding-right:10%;">
                  <items-commentaire  :idMessage="items.idMessage"></items-commentaire> 
                </div> 
            </div> 

        </div>
    
</template>
<script>
import ItemsMessage from "./Items-message.vue";
import ItemsCommentaire from "./Items-commentaire.vue"
export default{
name:'Item-message',
components:{
    ItemsMessage,
    ItemsCommentaire
},

created(){
  //on dispatche fetchMessage
this.$store.dispatch('fetchMessage');
this.$store.dispatch('fetchUser');
},
computed:{
  messages(){
    return this.$store.state.message;
  },
  allUser(){
    return this.$store.state.user;
  }
}

}

</script>
<style lang="scss" scoped>
  .container{
    width:100%;
    margin:auto;
    //border:1px solid red;
    display:flex;
    flex-direction:column;
    align-items:center;
    align-content: space-between;
    .container-message{
      border-radius:1%;
      width:50vw;
      box-shadow:1px 1px  5px  rgb(184, 184, 185) ;
      margin-top:2%;
      margin-bottom: 2%;
      @media (max-width:950px){
          font-size:2vw;
          width:100%;
          box-shadow:none;
        
      }

    }
    
  }

</style>