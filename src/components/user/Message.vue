<template>
   <div>
       
        <div  class="box-message">
           <div class="box-info-user">
              <div class="box-info-user__img">
                 <img :src="items.User.urlImage" alt="photo user"/>
             </div>
             <div class="date">
                 <div>
                    {{items.User.username.replace(`${items.User.username.charAt(0)}`,`${items.User.username.charAt(0).toUpperCase()}`)}}
                 </div>
                   <div>partagé le {{ items.createdAt }}</div>
             </div>

              <div class="box-info-user__btn">
                 <button v-b-tooltip.hover title="supprimer l'image">X</button>
              </div>             
           </div>
           
            <div class="box-img">
               <img   :src="items.urlImage" alt="photo" :id="`${items.id}`"/>
            </div>
            <div class="title">
                  <h4>{{items.title}}</h4>
            </div>
            <div  v-if="items.description.length>0" class="description">{{ items.description }}</div>
            <div>
               <items-commentaire  :disLike="items.DisLikes" :MessageId="items.id" :like="items.Likes" :coments="items.Commentaires" >

                </items-commentaire>

            </div>
               
        </div>
      
   </div>
</template>
<script>

import itemsCommentaire from "../views/Items-commentaire.vue";
export default{
    name:"Message",
    props:['items'],
    components:{
      itemsCommentaire  

    },
    methods:{
     
    }

}


</script>
<style lang="scss" scoped>
   .box-message{
      border-radius:10px;
      width:45vw;
      background-color:white;
      margin:auto;
      box-shadow:-1px -1px  5px  rgb(184, 184, 185),1px 1px  5px  rgb(184, 184, 185);
      margin-top:2%;
      margin-bottom:2%;
      @media (max-width:950px){
        font-size:3vw;
        width:100%;
          margin-bottom:4%;
        box-shadow:none;
        border-radius: 0%;
  
       
        
      }       
 
    }
    .box-info-user{
       width:100%;
       display: flex;
       justify-content: space-between;
       align-items:flex-start;
       &__img{
          width:10%;
          height:100%;
          img{
            display: inline-block;
            position:relative;
            top:1%;
          
             padding:2%;
             border-radius: 50%;
             width:3.5vw;
             height:3.5vw;
             object-fit: cover;
           
             object-fit: cover;
             @media(max-width:950px){
               width:10vw;
               height:10vw;
             }
          }
   
       }
    
       &__btn{
          width:10%;
          height:100% !important;
          text-align: right;
          padding-right:2%;
           padding-top:1%;
          button{
             outline: none;
             border: none;
             color:#34495e;
             font-size:14px;
             @media(max-width:950px){
                 font-size:1vw;
             }
             width:2vw;
           
             //height:2vw;
             text-align:center;
            @media(max-width:950px){
               font-size:4vw;
               width:90%;
               height:100%;
            }
             &:hover{
                 background-color:#bdc3c7;
                 transition:background-color 2ms ease-in-out;

             }
      

          }

       }
    }
    .box-img{
       width:100%;
       height:40%;
       text-align: center;
       background-color:#ecf0f1;
       margin:auto;
       img{
           object-fit: cover;
             width:100%;
             height:100%;

          @media(max-width:950px){
            width:100%;
             height:100%;
            

       }
       }
    }
  
    .icon-camera{
       width:3vw;
       display: inline-block;
       height:100%;
       position:relative;
       left:1vw;
       bottom:-0.5vw;
       @media(max-width:950px){
            width:5vw;
             height:100%;

       }
    }
        .title{
            width:100%;
          height:100%;
         padding-top:2%;
          overflow-wrap: break-word;
          text-align:center;
          
         h4{
           // text-transform: uppercase;
            font-weight:bold;
             font-size:18px;
             @media(max-width:950px){
                font-size:4vw;
             }
         
         }
         
       }
    .description{
       font-family:'Heebo',sans-serif;
       text-align:justify;
       overflow-wrap: break-word;
       padding:2%;
       font-size:15px;
       @media(max-width:950px){
          font-size:3vw;
       }
      
    }
    .date{
         width:78%;
      
    }

 
</style>