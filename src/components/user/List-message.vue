<template>

         <div class="container">
            <div  class="container-message" v-for="items in message" :key="items.id">
                <div class="message">
                  <items-message :items="items"></items-message>
                </div>
            <div class="commentaire">
                  <items-commentaire  :id="items.id"></items-commentaire> 
                </div> 
            </div>  
        </div>
    
</template>
<script>
import ItemsMessage from "./Items-message.vue";
import ItemsCommentaire from "./Items-commentaire.vue"
 import { eventBus } from '../../main';
export default{
name:'Item-message',
components:{
    ItemsMessage,
    ItemsCommentaire
},
 data(){
      return{
         message:eventBus.message,//array contenant les messages
             }
},
 methods:{
       recuperation(){
           this.message=eventBus.message;
        }
 },
 created(){
     this.message=eventBus.message;
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

    }
    
  }

</style>