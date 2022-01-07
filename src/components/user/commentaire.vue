<template>
    
 <div>
        <div class="commande">
                        
            <div class="nombre-commentaire" style="color:#2c2c54 ;font-weight:bold" @click.prevent="showCommentaire=!showCommentaire">
                <p v-b-tooltip.hover title=" Voir les commentaires">
                    commentaire:{{tabcommentaire.length}}
                </p>
            </div>
        <b-button :variant="colorLike"  :disabled="valid" id="likes"
          v-b-tooltip.hover title="J'aime"
        @click.prevent="addLikes" >
              <b-icon icon="hand-thumbs-up"></b-icon> {{tabLikes.length}}
        </b-button>

        <b-button :variant="colorDisLike"  @click.prevent="addDisLikes"
         v-b-tooltip.hover title="Je n'aime pas"
         :disabled="validation" id="dislikes">

            <b-icon icon="hand-thumbs-down"></b-icon> {{tabDisLikes.length}} 
        </b-button>
       
           
        <b-button variant="primary" @click="msgbutton=!msgbutton"
        v-b-tooltip.hover title="Ecrire un commentaire">
             <b-icon icon="chat-dots-fill"></b-icon>
        </b-button>
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
            dislikes:0,//determine l'etat du bouton dislikes valeur possible 0 et -1
            tabLikes:[],//tableau contenant les users qui aiment le message
            tabDisLikes:[],// tableau contenant les users qui n'aiment pas le message 
            validation:false, //variable qui determine si le bouton likes est active
            valid:false,//variable qui determine si le bouton dislikes est active
            colorLike:'primary',
            colorDisLike:'primary'
    
        
        
            
          
        }  
    },
    created(){
        this.tabcommentaire=this.coments
        this.tabLikes=this.like;
        this.tabDisLikes=this.disLike
    },
    mounted(){
              let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabLikes.forEach(element=>{
            if(element.UserId===userId && element.MessageId===this.MessageId){
                console.log('user existe');
                console.log(element.UserId);
                console.log(JSON.parse(localStorage.getItem('user')).idUser);
               this.likes=1;
             }
        })
           this.tabDisLikes.forEach(element=>{
            if(element.UserId===userId && element.MessageId===this.MessageId){
                console.log('user existe dans tabDisLikes');
                console.log(element.UserId);
                console.log(JSON.parse(localStorage.getItem('user')).idUser);
               this.dislikes=-1;
             }
        });
       

    },
    watch:{
        tabcommentaire(){
            console.log('show:',this.tabcommentaire);
        this.showCommentaire=(this.tabcommentaire.length>=4) ? false :true;
        },
        likes(){
            if(this.likes===1){
                 this.colorLike="success";
                this.validation=true;
            }else if(this.likes===0){
                this.validation=false
               this.colorLike="primary";
            }
            console.log('valid:',this.validation,'like:',this.likes);
            return this.validation;

        },
        dislikes(){
            if(this.dislikes===-1){
                 this.colorDisLike="danger";
                this.valid=true;
            }else if(this.dislikes===0){
                this.valid=false;
               this.colorDisLike="primary";
            }
            console.log('valid:',this.valid,'like:',this.dislikes);
            return this.valid;

        },
            tabDisLikes(){
       
            console.log('new tabDislikes:',this.tabDisLikes);
        },

        tabLikes(){
       
            console.log('new tablikes:',this.tabLikes);
        }
    },
    methods:{
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
                   this.validation();
                    
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

            let idLike=''
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabLikes.forEach(element => {
                if(element.UserId===userId && element.MessageId===this.MessageId){
                    console.log('id like',element.id);
                    idLike=element.id;
                    this.likes=1;
                }  
                 });
          

             if(this.likes===0){ this.$http.post('/addLike',
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
                        this.likes=1;
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }else if(this.likes===1){
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
                            this.likes=0;
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
            let userId=JSON.parse(localStorage.getItem('user')).idUser;
             this.tabDisLikes.forEach(element => {
                if(element.UserId===userId && element.MessageId===this.MessageId){
                    console.log('id dislike',element.id);
                    idDisLike=element.id;
                    this.dislikes=-1;
                }  
                 });
          

             if(this.dislikes===0){
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
                this.dislikes=-1;
                        }
                }).catch(error=>{
                  console.log(error)
                    })
                }else if(this.dislikes===-1)
                {
                    console.log('delete:',idDisLike);
                    console.log(userId);
                 this.$http.delete(`/deleteDisLike/${idDisLike}/${userId}`).then(response=>{
                    console.log(response);
                if(response.data===1){
                  for(let i=0;i<this.tabDisLikes.length;i++){
                  if(this.tabDisLikes[i].id===idDisLike && this.tabDisLikes[i].UserId===userId){
                    console.log( 'element a supprimer:',this.tabDisLikes[i]);
                    this.tabDisLikes.splice(i,1);
                    console.log('new tab:',this.tabDisLikes);
                    this.dislikes=0;
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
   border-top:2px solid #ecf0f1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        width:65px;
        height: 50%;
        @media(max-width:950px){
            width:15%;
            font-size:3vw;
        }       
        .b-icon.bi{
              font-size:17px;
              text-align: center;
             @media(max-width:950px){
              font-size:3vw;}
        }   
        }
    }
           .nombre-commentaire{
           padding-top:4.5%;
          p{
            cursor: pointer;
             }

}

.id-user{
 width:15%;
 padding-left:5%;
//border:1px solid blue;
 .photo-user{
    width:4vw;
    height:4vw;
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
    width:70%;

}
.info-date{
    font-size:14px;
    font-weight:bold;
    color:#2c3e50;
    @media(max-width:950px){
        font-size:2vw;
    }
}


</style>