<template>
    
 <div>
        <div class="commande">
             <h6>commentaire:{{nombreDeCommentaire}}</h6>
  
        <button type="button" class="btn btn-outline-info">
                 <span><i class="bi bi-hand-thumbs-up-fill"> 3</i></span>
        </button>
        <button  type="button" class="btn btn-outline-info">
                <i class="bi bi-hand-thumbs-down-fill"> 2</i>
        </button >
        <button  @click="msgbutton=!msgbutton" type="button" class="btn btn-outline-info">
             <span><i class="bi bi-chat"></i></span>
        </button>
        </div>
            
              <div v-show="msgbutton" class="form-floating">
                 <textarea v-model="msg" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">commentaires</label>
                     <button   @click="publier" type="button" class="btn btn-outline-info">Publier</button>
                </div>
                <div>
                   
                     <div   v-for="(val,index) in tabcommentaire" :key="index">
                         <div class="box-commentaire" v-if="id===val.id">
                                  <div class="id-user" >
                                 <div class="photo-user">
                                    <img src="../../assets/logo.png" alt="photo user"/>
                                    </div>
                                 </div>
                          
                           <div class="bg-success p-2 border  text-dark bg-opacity-10"> 
                                <p>{{val.description}}</p>
                                {{val.date.year}} à {{val.date.heure}}
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
    data(){
        return {
            msgbutton:false,//boolean pour faire appparaitre la zone de saisie
            tabcommentaire:eventBus.commentaire,//array contenant tous les commentaires
           msg:"",//contenu du textarea
           user:eventBus.user //on recupère l'user
        }
       
    },
     props:['id'],//props contenant l'id des messages
    methods:{
        publier(){
                console.log(this.id);
            let date=new Date();
            console.log(date.toLocaleDateString());
            //objet contenant le message de l'user
            let msg={
                 id:this.id,//id du message
                description:this.msg,
                date:{
                    year:date.toLocaleDateString(),
                    heure:date.toLocaleTimeString()
                },
                user:this.user
                
            }
          
            
           eventBus.ajouterCommentaire({...msg});
           console.log("tableau comentaire");
           console.log(eventBus.commentaire);
           this.msgbutton=false;
             this.msg="";
        }
    },
    created(){
   
        this.tabcommentaire=eventBus.commentaire;
        eventBus.$on('update:commentaire',(msg)=>{
                this.tabcommentaire=msg;

        });
    },
    computed:{
        //affiche le nbre de commentaire d'un message
        nombreDeCommentaire(){
                    let count=0;
            this.tabcommentaire.forEach(element => {
                if(element.id===this.id){
                    count++;
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
.bg-success{
   // margin-bottom:5%;
    width:70%;
    //justify-content: space-between;
   // height:10vh;
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


</style>