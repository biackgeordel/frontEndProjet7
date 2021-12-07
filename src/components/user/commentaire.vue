<template>
    
 <div>
        <div class="commande">
                        
                <h6 style="color:#2c2c54 ;font-weight:bold" @click.prevent="showCommentaire=!showCommentaire"
                title="cliquez pour voir les commentaires">
                     commentaire:{{tabcommentaire.length}}
                </h6>
        <b-button :variant="colorLike"  :disabled="valid" id="likes"
        @click.prevent="addLikes" >
              <b-icon icon="hand-thumbs-up"></b-icon>{{tabLikes.length}}
        </b-button>

        <b-button :variant="colorDisLike"  @click.prevent="addDisLikes"
         :disabled="validation" id="dislikes">

            <b-icon icon="hand-thumbs-down"></b-icon> {{tabDisLikes.length}} 
        </b-button>
       
           
        <b-button variant="primary" @click="msgbutton=!msgbutton"
         title="Ecrire un commentaire">
             <b-icon icon="chat-dots-fill"></b-icon>
        </b-button>
        </div>
              <div v-show="msgbutton" class="form-floating">
                 <textarea v-model="msg" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">commentaires</label>
                     <button   @click="publier" type="button" class="btn btn-outline-info">Publier</button>
                </div>
                    <div v-show="showCommentaire">
                      
                            <div v-for="val in tabcommentaire" :key="val.id">
                                <div class="box-commentaire">
                                  <div class="id-user" >
                                 <div class="photo-user">
                                    <img :src="val.User.urlImage" alt="photo user"/>
                                    <span>{{val.User.username}}</span>
                                    </div>
                                 </div>
                          
                              <div  v-zoneText  class=" zone bg-success p-2 text-dark bg-opacity-10"> 
                                 <p>{{val.description}}</p> 
                                 <span class="info-date info">Commenté le :{{val.createdAt}}</span>
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
               el.style.borderRadius="1.5vw";
              
               if(el.innerText.length<=100){
                   el.style.lineHeight="1"
               }else{
                el.style.lineHeight="1.5";
                el.style.paddingTop="2%";
                el.style.paddingLeft="2%";
               }
                
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
textarea{
    width:90% !important;
    position:relative;
    right:10%;
    margin:5px;
}
h6{
 cursor: pointer;
 text-decoration: 1px underline;
}

.box-commentaire{
   margin-bottom:2%;
   display:flex;  
   margin-top:2%;
    //height:30vh;
.zone{
    position:relative;
    right:10%;
    width:50vw;
}
}
.form-floating{
   position:relative;
   width:100%;
   left:10%;
}
.commande{
    width:80%;
   // border:1px solid red;
    margin: auto;
}
.id-user{
 height:8vw;
 width:30%;
 padding-left:3%;
font-weight: bold;
 .photo-user{
    width:3vw;
    height:3vw;
    margin-top:5%;
    text-align: center;
     img{
   display: inline-block;
   object-fit: cover;
    border-radius:50%;
    width:100%;
    height:100%;
    }
 }
}
.info-date{
    font-size:1vw;
    font-weight:bold;
    color:#2c3e50
}
.test:disabled{
    display: none;
}


</style>