<template>
   <div>
       <transition appear="true">
      <div v-if="tabMessage.length!==0">
     
     
       
      <div   class="ml" v-for="val in tabMessage" :key="val.id">
         <div  class="box-message">
           <div class="box-info-user">
              <div class="box-info-user__img">
                 <img :src="val.User.urlImage" alt="photo user"/>
             </div>
             <div class="date">
                 <div>
                    <strong>
                            {{val.User.username.replace(`${val.User.username.charAt(0)}`,`${val.User.username.charAt(0).toUpperCase()}`)}}
                    </strong>
                   <br/>à publié le {{ val.dateMessage }}
                 </div>
                   
             </div>

              <div class="box-info-user__btn">
                 <button v-if="val.User.username===localUsername" 
                 @click.stop="deleteMessage(val)"
                 v-b-tooltip.hover title="supprimer l'image">X</button>
              </div>             
           </div>         
            <div class="box-img">
               <img   :src="val.urlImage" alt="photo" :id="`${val.id}`"/>
            </div>
            <div class="title">
                  <h4> {{val.title.replace(`${val.title.charAt(0)}`,`${val.title.charAt(0).toUpperCase()}`)}}</h4>
            </div>
            <div  v-if="val.description.length>0" class="description">{{ val.description }}</div>
            <div>
               <items-commentaire  :disLike="val.DisLikes" :MessageId="val.id" :like="val.Likes" :coments="val.Commentaires" >

                </items-commentaire>

            </div>
               
        </div>
      </div>
   </div>
  
        <div v-else>
      <div>
         <h1>Aucun message publié</h1>
      </div>

   </div>
   
   </transition>
 
      
   </div>
</template>
<script>

import itemsCommentaire from "../views/Items-commentaire.vue";

export default{
    name:"Message",
    components:{
     itemsCommentaire  

    },
    data(){
       return{
          localUsername:JSON.parse(localStorage.getItem('user')).username,
          tabMessage:[]
       }
    },
    mounted(){
     this.fetchGetAllMessage();
    },
  
   
    methods:{
       deleteMessage(val){
          console.log('id du message',val.id);
          const messageId=val.id;
          const userId=JSON.parse(localStorage.getItem('user')).idUser;
       
          this.$http.delete(`/deleteMessage/${messageId}/${userId}`).then(response=>{
             if(response.data===1){
                console.log('supprimer');
                this.fetchGetAllMessage();
        

             }
          })
       },
       fetchGetAllMessage(){
             this.$http.get('/allmessage').then(response=>{
                if(response.status===200){
                    console.log(response.data);
                    this.tabMessage=response.data;
                }
         }).catch(error=>{
             console.log(error);
         })
          
       }

           


    },
  
}


</script>
<style lang="scss" scoped>
.box-message{
   width:40%;
   background-color:#ffff;
   border:1px solid #95a5a6;
   //box-shadow:1px 1px 5px 3px #95a5a6;
   border-radius:10px;
       @media(max-width:950px){
        width:100%;
          }
  // border:1px solid #bdc3c7;
  // box-shadow: 1px 1px 6px #bdc3c7,1px 1px 6px #bdc3c7;
   
  // border:1px solid red;
   .box-info-user{
      height:3.5vw;
      display: flex;
      justify-content:space-between;
      align-items: center;
      @media(max-width:950px){
         height:15vw;
      }
      &__img{
         img{
         display: block;
         object-fit:cover;
         width:3vw;
         height:3vw;
         border-radius:50%;
       @media(max-width:950px){
          width:8vw;
          height: 8vw;
         }

         }
       
      }
   }
   .box-info-user__btn{
      width:10%;
      height: inherit;
      text-align: center;
      padding-top:1%;
    
      button{
           background-color:rgba(190, 46, 221,0.5);
           color:rgba(245, 246, 250,1.0);
         &:hover{
            background-color:rgba(190, 46, 221,1.0);
            color:#ffff;
            transition: all 1s ease-in-out;
         }
         
      }
      
   }
   .date{
      width:80%;
      height: inherit;
   }
    .box-info-user__img{
       width: 10%;
       height: inherit;
       padding:1% 1%;
    }
    .box-img{//image uploader
       width:100%;
       height:inherit;
       border-top: 1px ridge rgba(26, 1, 1, 0.3);
       img{
          width:100%;
          height:100%;
          object-fit: fill;
       }
    }

}
.ml{
     display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block:1%;
    align-items: center;

   
}
.title{
   text-align: center;
    //border-bottom:1px ridge #ecf0f1;
}
.description{
   word-break: keep-all;
   //text-align: center;
   text-align:justify;
   border-top:1px ridge #ecf0f1;
   border-bottom:1px ridge #ecf0f1;
   padding:2%;
}

  
 
</style>