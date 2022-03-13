<template>
        <div class="container-form">
            <div class="element_form">
                  <h1>
                Groupomania social, partagez et restez en contact avec votre entourage.
                </h1>
            </div>
            <div class="element_form">
                <h2>Créez votre compte </h2>
                <form @submit.prevent="signupUser" class="form">
                         <div class="mb-3">
                             <label for="username" class="form-label">Username</label>
                             <input type="text" v-model="form.username" 
                             class="form-control"  id="username"  required />
                         <div class="invalid-feedback">
                             {{msg}}
                         </div>
                    
                        </div>
                      <div class="mb-3">
                             <label for="validationEmail" class="form-label">Email</label>
                             <input type="email" @input="validationEmail" v-model="form.email" class="form-control"  id="validationEmail"  required>
                         <div class="invalid-feedback">
                             {{msg}}
                         </div>
                        </div>
                          <div class="mb-3">
                                  <label for="validationPassword" class="form-label">Password</label>
                                  <input ref="password" @input="validationPass" v-model="form.password" type="password" class="form-control " id="validationPassword" required>
                                    <div class="invalid-feedback">
                                      {{msg}}
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
                date:(new Date()).toLocaleDateString()
            },
            msg:"",//variable pour afficher les erreurs
            msgServer:"",//variable contenant les erreurs du serveur
            validErrorServer:false,//boolean pour afficher les messages du serveur
            validPass:false, //boolean pour afficher les msgs d'erreurs du password
            validEmail:false,//boolean pour afficher les msgs d'erreurs d'email
            user:{
                username:'',
                idUser:''
            }

        }
    },
    
    methods:{
        validationPass(event){
            const pass=new RegExp(/^[A-Z][a-zA-Z]+[0-9]+[$!#&*]$/g);
                if(this.form.password.match(pass)){
                    event.target.classList.replace('is-invalid','is-valid');
                    this.validPass=false;
                }else{
                   event.target.classList.add('is-invalid');
                   this.msg="le password est invalide";
                    this.validPass=true;
                
                }
                       
                   },
           validationEmail(event){
               this.validEmail=null;
           const email = new RegExp(/^[a-z]+[.a-z0-9-]+@[a-z]+[.][a-z]{2,}$/);
              if(this.form.email.match(email)){
                    event.target.classList.replace('is-invalid','is-valid');
                       this.validEmail=false;
                    
                }else{
                   event.target.classList.add('is-invalid');
                   this.msg="email est invalide";
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
                    this.msgServer=(error.response)?`${error.response.statusText} :${error.response.data.message}`
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
                 idUser:response.data.id
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
                  this.msgServer=(error.response)?`${error.response.statusText} :${error.response.data.message}`
                    :`${error.message}: Impossible de se connecter au serveur`;
                    this.validErrorServer=true;
              })   

    },
        
      

                  
               

             
   
    },
    computed:{
             validation(){
                 return (this.validPass==false && this.validEmail==false) ? false : true;
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
             }
             &:last-child{
                 height:inherit;
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
         width:80%;
         margin:auto;
         height:inherit;
         input{
             width:100%;
             height: inherit;
         }
        .btn{
            width:30%;
            margin-left:5%;
            color:#ffff;
            background-color: #8e44ad;;
     
            @media (max-width:950px){
             margin-right:100% !important;
                width:40%;

   }
        }
    }

label{
    color:#2f3542;;
    font-weight:bold;
}
.alert{
    position:relative;
    top:5%;
}


</style>
