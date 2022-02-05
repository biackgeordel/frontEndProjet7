<template>
<b-container  fluid >
    <section>
        <div class="box-content">
            <div class="d-flex p-4 justify-content-between">
                <div>
                  <b-img v-bind="mainProps" thumbnail
                  fluid :src="users.urlImage" alt="Image 1"></b-img>
                  <h3>{{user}}</h3>
                </div>

                <div class='btn-command'>
                    <b-button v-b-modal.modal-prevent-closing variant="outline-primary">Modifier</b-button>
                     <div>
                           <b-button  v-b-modal.modal-1 variant="outline-primary">Supprimer</b-button>
                          <b-modal id="modal-1" title="Supprime le compte ">
                          <p class="my-4">Voulez-vous supprimer vôtre compte</p>
                          </b-modal>
                          </div>
                </div>
                 <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Modifier vos informations"
      @hidden="resetModal"
      @show="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.prevent="handleSubmit"  enctype="multipart/form-data">

        <b-form-group  label="Ville"  label-for="ville-input">
          <b-form-input id="ville-input" v-model="userInfo.ville" required></b-form-input>
        </b-form-group>

        <b-form-group label="pays"  label-for="pays-input">
          <b-form-input id="pays-input" v-model="userInfo.pays" required></b-form-input>
        </b-form-group>
          <label for="textarea">Biographie</label>
         <b-form-textarea id="textarea" v-model="userInfo.bio" placeholder="" rows="3" max-rows="6" >
         </b-form-textarea>
           <b-form-file
           class="mt-3" plain
            accept=".png,.jpg,.gif"
            @change="uploadImage" 
            
            ></b-form-file>
      </form>
    </b-modal >
            
               
            </div>
            {{user}}
                <hr/> 
            <div class="box-info">
                <h2>Informations</h2>
                <p>Pays:{{users.pays }}</p>
                <p>Ville:{{users.ville }}</p>
                <h2>Biographies:</h2> 
                <div>
                   {{users.bio  }}
                </div> 
                
            </div>
     
          

        </div>

    </section>
</b-container>
  
</template>
<script>

export default{
    name:"user",
    props:['user','datas'],
    data(){
    return{
        show:false,
         mainProps: { width:150, height:150, class: 'm1' },
         userInfo:{
           ville:"",
           pays:"",
           bio:"",
           dossier:JSON.parse(localStorage.getItem('user')).username
         },
         file:File,
         urlImage:""
         
    }
    },
    computed:{
        users(){
            return this.datas;
                  
        
        }
    },
      methods: {
      resetModal() {
        this.userInfo.ville= '';
        this.userInfo.pays="";
        this.userInfo.bio=""
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
       
        console.log(this.userInfo);
        console.log(this.file);
        let user=JSON.parse(localStorage.getItem('user')).idUser;
        let formData=new FormData();
        formData.append('user',JSON.stringify(this.userInfo));
        formData.append('image',this.file);
          console.log(formData);
          this.$http.put(`/updateUser/${user}`,formData,{
          headers:{'Content-Type': 'multipart/form-data'}
          }
           ).then(response=>{
             console.log('update:',response);
             this.$store.dispatch('fetchGetOne');
              this.resetModal();  
           }).catch(error=>{
             console.log(error);
           });
         
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },

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
        deleteCompte(){
          console.log("vous allez supprimer votre compte");
        }
    }
  

}


</script>
<style lang="scss" scoped>
    .box-content{
        margin:auto;
        width:50%;
        height:50vw;
          @media(max-width:950px){
              width:100%;
              height:100%;
              margin:0%;
            }
        border:1px solid #ecf0f1;
        border-radius:2%;
        position: relative;
        margin-bottom:5%;
        top:2vw;
        h2,h3{
            color:#12181d;
        }
        .box-info{
            padding-left:3%;
            p{
                font-weight: bold;
                color:#2c3e50;
            }
        }
        .btn-command{
            padding:5% 6%;
            width:50%;
          
            button{
                margin :2px ;
            }
        }
      
     
      
        

    }
</style>