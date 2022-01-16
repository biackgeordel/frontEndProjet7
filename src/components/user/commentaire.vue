<template>
    
 <div>
        <div class="commande">
                        
            <div class="nombre-commentaire" @click.prevent="showCommentaire=!showCommentaire">
                <p v-b-tooltip.hover title=" Voir les commentaires">
                   Commentaire :{{ tabcommentaire.length }} 
                </p>
            </div>
        <div class="box-icon" :id="`${MessageId}like`" aria-label="button like"
          v-b-tooltip.hover title="J'aime"
        @click.prevent="addLikes" >J'aime
              <b-icon icon="hand-thumbs-up"></b-icon> {{tabLikes.length}}
        </div>

        <div class="box-icon dislike"  @click.prevent="addDisLikes" :id="`${MessageId}disLike`"
         v-b-tooltip.hover title="Je n'aime pas">Je n'aime pas

            <b-icon icon="hand-thumbs-down"></b-icon> {{tabDisLikes.length}} 
        </div>
       
           
        <div class="box-icon" @click="msgbutton=!msgbutton"
        v-b-tooltip.hover title="Ecrire un commentaire">
             <b-icon icon="chat-dots-fill"></b-icon>
        </div>
        </div>
              <div v-show="msgbutton" class="form-floating">
                 <textarea v-model="msg" class="form-control" placeholder="Leave a comment here"></textarea>
                     <button   @click="publier" type="button" class="btn btn-outline-info">Publier</button>
                </div>
                    <div v-show="showCommentaire">
                       <div v-for="val in tabcommentaire" :key="val.id">
                           <div class="box-commentaire">
                               <div class="id-user" >
                                   <div class="photo-user">
                                      <img :src="val.User.urlImage" alt="photo user"/>
                                   </div>
                               </div>
                          
                              <div class="zone-commentaire">
                                  <span> <strong>{{val.User.username}}</strong></span><br/>
                                 <span class="info-date">commenté le :{{val.createdAt}}</span> 
                                 <p v-zoneText  class="bg-success text-dark bg-opacity-10">
                                     {{val.description}}
                                 </p> 
                              
                               
                              </div>
                         </div> 
                     </div>
                  </div>
                         
 </div>
                       
    
</template>
<script>

export default{
    name:"Commentaire",
 props:['coments','MessageId','like','disLike'],
    directives:{
        zoneText:(el)=>{
            //on defini le style par defaut de la zone de texte
              el.style.overflow="break-word";
               el.style.borderRadius="20px";
               el.style.fontFamily="'Heebo', sans-serif";
                el.style.lineHeight="1.5";
                el.style.padding="2%";
                if(el.innerText.length<=10){
                    el.style.width="20%"
                }
                else if(el.innerText.length<=30){
                     el.style.width="50%"
                }
                else if(el.innerText.length<=60){
                    el.style.width="65%"
                }else{
                      el.style.width="100%"
                   // el.style.border="1px solid red";   
                }
               //on defini  le media query du document à écouter
               //let media=window.matchMedia("(max-width:500px)");
               //on ecoute le changement du media query
            
               /*  media.addEventListener('change',(event)=>{
                   if(event.matches){
                       el.style.height="8vw";
                   }else{
                       el.style.height="10%"
                   }
               }) */
           
            
               
               
                
        }
    },

    data(){
        return {
            msgbutton:false,//boolean pour faire appparaitre la zone de saisie
           tabcommentaire:[],//array contenant tous les commentaires
           msg:"",//variable contenant le commentaire  du textarea
            showCommentaire:true,
            likes:0,//determine l'etat du bouton likes valeur possible 0 et 1
            dislikes:0,//determine l'etat du bouton dislikes valeur possible 0 et 1
            tabLikes:[],//tableau contenant les users qui aiment le message
            tabDisLikes:[],// tableau contenant les users qui n'aiment pas le message 
            validDislikes:false, //variable qui determine si le bouton likes est active
            validLikes:false,//variable qui determine si le bouton dislikes est active
          
    
        
        
            
          
        }  
    },
    created(){
        this.tabcommentaire=this.coments
        this.tabLikes=this.like;
        this.tabDisLikes=this.disLike
    },
    mounted(){
       this.validAvis();

    },
    watch:{
        tabcommentaire(){
            console.log('show:',this.tabcommentaire);
        this.showCommentaire=(this.tabcommentaire.length>=4) ? false :true;
        },
        coments(){
            this.tabcommentaire=this.coments;
        },
    
            tabDisLikes(){
            console.log('new tabDislikes:',this.tabDisLikes);
            return this.tabDisLikes;
        },

        tabLikes(){
            console.log('new tablikes:',this.tabLikes);
            return this.tabLikes;
        }
    },
    methods:{
        //attributttion des valeurs à likes et dislikes
        validAvis(){
            let validLike=false;
            let validDislike=false;
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabLikes.forEach(element=>{
            if(element.UserId===userId && element.MessageId===this.MessageId){
                console.log('user existe');
                console.log(element.UserId);
                console.log(JSON.parse(localStorage.getItem('user')).idUser);
                validLike=true; 
             }
        })
           this.tabDisLikes.forEach(element=>{
            if(element.UserId===userId && element.MessageId===this.MessageId){
                console.log('user existe dans tabDisLikes');
                console.log(element.UserId);
                console.log(JSON.parse(localStorage.getItem('user')).idUser);
                validDislike=true;
             }
        });
            if(validLike){
            document.getElementById(`${this.MessageId}disLike`).classList.add('hide');
            }else{
                document.getElementById(`${this.MessageId}disLike`).classList.remove('hide');
            }
            if(validDislike){
                 document.getElementById(`${this.MessageId}like`).classList.add('hide');
            }else{
                 document.getElementById(`${this.MessageId}like`).classList.remove('hide');
            }

        },

       publier(){
            let msg={
                 MessageId:this.MessageId,//id du message
                description:this.msg,           
                UserId:JSON.parse(localStorage.getItem('user')).idUser, 
            }
          console.log(msg);
         this.$http.post('/addCommentaire',msg,{
              Headers:{
                  'Centent-Type':'application/json'
              }
          }).then(response=>{
              if(response.status===200){
              console.log(response.data);
              console.log('id com:',response.data.comments.id)
            this.$http.get(`/oneCommentaire/${response.data.comments.id}`).
              then(response=>{
                   this.tabcommentaire=[...this.tabcommentaire,response.data];
                    
              }).catch(error=>{
                  console.log(error);
              });
              
              }
          }).catch(error=>{
              console.log(error);
          });
         
       
           this.msgbutton=false;
             this.msg="";
               
        },
        addLikes(){
            let valid=false;
             let idLike=''
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabLikes.forEach(element => {
                if(element.UserId===userId && element.MessageId===this.MessageId){
                    console.log('id like',element.id);
                    idLike=element.id;
                    valid=true;
                }  
                 });
          
            //ajout d'un like
             if(valid===false){

                  this.$http.post('/addLike',
                    {
                    UserId:userId,
                    MessageId:this.MessageId },
                    {
                        Headers:{"Content-Type":"application/json"}
                    }
                    ).then(response=>{
                        if(response.status===200){
                            console.log('like:',response.data.like);
                        this.tabLikes=[...this.tabLikes,response.data.like];
                        this.validAvis();
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                    //suppression d'un like
                }else if(valid===true){
                    console.log('delete:',idLike);
                    console.log(userId);
                    this.$http.delete(`/delete/${idLike}/${userId}`).then(response=>{
                        console.log(response);
                        if(response.data===1){
                        for(let i=0;i<this.tabLikes.length;i++){
                         if(this.tabLikes[i].id===idLike && this.tabLikes[i].UserId===userId){
                            console.log( 'element a supprimer:',this.tabLikes[i]);
                            this.tabLikes.splice(i,1);
                            console.log('new tab:',this.tabLikes);
                            this.validAvis();
                        }


                        }
               
                        }
                    }).catch(error=>{
                        console.log(error);
                    });
                }
        
        },
         addDisLikes(){
          let idDisLike=''
            let valid=false;
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabDisLikes.forEach(element => {
                if(element.UserId===userId && element.MessageId===this.MessageId){
                    console.log('id dislike',element.id);
                    idDisLike=element.id;
                    valid=true;
                }  
                 });
          

             if(valid===false){
             this.$http.post('/addDisLike',
                    {
                    UserId:userId,
                    MessageId:this.MessageId },
                    {
                        Headers:{"Content-Type":"application/json"}
                    }
             ).then(response=>{ if(response.status===200){
                 console.log('DisLike:',response.data.disLike);
                this.tabDisLikes=[...this.tabDisLikes,response.data.disLike];
                    this.validAvis();
                        }
                }).catch(error=>{
                  console.log(error)
                    })
                }else if(valid===true)
                {
                    console.log('delete:',idDisLike);
                    console.log(userId);
                 this.$http.delete(`/deleteDisLike/${idDisLike}/${userId}`).then(response=>{
                    console.log(response);
                if(response.data===1){
                  for(let i=0;i<this.tabDisLikes.length;i++){
                  if(this.tabDisLikes[i].id===idDisLike && this.tabDisLikes[i].UserId===userId){
                    console.log( 'element  supprimer:',this.tabDisLikes[i]);
                    this.tabDisLikes.splice(i,1);
                    console.log('new tab:',this.tabDisLikes);
                    this.validAvis();
                     }
                } }
                }).catch(error=>{
                    console.log(error);
                    });
                    }
            }
    }
         
      
    
}
    

</script>
<style lang="scss" scoped>
button{
  margin:5px !important;


}



.box-commentaire{
   margin-bottom:2%;
   display:flex;
   justify-content:center;
   margin-top:2%;
}
.form-floating{
   position:relative;
   width:100%;
  

   textarea{
    width:90% !important;
    margin:auto;
    margin-top:3%;
    position:relative;
}
    button{
        display: inline-block;
        position:relative;
        left:5%;
    }
}
.commande{
    width:100%;
    height:3.5vw;
     color:#7f8c8d;
   // background-color:#f7f1e3;
       @media(max-width:950px){
            height:8vw;
          
        }  
   border-top:2px solid #ecf0f1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content:space-between;
   //  border:1px solid red;
    .box-icon{
        width:150px;
        height:inherit;
        font-size:14px;
        text-align: center;
        cursor:pointer;
          &:hover{
            background-color:rgba(56, 173, 169,1.0);//rgba(241, 242, 246,0.7);
            transition:all 0.2s ease-in-out;
            color:white;
        }  
        padding-top:1%;
         // border:1px solid red;
        @media(max-width:950px){
            width:25%;
            font-size:3vw;
          
        } 
          
        .b-icon.bi{
              font-size:25px;
              text-align: center;
             @media(max-width:950px){
             font-size:3.5vw;
             }
        }   
        }
    }
           .nombre-commentaire{
           padding-top:2%;
           width:25%;
            color:#34495e;
           text-align: center;
           height: inherit;
            &:hover{
            background-color:rgba(56, 173, 169,1.0);//rgba(241, 242, 246,0.7);
            transition:all 0.2s ease-in-out;
            color:white;
        }  
           @media(max-width:950px){
               padding-top:1%
           }
          p{
            cursor: pointer;
             }

}

.id-user{
 width:9%;
 //padding-left:1%;
 .photo-user{
    width:3vw;
    height:3vw;
 @media(max-width:950px){
      width:8vw;
    height:8vw;
       
    }
    margin-top:5%;
     img{
   display: inline-block;
   object-fit: cover;
    border-radius:50%;
    width:100%;
    height:100%;
    }
 }
}
.zone-commentaire{
    width:80%;
    font-size:15px;
      @media(max-width:950px){
        font-size:inherit;
    }

}
.info-date{
    font-size:14px;
    color:#2c3e50;
    @media(max-width:950px){
        font-size:2vw;
    }
}
.hide{
  pointer-events: none;
   opacity:0.8;
   color:#f1c40f;
}


</style>