<template>
    
 <div>  

           <div class="info-message"> 
                 <div class="nombre-commentaire box-hover" :class="emojiShow(tabcommentaire)"
                  @click.prevent="showCommentaire=!showCommentaire">
                <p v-b-tooltip.hover title=" Voir les commentaires">
                  {{ tabcommentaire.length }} commentaires
                </p>
                </div>
                <div class="box-humeur">
                    <span class="humeur-1" :class="emojiShow(tabLikes)">
                       <!-- Add the style and icon you want -->
                      <!-- <font-awesome-icon icon="fa-regular fa-face-grin-beam" size="lg"/>-->
                       <span
                        style="display:inline-block" v-html="emoji.facePositif"></span>
                        {{tabLikes.length}}  
                    </span>
                   
                    <span class="humeur-2" :class="emojiShow(tabDisLikes)" >
                      <!-- <font-awesome-icon icon="fa-regular fa-face-frown" size="lg" />-->
                       <span style="display:inline-block"
                       v-html="emoji.faceNegatif"></span>
                        {{tabDisLikes.length}}  
                    </span>
                  
                    
                </div>
              
               
          </div>  




        <div class="commande">

        <div class="box-icon box-hover" :id="`${MessageId}like`" aria-label="button like"
          v-b-tooltip.hover title="J'aime"
        @click.prevent="addLikes" >J'aime
              
        </div>

        <div class="box-icon box-hover dislike"  @click.prevent="addDisLikes" :id="`${MessageId}disLike`"
         v-b-tooltip.hover title="Je n'aime pas">Je n'aime pas

           
        </div>
       
           
        <div class="box-icon box-hover" @click="msgbutton=!msgbutton"
        v-b-tooltip.hover title="Ecrire un commentaire">
             Commenter <b-icon icon="chat-dots-fill"></b-icon>
        </div>
        </div>
              <div v-show="msgbutton" class="form-floating">
                <textarea v-model="msg" class="form-control"></textarea>
              
               
                 <div v-show="error.length!==0" class=" test alert alert-danger" role="alert">
                     <div>
                         {{error}}
                        
                     </div>
                 </div>
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
                                 <span class="info-date">commenté le {{val.dateCommentaire}}</span> 
                                 <div v-zoneText  class="">
                                     {{val.description}}
                                     </div>
                              </div>
                         </div> 
                     </div>
                  </div>
                         
 </div>
                       
    
</template>

<script>


export default{
    name:"Commentaire",
    components:{
   
    },
 props:['coments','MessageId','like','disLike'],
    directives:{
        zoneText:(el)=>{
            //on defini le style par defaut de la zone de texte
              el.style.overflow="break-word";
               el.style.borderRadius="2vw";
                el.style.lineHeight="1.5";
                el.style.padding="1.5% 3%";
                el.style.backgroundColor="rgba(217, 128, 250,0.5)";
                
               
                if(el.innerText.length<=5){
                    el.style.width="15%"
                   // el.style.textAlign="center"
                }
                else if(el.innerText.length<=20){
                     el.style.width="30%";
                  el.style.lineHeight="1.2";  
                }
                else if(el.innerText.length<=60){
                    el.style.width="45%";
                     el.style.lineHeight="1.2";  
                }else if(el.innerText.length<=100){
                      el.style.width="55%"
                     el.style.lineHeight="1.2";  
                } else{
                    el.style.width="100%";
                      el.style.borderRadius="2vw";
                }      
        }
    },

    data(){
        return {
            msgbutton:false,//boolean pour faire appparaitre la zone de saisie
           tabcommentaire:[],//array contenant tous les commentaires
           msg:"",//variable contenant le commentaire  du textarea
            showCommentaire:true,//boolean pour faire appparaitre les commentaires
            tabLikes:[],//tableau contenant les users qui aiment le message
            tabDisLikes:[],// tableau contenant les users qui n'aiment pas le message 
            error:"",
            emoji:{
                faceNegatif:"&#x1F621;",
                facePositif:"&#x1F600;"

            },
           

              
              
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
        msgbutton(){
            if(this.msgbutton===false){
                this.error="";
                this.msg="";
            }
        },
        msg(){
            if(this.msg.length!==0){
                this.error="";
            }
        },
        error(){
            if(this.error){
                this.msgbutton=true;
            }
        },
      
    
    },
    methods:{
        emojiShow(tab){
            let nom="";
            if(tab.length===0){
                 nom="emojiHide";
            }else{
                nom="emojiShow";  
            }
            return nom;        
        },
     
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
            document.getElementById(`${this.MessageId}like`).classList.add('hide');
                  
            }else{
                document.getElementById(`${this.MessageId}like`).classList.remove('hide');

            }
            if(validDislike){
                 document.getElementById(`${this.MessageId}disLike`).classList.add('hide');
                
            }else{
                 document.getElementById(`${this.MessageId}disLike`).classList.remove('hide');
            }

        },

       publier(){
             console.log('recuperer',this.msg);
             if(this.msg){
             let test=new Date();
             console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(test));
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
            let msgCreated={
                 MessageId:this.MessageId,//id du message
                description:this.msg,           
                UserId:userId,
                date:new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(test)
            }
          console.log(msgCreated);
         this.$http.post('/addCommentaire', msgCreated,{
                 Headers:{
                 'Content-Type':'application/json'   
              },

         }).then(response=>{
              if(response.status===201){
              console.log('mareponse',response.data);
              this.tabcommentaire.unshift(response.data);
           }
           
          }).catch(error=>{
              if(error){
                  this.error=error.response.data.message;
              }
          });
           this.msgbutton=false;
             this.msg="";
             this.error=""
        }else{
            this.error="le message envoyé ne doit pas être vide";
        }
               
        },
        //methode axios pour  supprimer le like du user dans  tabLikes
        axiosDeleteLike(userId){
            let idLike="";
            let  validLike=false;
                this.tabLikes.forEach(element => {
             if(element.UserId===userId && element.MessageId===this.MessageId){
                console.log('id like',element);
                idLike=element.id;
                validLike=true;
               
                }});
                if(validLike){
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
                     } } 
                     }
                 }).catch(error=>{
                        console.log(error);
                    });

                }
                console.log('validLike',validLike);
                 
                return validLike;

        },
        //methode axios pour ajouter le like du user dans tabLikes
        axiosAddLike(userId){ 
           this.$http.post('/addLike',
                 {
                     UserId:userId,
                    MessageId:this.MessageId },
                    {
                        Headers:{"Content-Type":"application/json"}
                    }
             ).then(response=>{
                if(response.status===200){
                    console.log('like:',response.data);
                     this.tabLikes=[...this.tabLikes,response.data];
                    this.validAvis();
                        }else if(response.status===202){
                         this.tabLikes=[...this.tabLikes];
                           
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
        },

        axiosDeleteDisLike(userId){
            let validDislike=false;
            let idDisLike="";
                 this.tabDisLikes.forEach(element => {
                if(element.UserId===userId && element.MessageId===this.MessageId){
                    console.log('id dislike',element.id);
                    idDisLike=element.id;
                    validDislike=true;
                }  
                 });
                 if(validDislike){
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
                 
                 return validDislike;

       

        },
        axiosAddDisLike(userId){
          this.$http.post('/addDisLike',
            {
              UserId:userId,
              MessageId:this.MessageId },
             {
              Headers:{"Content-Type":"application/json"}
             }
             ).then(response=>{ if(response.status===200){
                 console.log('DisLike:',response.data);
                this.tabDisLikes=[...this.tabDisLikes,response.data];
                this.validAvis();

                }else if(response.status===202){
                   this.tabDisLikes=[...this.tabDisLikes];  
                }

                }).catch(error=>{
                  console.log(error)
                    })

        },

        // ajouter les likes au tableau de likes
        addLikes(){
          
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
                this.axiosDeleteDisLike(userId);
              let valid=this.axiosDeleteLike(userId);
        
             if(valid===false){
                 this.axiosAddLike(userId);
               }
               
              },
              

         addDisLikes(){
          
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
                this.axiosDeleteLike(userId);
              let valid=this.axiosDeleteDisLike(userId);
        
               if(valid===false){
                  this.axiosAddDisLike(userId);
                 }
                 this.validAvis();
                 
        }
    }
         
      
    
}
    

</script>
<style lang="scss" scoped>
button{
  margin:5px !important;


}



.box-commentaire{
  // margin-bottom:2%;
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
     color:#303952;
     font-size:15px;
   // background-color:#f7f1e3;
       @media(max-width:950px){
            height:8vw;
            font-size:3vw;
          
        }  
   border-top:1px solid #ecf0f1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content:center;
    // border:1px solid red;
    .box-icon{
        width:34%;
       // border:1px solid red;
        height:inherit;
        text-align: center;
        cursor:pointer; 
        padding-top:1%;
         // border:1px solid red;
        @media(max-width:950px){
            font-size:3vw;
          
        } 
          
        .b-icon.bi{
              font-size:18px;
              text-align: center;
             @media(max-width:950px){
             font-size:3vw;
             }
        }   
        }
    }
           .nombre-commentaire{
           width:30%;
          // border:1px solid red;
           text-align: center;
           height: inherit;
         @media(max-width: 950px){
           width:60%;
           }
          p{
            cursor: pointer;
            display:inline-block;
            width:100%;
            white-space: nowrap;
           // border:1px solid green;

            height:inherit;
           
             }

}
.box-hover{
    &:hover{
        background-color:#f5f6fa;
        transition:all  0.5s ease-in-out;
       // color:white;
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
    margin-bottom:2%;
      transition:all 1s ease-in-out;
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
  //pointer-events: none;
   opacity:0.8;
   color:#3867d6;
    transition:all 1s ease-in-out;
}
.test{
    width:80%;
    transition:all 1s ease-in-out;
    text-align: center;
    margin:auto;
    position: relative;

}
.info-message{
    display: flex;
    color:#303952;
    border-top:1px ridge #ecf0f1;
    justify-content:space-between;
   // border:1px solid red;
   // background-color:#ecf0f1;
   // align-items: center;
    width:100%;
    height:2.5vw;
    @media(max-width: 950px){
        height: 6vw;
    }

}
.box-humeur{
    width:50%;
    height: inherit;
    text-align: right;
}
.humeur-1{
    display: inline-block;
    text-align: center;
   // border-radius:50%;
    width:25%;
    height:inherit;
    white-space: nowrap;
      text-align:right;


}
   .humeur-2{
    display: inline-block;
    text-align: center;
    width:25%;
    height:inherit;
    white-space: nowrap;
      text-align:left;
    
   }
   .emojiShow{
       opacity:1;
       transform:scale(1);
     transition:all 1s ease-in-out;
   }
   .emojiHide{
       opacity:0;
       transform:scale(0);
    transition:all 1s ease-in-out;
   }



</style>