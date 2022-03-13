<template>
<b-container  fluid >
    <section>
        <div class="box-content">
            <div class="d-flex p-4 justify-content-between">
                <div>
                  <b-img v-bind="mainProps" thumbnail
                  fluid :src="users.urlImage" :alt="'photo du profil de '+username"></b-img>
                  <h3>photo de profil de {{username}}</h3>
                </div>

                <div class='btn-command'>
                    <button class="btn btn-success" v-b-modal.modal-prevent-closing >Modifier</button>
                    <button class="btn btn-danger" v-b-modal.modal-1  >Supprimer</button>
                </div>
      <!--Modal pour modifier les informations de l'utilisateur --->
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Modifier vos informations"
        @hidden="resetModal"
        @show="showModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.prevent="handleSubmit"  enctype="multipart/form-data">
          <b-form-group  label="Ville"  label-for="ville-input">

          <b-form-input id="ville-input" v-model="userInfo.ville" 
          :placeholder="users.ville" required></b-form-input>
          </b-form-group>

          <b-form-group label="pays"  label-for="pays-input">
          <b-form-input id="pays-input" v-model="userInfo.pays" 
          :placeholder="users.pays" required></b-form-input>
          </b-form-group>

          <label for="textarea">Biographie</label>
          <b-form-textarea id="textarea" v-model="userInfo.bio"
          rows="3" max-rows="6" >
          </b-form-textarea>
           <b-form-file
           class="mt-3" plain
            accept=".png,.jpg,.gif,.webp"
            @change="uploadImage" 
            >
            </b-form-file>
             <div v-show="error.length!==0"  class="alert alert-danger" role="alert" >
                  <div v-for="(val,index) in error " :key="index">
                    {{ index }}: {{ val }}
                  </div>
            </div>
        </form>
    </b-modal >
    <!---Modal pour supprimer le compte de l'utilsateur----> 
    <b-modal
        id="modal-1" 
        title="Supprime le compte"
        ref="modal"
       @ok="deleteCompte"
      
      
      
      >
        <div class="my-4">
          <h5>Voulez-vous supprimer vôtre compte ?</h5>
         <strong>En cliquant sur ok toutes vos informations 
           seront supprimées de l'application</strong>
        </div>
 
        
    </b-modal>
            
               
            </div>
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
    props:['username','datas'],
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
         urlImage:"",
           error:"",
        
         
    }
    },
     mounted(){
      
     },

    computed:{
        users(){
            return this.datas;
                  
        
        }
  
    },
      methods: {
        //function reset les informations de l'user
      resetModal() {
         this.userInfo.ville="";
        this.userInfo.pays="";
        this.userInfo.bio="";
        this.error=""
      },
      showModal(){
        this.userInfo.ville=this.users.ville;
        this.userInfo.pays=this.users.pays;
        this.userInfo.bio=this.users.bio;
        
      },
      //function pour soumettre le formulaire de modifications des information de l'user
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      //function pour modifier les information de l'user
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
             if(response.status===200){
              console.log('update:',response);
             this.$store.dispatch('fetchGetOne');
              this.resetModal();  
               this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing');
               })
             }
       
           }).catch(error=>{
             console.log(error.response);
             this.error=error.response.data.message;
               
             
           
           });
         
        
     
      },
      // function pour changer l'iamge du profil user
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
        //function pour supprimer le compte
        deleteCompte(){
          const idUser=JSON.parse(localStorage.getItem('user')).idUser;
          this.$http.delete(`/deleteUser/${idUser}`).then(response=>{
            if(response.data===1){
              console.log("compte supprimé");
           
                 this.$nextTick(() => {
              localStorage.removeItem('user');
              localStorage.removeItem('auth');
              this.$bvModal.hide('modal-prevent-closing');
              this.$router.push({
                path:"/"
              })
               })
            }
          }).catch(error=>{
            console.log(error);
          })
      
        }
    }
  

}


</script>
<style lang="scss" >
    .box-content{
        margin:auto;
        width:50%;
        height:50vw;
          @media(max-width:950px){
              width:100%;
              height:100%;
              margin:0%;
            }
        background-color: #ffff;
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
    button{
      outline: none;
      border:none;
      background-color: inherit;
      font-size:xx-large;
      font-weight: bold;
    }
    
</style>