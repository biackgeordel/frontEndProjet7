<template>
        <div class="container-form">
            <div class="element_form">
                  <h1>
                Groupomania social, partagez et restez en contact avec votre entourage.
                </h1>
            </div>
            <div class="element_form">
               <div class="element_form_compte">
                    <h2 v-show="!form.admin">Créer un compte</h2>
                    <h2 v-show="form.admin">Créer un compte admin</h2>
                    <button  class="btn "  @click="change">
                    <font-awesome-icon :icon="iconCompte" size="lg" />
                    </button>
                </div>
          
                <form @submit.prevent="signupUser" class="form">
                         <div class="mb-3">
                             <label for="username" class="form-label">Username</label>
                             <input type="text" v-model="form.username" 
                             @input="validationUsername"
                             class="form-control"  id="username"  required />
                         <div class="invalid-feedback alert alert-danger">
                             <span v-html="msgUsername"></span>
                         </div>
                    
                        </div>
                      <div class="mb-3">
                             <label for="validationEmail" class="form-label">Email</label>
                             <input type="email" @input="validationEmail" v-model="form.email" class="form-control"  id="validationEmail"  required>
                         <div class="invalid-feedback alert alert-danger">
                             {{msg}}
                         </div>
                        </div>
                          <div class="mb-3">
                                  <label for="validationPassword" class="form-label">Password</label>
                                  <input ref="password" @input="validationPass" v-model="form.password" type="password" class="form-control " id="validationPassword" required>
                                    <div class="invalid-feedback alert alert-danger" role="alert">
                                           <span v-html="msgPass"></span>
                                     </div>
                            </div>
                            <button type="submit" :disabled="validation" class="btn">Valider</button>
                            
                            <div class="alert alert-danger" role="alert" v-show="validError">{{msgServer}}</div>

                          
                    
                </form>
                        
             </div>
          
       

        </div>

</template>


<script>
export default{
   
    name:"CreateForm",
  
    data(){
        return{
            form:{
                email:'',
                password:'',
                username:'',
                date:(new Date()).toLocaleDateString(),
                  admin:false
                
            },
            msg:"",//variable pour afficher le msg d'erreur d'email
            msgPass:"",
            msgUsername:"",//variable pour afficher le msg d'erreur de l'username
            msgServer:"",//variable contenant les erreurs du serveur
            validErrorServer:false,//booleen pour afficher les messages du serveur
            validPass:false, //booleen pour afficher les msgs d'erreurs du password
            validEmail:false,//booleen pour afficher les msgs d'erreurs d'email
            validUsername:false,//booleen pour afficher le msg d'erreur du username 
            user:{
                username:'',
                idUser:''
            },
            iconCompte:"fa-solid fa-user",
          
        

        }
    },
    
    methods:{
        //function pour valider le username
        validationUsername(event){
            if(this.form.username.length<=2){
            event.target.classList.add('is-invalid');
            this.msgUsername="Le nom d'utlisateur  doit avoir au moins 3 caractères"+
             "<br/> et doit  contenir"+ 
            " des lettres ,un epsace ou un tiret pour les noms composés  ";
         
            this.validUsername=true;

            }else{
             const username=new RegExp(/^[a-z-A-Z]+[\s]?[a-z-A-Z-0-9]+$/g);
            if(this.form.username.match(username)){
                    event.target.classList.replace('is-invalid','is-valid');
                    this.validUsername=false;
                    
                }else{
                   event.target.classList.add('is-invalid');
                   this.msgUsername="Le nom d'utlisateur  doit contenir"+ 
                    " des lettres ,un epsace ou un tiret pour les noms composés  ";
                      this.validUsername=true;
                }


            }
       

        },
        //function pour valider le mot de passe
        validationPass(event){
            const pass=new RegExp(/^[A-Z][a-zA-Z-0-9]+[$!#&*]$/g);
            if(this.form.password.length<=5){
            event.target.classList.add('is-invalid');
            this.msgPass="Le mot de passe doit contenir au moins 6 caractères.<br/>"+
            "Le mot de passe doit"+
            " commencer par une lettre maj  suivi des lettres"+
            " alphanumeriques et doit se terminer par un caractère spécial exemple: ($!#&*)";
            this.validPass=true;
               }
                else {
                 if(this.form.password.match(pass)){
                    event.target.classList.replace('is-invalid','is-valid');
                    this.validPass=false;
                 }else{
                     event.target.classList.add('is-invalid');
                     this.msgPass="Le mot de passe doit"+
                     " commencer par une lettre maj  suivi des lettres"+
                     " alphanumeriques et doit se terminer par un caractère spécial exemple: ($!#&*)";
                     this.validPass=true;
                     }
              
                }
            
                       
         },
         //function pour valider l'email
        validationEmail(event){
               this.validEmail=null;
           const email = new RegExp(/^[a-z]+[.a-z0-9-]+@[a-z]+[.][a-z]{2,}$/);
              if(this.form.email.match(email)){
                    event.target.classList.replace('is-invalid','is-valid');
                    this.validEmail=false;
                    
                }else{
                   event.target.classList.add('is-invalid');
                   this.msg="Email saisi n'est pas  invalide";
                      this.validEmail=true;
                }
           },
               //method pour créer un compte user
        signupUser(){
             console.log('date:',this.form.date);
            this.$http.post('/signup',{...this.form})
            .then(response=>{
                 if(response.status===201){
                    console.log(response.data);
                    console.log(this.$router);
                    //on appelle la method connextion pour recuperer l'user
                    this.connexion({
                        email:this.form.email,
                        password:this.form.password
                    });
                    }
                }).catch(error=>{
                    console.log(error.message);
                    this.msgServer=(error.response)?`${error.response.data.message}`
                    :`${error.message}: Impossible de se connecter au serveur`;
                    this.validErrorServer=true;
               });
               
                 },

        connexion(user){
  
             this.$http.post('/login',user).
             then(response=>{
                 console.log(response);
                 if(response.status===200){
                     console.log(response.data);
            //on recupere les données de l'user stockées dans la BD
                  this.user={
                 username:response.data.username,
                 idUser:response.data.id,
                 admin:response.data.admin
                  };
                  const token=response.data.token;
                  //on stoke les informations de l'user dans le localStorage
                localStorage.setItem('user',JSON.stringify(this.user));
                localStorage.setItem('auth',token)
                  console.log('mon user :',this.user);
                 console.log('mon user :',this.user.username)
                 //on fait la redirection sur la route accueil on le passe un paramètre 
                 // user=user.username
                  this.$router.push({
                      path:`Accueil/${this.user.username}`   
                         });
               
                }
                
              }).catch(error=>{
               console.log(error);
                  this.msgServer=(error.response)?`${error.response.data.message}`
                    :`${error.message}: Impossible de se connecter au serveur`;
                    this.validErrorServer=true;
              })   

    },
    change(){
        console.log(this.form.admin);
        this.form.admin=!this.form.admin;
        //on modifie l'icon compte en fonction de la valeur de form.admin
        this.iconCompte=(this.form.admin===true)?"fa-solid fa-user-gear":"fa-solid fa-user";

    }
  
    },
    computed:{
                //function pour activer le bouton d'envoi du formulaire
        validation(){

        return (this.validPass==false && this.validEmail==false && this.validUsername==false) ? false : true;
        },
        validError(){
            console.log('validErrorServer in computed: ',this.validErrorServer);
            return this.validErrorServer;
        }
    }
}
    

    
  
    



</script>
<style lang="scss" scoped>
.container-form{
    box-sizing: border-box;
    width:100%;
    height:100vh;
    display: flex;
    justify-content:space-between;
    align-items: center;
   @media (max-width:950px){
       flex-direction: column;
      justify-content:start;
       h1,h2{
           font-size:5vw;
       }
       label,div,input,button{
           font-size:4vw;
       }
   }
 
    .element_form{
        width:50%;
        height:90%;        
         @media (max-width:950px){
             width:100%;
             &:first-child{
                 padding-top:10%;
                 height:30vw;
                 text-align:center  
                  //border:1px solid green;
             }
             &:last-child{
                 height:inherit;
                 
             }
        }
        &_compte{
             
            display: flex;
            justify-content: center;
            width: 100%;
            height:max-content;
            @media(max-width:950px){
                margin-top:5%;
                margin-bottom:5%;
            }
            h2{
                width:70%;
               // border:1px solid red;
                  height:40px;
                @media(max-width:950px){
                      height:9vw;
                     }
            }
            button{
             color:#ffff;
             background-color: #8e44ad; 
             // border:1px solid red;
              width:10%;
              height:40px;
                  @media(max-width:950px){
                         width:15%;
                      height:9vw;
            }
            }
        }
   }

        
       // border:1px solid green;
        h1,h2{
            text-align:center;
            color:#2f3542;
             font-weight:bold;
        }
    }
    .form{
        display: flex;
        flex-direction: column;
        border: 1px solid #8e44ad;
        border-radius:10px;
        padding:5%;
         width:80%;
         margin:auto;
         height:min-content;
        
         input{
             width:100%;
             height: inherit;
         }
        .btn{
            width:30%;
            margin-left:5%;
            color:#ffff;
            background-color: #8e44ad;
     
            @media (max-width:950px){
             margin-right:100% !important;
                width:40% }
        }
    }

label{
    color:#2f3542;;
    font-weight:bold;
}
.alert{
    position:relative;
    top:10px;
}



</style>
