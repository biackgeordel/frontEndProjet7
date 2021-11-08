<template>
    
 <div>
        <div class="commande">
            
             <h6 @click="showCommentaire=!showCommentaire"
              title="cliquez pour voir les commentaires">
                    commentaire:{{nombreDeCommentaire}}</h6>
  
        <button type="button" class="btn btn-outline-info">
                 <span><i class="bi bi-hand-thumbs-up-fill"> 3</i></span>
        </button>
        <button  type="button" class="btn btn-outline-info">
                <i class="bi bi-hand-thumbs-down-fill"> 2</i>
        </button >
        <button  @click="msgbutton=!msgbutton" type="button" 
         title="Ecrire un commentaire"
         class="btn btn-outline-info">
             <span><i class="bi bi-chat"></i></span>
        </button>
        </div>
            
              <div v-show="msgbutton" class="form-floating">
                 <textarea v-model="msg" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">commentaires</label>
                     <button   @click="publier" type="button" class="btn btn-outline-info">Publier</button>
                </div>
                <div>
                   <div v-show="showCommentaire">
                     <div   v-for="(val,index) in tabcommentaire" :key="index">
                         <div class="box-commentaire" v-if="idMessage===val.idMessage">
                                  <div class="id-user" >
                                 <div class="photo-user">
                                    <img src="../../assets/logo.png" alt="photo user"/>
                                    </div>
                                 </div>
                          
                              <div  v-zoneText  class="bg-success p-2 text-dark bg-opacity-10"> 
                                 <p  >{{val.description}}</p> 
                                <span class="info-date info">Commenté le :{{val.date}}</span>
                              </div>
                           
                         </div> 
                    </div>
                   </div>     
                   
                 

                </div>
                
            
       
    </div>
    
</template>
<script>
import {eventBus} from '../../main';
export default{
    name:"Commentaire",
    directives:{
        zoneText:(el)=>{
            //on defini le style par defaut de la zone de texte
        
                el.style.width="30vw";
                el.style.overflow="break-word";
                el.style.borderRadius="1.5vw";
                el.style.lineHeight="1.5";
                el.style.paddingTop="2%";
                el.style.paddingLeft="2%";

                
                
        }
    },
    data(){
        return {
            msgbutton:false,//boolean pour faire appparaitre la zone de saisie
            tabcommentaire:eventBus.commentaire,//array contenant tous les commentaires
           msg:"",//contenu du textarea
           user:eventBus.user,//on recupère l'user
            showCommentaire:true
        }
       
    },
     props:['idMessage'],//props contenant l'id des messages
    methods:{
        publier(){
                console.log(this.idMessage);
            let date=new Date();
            console.log(date.toLocaleDateString());
            //objet contenant le message de l'user
            let msg={
                 idMessage:this.idMessage,//id du message
                description:this.msg,
                date:date.toLocaleDateString(),
                   
                user:this.user, 
            }
          
            
           eventBus.ajouterCommentaire({...msg});
           console.log("tableau comentaire");
           console.log(eventBus.commentaire);
           this.msgbutton=false;
             this.msg="";
        },
        
        
    },
    created(){
   
        this.tabcommentaire=eventBus.commentaire;
        eventBus.$on('update:commentaire',(msg)=>{
            console.log('table commentaire ',eventBus.commentaire);
                this.tabcommentaire=msg;

        });
    },
    computed:{
        //affiche le nbre de commentaire d'un message
        nombreDeCommentaire(){
                    let count=0;
            this.tabcommentaire.forEach(element => {
                if(element.idMessage===this.idMessage){
                    count++;
                    if(count>3){
                        this.showCommentaire=false;
                    }
                }
                
            });
            return count;
        }
    }

}


</script>
<style lang="scss" scoped>
button{
   margin:5px !important;

}
textarea{
    width:100% !important;
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

   justify-content: center;
    //height:30vh;
}
.form-floating{
   position:relative;
   width:80%;
   left:10%;
}
.commande{
    width:80%;
   // border:1px solid red;
    margin: auto;
}
.id-user{
 height:5vw;
 .photo-user{
    width:5vw;
    height:5vw;
     img{
   display: inline-block;
   object-fit: cover;
    border-radius:50%;
    background-color: aqua;
    width:100%;
    height:100%;
    }
 }
}
.info-date{
    font-size:0.9vw;
    font-weight:bold;
    color:#2e86de
}


</style>