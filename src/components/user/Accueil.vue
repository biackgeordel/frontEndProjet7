<template>
<main>
   <section class="container">
       <ul class="nav nav-justified">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Accueil</a>
          </li>
           <li class="nav-item">
               <a class="nav-link" href="#">Publier une video</a>
            </li>
            <li class="nav-item">
                 <a class="nav-link" href="#">Publier un gag</a>
             </li>
        </ul>
        <div class="container-message">
                <div v-for="items in message" :key="items.id">
                      <div class="message">
                         <message :items="items"></message>
                      </div>
                      <div class="commentaire">
                         <commentaire  :id="items.id"></commentaire> 
                      </div> 
                </div>
                   
             
              
        </div>
      
    </section> 


 
   

</main>  
</template>

<script>
 import { eventBus } from '../../main';
 import Message from './Message.vue';
 import Commentaire from './commentaire.vue';
export default {
  name: 'Accueil',
  components: {
   Message,
   Commentaire
  },
  data(){
      return{
          message:eventBus.message//array contenant les messages 
      }
  },
  methods:{
        recuperation(){
            this.message=eventBus.message;
        }
      }
  

  }
  
</script>

<style lang="scss" scoped>
  .container-message{
    width:100%;
    margin:auto;
   // border:1px solid red;
    display:flex;
    flex-direction:column;
    
    align-items:center;
    align-content: space-between;
    .message,.comentaire{
      width:50%;
    }

  }
  
 

</style>
