<template>
   <div>
      <div>
           <span class="box-img"><img :src="items.User.urlImage" alt="photo user default"/></span>
             <span style="font-weight:bold ;padding-left:2%">{{ items.User.username }}</span>
      </div>
      <div  class="container-message">
         <div class="card" style="width:100%;">
               <img :src="items.urlImage" class="card-img-top" alt="...">
            <div class="card-body">
               <h5>{{items.title}}</h5>
               <p class="card-text">
                  {{items.description}}
               </p>
                     
            </div>
    

          </div>
      </div>
          <items-commentaire  :disLike="items.DisLikes" :MessageId="items.id" :like="items.Likes" :coments="items.Commentaires" >

          </items-commentaire>
        
      </div>


</template>
<script>

import itemsCommentaire from "../views/Items-commentaire.vue";
export default{
    name:"Message",
    props:['items'],
    components:{
      itemsCommentaire  

    }
}


</script>
<style lang="scss" scoped>
   .container-message{
      border-radius:1%;
      width:50vw;
      box-shadow:1px 1px  5px  rgb(184, 184, 185) ;
      margin-top:2%;
      margin-bottom:2%;
      @media (max-width:950px){
          font-size:2vw;
          width:100%;
          box-shadow:none;
        
      }
    }
    .box-img{
       img{
      width:5vw;
       height:5vw;
       border-radius:50%;
       object-fit: cover;
      

       }
     
    }


</style>