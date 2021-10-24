<template>
    
 <div>
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
            
              <div v-show="msgbutton" class="form-floating">
                 <textarea v-model="msg" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">commentaires</label>
                     <button   @click="publier" type="button" class="btn btn-outline-info">Publier</button>
                </div>
                <div>
                   
                     <div   v-for="(val,index) in tabcommentaire" :key="index">
                         <div class="bg-success p-2 border  text-dark bg-opacity-10" v-if="id===val.id">

                                <div class="user">
                                    <span class="user__nom">{{user.email}} </span>
                                    <span class="user__date">{{val.date.year}} à {{val.date.heure}}</span>
                                </div>
                                
                                <p>{{val.description}}</p> 
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
                user:eventBus.user
                
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
    width:30vw !important;
    margin:10px;
}
.bg-success{
    margin-top:10px;
    margin-bottom:10px;
    display: flex;
    justify-content: space-between;
    width:100%;
    height:20vh;
}
.user{
    display: flex;
    font-size:10px;
    border-radius:50%;
    position:relative;
    right:-2vw;
    background-color:blueviolet;
    flex-direction: column;
    &__nom{
        width:50%;
        background-color: aqua;
        border-radius:50%;
    }
    &__date{
        width:50%;
    }
}

</style>