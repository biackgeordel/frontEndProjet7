<template>
    <div>
         <div>USER {{user}}</div>
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
               idUser:""
            },
            valid:true,
            validImage:false,
            urlImage:"",
            file:File

        }
    },
    mounted(){
        //on recupere user stocké dans le localStorage
       this.message.idUser=JSON.parse(localStorage.getItem('user')).idUser;
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
      
            }).catch(error=>{//gerer les erreurs duserveurs
                 console.log(error);
             }) 

            
         
            
               //on fait une redirection en utilisant la go(-1) 
         // this.$router.go(-1)
    }
    }




}
</script>
<style lang="scss" scoped>
.form{
    width:50%;
    margin:auto;
 
}
.dropzone{
    width:25vw;
    height: 20vw;
    margin:auto;
    margin-top:3%;
    img{
        width:100%;
        height:100%
    }
    .box-drop{
        width:100%;
        background-color: #2980b9;
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