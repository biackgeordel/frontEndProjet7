<template>
   <div>
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
                   <br/>à partagé le {{ val.createdAt }}
                 </div>
                   
             </div>

              <div class="box-info-user__btn">
                 <button v-b-tooltip.hover title="supprimer l'image">X</button>
              </div>             
           </div>         
            <div class="box-img">
               <img   :src="val.urlImage" alt="photo" :id="`${val.id}`"/>
            </div>
            <div class="title">
                  <h4>{{val.title}}</h4>
            </div>
            <div  v-if="val.description.length>0" class="description">{{ val.description }}</div>
            <div>
               <items-commentaire  :disLike="val.DisLikes" :MessageId="val.id" :like="val.Likes" :coments="val.Commentaires" >

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
    data(){
       return{
          val:this.items
       }
    },
    watch:{
       items(){
               this.val=this.items;
        
       }
    }

   

  
}


</script>
<style lang="scss" scoped>
   .box-message{
      border-top-left-radius: 10px;
      border-top-right-radius:10px;
      box-sizing: border-box;
      width:45vw;
      background-color:#ffffff;
      //rgb(184, 184, 185)
      margin:auto;
      box-shadow:-1px -1px  5px rgba(220, 221, 225,1.0),1px 1px  5px rgba(220, 221, 225,1.0);
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
          padding:1%;
          img{
            display: inline-block;
            position:relative;
            top:1%;
             border-radius: 50%;
             width:3vw;
             height:3vw;
             object-fit:fill;
             @media(max-width:950px){
               width:8vw;
               height:8vw;
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
       height:25vw;
           @media(max-width:950px){
             height:100%;
             width:100%   
              }
       text-align: center;
       margin:auto;
       img{
           object-fit:fill;
             width:inherit;
             height:inherit;
             
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
         line-height:1.2;
         padding-top:1.5%;
      
    }

 
</style>