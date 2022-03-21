<template>
    <div>
        
      <form  @submit.prevent="envoyer" class="form" enctype="multipart/form-data" method="POST">
                          <div @dragover="dragover" @drop="uploadImage" class="dropzone">
                              <img :src="urlImage" v-show="validImage"/>
                              <div class="box-drop"  v-show="!validImage">
                                     <h6 class="titre-drop">DRAG AND DROP</h6>
                                     <span class="icon-drop"><i class="bi bi-cloud-arrow-down"></i></span>
                              </div>
                           
                        
                             </div>
                          <div  v-if="valid" class="mb-3">
                             <label for="image" class="form-label">Image</label>
                             <input @change="uploadImage"   placeholder="mon fichier" type="file" class="form-control"  name="image" accept=".png,.jpg,.gif" id="image"  required>
                             
                        </div>
                      <div class="mb-3">
                             <label for="title" class="form-label">Title</label>
                             <input  v-model="message.title" type="text" class="form-control"  id="title"  required>
                         <div class="invalid-feedback">
                           
                         </div>
                        </div>
                          <div class="mb-3">
                                  <label for="description" class="form-label">Description</label>
                                  <textarea v-model="message.description" id="description"  rows="4" class="form-control"></textarea>
                                    <div class="invalid-feedback">
                                    
                                     </div>
                            </div>
                            <!---gestionnaire d'erreur du serveur---->
                               <div v-show="error.length!==0" class="alert alert-danger" role="alert">
                                     <div v-for="(val,index) in error" :key="index">
                                        {{val}}
                                     </div>
                                </div>
                            <!----------------------------------------------------------->
                    <div class="col-12">
                            <button type="submit"  class="btn btn-primary">Envoyer</button>
                             <button @click.prevent="remove" class="btn btn-primary m-3" v-show="!valid">remove</button> 
                    </div>
                </form>
              
                  
           
        
                        
           
    </div>
</template>
<script>
export default{
    name:"TheNewMessage",
    props:['user'],
    data(){
        return{
            message:{
                title:"",
                description:"",
               idUser:"",
               dossier:"",
               date:new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date())
            },
            valid:true,
            validImage:false,
            urlImage:"",
            file:File,
            error:[]

        }
    },
    mounted(){
        //on recupere user stocké dans le localStorage
       this.message.idUser=JSON.parse(localStorage.getItem('user')).idUser;
       //le nom du dossier pour stoker les images créeés 
       this.message.dossier=JSON.parse(localStorage.getItem('user')).username;
       console.log('mounted newmessage user:',this.message.idUser)

    },
    methods:{
        uploadImage(event){ 
            event.preventDefault();
         
         let fichier=event.target.files || event.dataTransfer.files;
           
            console.log(event.type);
            if(event.type==="drop"){
                this.valid=false;
            }
                if(fichier){
            Array.from(fichier).forEach(file=>{
                  this.file=file;
                let readFile=new FileReader();
                readFile.readAsDataURL(file);
                readFile.onloadend=()=>{
                    const image=new Image();
                
                    if(event.type==="drop"){
                        this.urlImage=image.src=readFile.result;
                          this.validImage=true;
                    }else{
                        this.urlImage=image.src=readFile.result;
                        this.validImage=true;   
                    }
                  

                }
            
            })
                }   
        },

        remove(){
            this.urlImage="";
            this.valid=true;
            this.validImage=false;
            this.file=File;
             this.message.title="";
             this.message.description="";
             this.error=[];
                console.log(this.message);
        },
        dragover(event){
            event.preventDefault();
        },
        envoyer(){ 
            let formData=new FormData();
            formData.append('message',JSON.stringify(this.message));
            formData.append('image',this.file);
              this.$http.post('/created',formData,
                 {
                     headers:{'Content-Type': 'multipart/form-data'}
                  }
             )
             .then(response=>{
                 console.log(response);
                  this.$router.push({
                path:`/Accueil/${this.user}`//user stocké en parametre
            })
      
            }).catch(error=>{//gerer les erreurs du serveurs
               this.error=error.response.data.message;
             }) 

            
         
            
               //on fait une redirection en utilisant la go(-1) 
         // this.$router.go(-1)
    }
    }




}
</script>
<style lang="scss" scoped>
input,label,button,h6{
    @media(max-width:950px){
        font-size:4vw;
    }
}
.form{
    width:50%;
    background-color: #ecf0f1;
      padding-left: 2%;
        padding-right: 2%;
        padding-top:2%;
    margin:auto;
       @media(max-width:950px){
        width: 100%;
        margin:0px;
        padding-left: 2%;
        padding-right: 2%;
       
    }
 
}
.dropzone{
    width:50%;
    height: 20vw;
    margin:auto;
  //  margin-top:3%;
   // padding-block:3%;
       @media(max-width:950px){
        width: 50%;
        height: 40vw;
    }
    img{
        width:100%;
        height:100%
    }
    .box-drop{
        width:100%;
        background-color:#8e44ad;
        height:100%;
        color:#ecf0f1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-drop{
          i{
              font-size:5vw;
          }
      }
   
    }
}
</style>