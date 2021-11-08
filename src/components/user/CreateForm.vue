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
                            <div class="test" v-show="validError">{{msg}}</div>
                            <button type="submit" :disabled="validation" class="btn btn-primary">Connexion</button>
                    
                </form>
                        
             </div>
          
       

        </div>

</template>


<script>
import { eventBus } from '../../main';
export default{
   
    name:"CreateForm",
  
    data(){
        return{
            form:{
                email:'',
                password:'',
                username:'',  
            },
            msg:"",//variable pour afficher les erreurs
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
                    console.log('Error :',error.response.data.msg);
                    console.log('Error1:',error.response.statusText);
                    this.msg=`${error.response.statusText} :${error.response.data.msg}`;
                    this.validErrorServer=true;
               });
               
                 },

        connexion(user){
             this.$http.post('/login',user).
             then(response=>{
                 console.log(response);
                 if(response.status===200){
            //on recupere les données de l'user stockées dans la BD
                  this.user={
                 username:response.data.username,
                 idUser:response.data.idUser
                  };
                  console.log('mon user :',this.user);
                 console.log('mon user :',this.user.username)
                 //on fait la redirection sur la route accueil on le passe un paramètre 
                 // user=user.username
                  this.$router.push({
                      path:`Accueil/${this.user.username}`   
                         });
                  //on met à jour l'user sur eventBus
                  eventBus.changerUser({...this.user});
                  localStorage.setItem('user',JSON.stringify(this.user));
                }
                
              }).catch(error=>{
               console.log(error);
                this.msg=`${error.response.statusText} :${error.response.data.msg}`;
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
      height:100vh;
    display: flex;
    justify-content:space-between;
   background-color:#2c3e50;
   @media (max-width:950px){
       flex-direction: column;
       align-items: center;
   }
 
    .element_form{
        width:50%;
        height:100%;
        
         @media (max-width:950px){
             width:100%;
   }
        
       // border:1px solid green;
        h1,h2{
            text-align:center;
            padding-top:10%;
            padding-left:-10%;
            color:#ffffff;//#95a5a6;
        }
    }
    .form{
        display: flex;
        flex-direction: column;
        padding-left:10%;
         width:80%;
         margin-top:2%;
         height:100%;
        .btn{
            width:30%;
            margin-left:5%;
     
            @media (max-width:950px){
             margin-right:100% !important;
                width:40%;

   }
        }
    }
}
label{
    color:#ecf0f1;
}
.test{
    color:#c0392b;
}


</style>