<template>
        <div class="container-form">
            <div class="element_form">
                  <h1>
                Groupomania social, partagez et restez en contact avec votre entourage.
                </h1>
            </div>
            <div class="element_form">
                <h2>Connectez-vous à votre compte</h2>
                <form @submit.prevent="connexion(form)" class="form">
                      <div class="mb-3">
                             <label for="validationEmail" class="form-label">Email</label>
                             <input type="email" @input="validationEmail" v-model="form.email" class="form-control"  id="validationEmail"  required>
                         <div class="invalid-feedback alert alert-danger" role="alert">
                             {{msg}}
                         </div>
                        </div>
                          <div class="mb-3">
                                  <label for="validationPassword" class="form-label">password</label>
                                  <input ref="password" @input="validationPass" v-model="form.password" type="password" class="form-control " id="validationPassword" required>
                                    <div  class="invalid-feedback alert alert-danger" role="alert">
                                        <span v-html="msgPass"></span>
                                    </div> 
                                  
                            </div>
                    <div class="col-12">
                            <button type="submit" :disabled="validation" class="btn ">Connexion</button>
                         
                    </div>
                       <div class="alert alert-danger" role="alert" v-show="validErrorServer===true">
                             {{msgServer}}
                         </div>
                </form>
                        
             </div>
          
       

        </div>

</template>


<script>
export default{
   
    name:"TheForm",
  
    data(){
        return{
            form:{
                email:'',
                password:''
            },
            msg:"",//variable pour afficher les erreurs
            msgPass:"",
            valid:false,
            validPass:false,
            validEmail:false,
            validErrorServer:false,
            msgServer:""//variable pour afficher les erreurs serveurs 

        }
    },
    
    methods:{
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
           validationEmail(event){
               this.validEmail=null;
           const email = new RegExp(/^[a-z]+[.a-z0-9-]+@[a-z]+[.][a-z]{2,}$/);
              if(this.form.email.match(email)){
                    event.target.classList.replace('is-invalid','is-valid');
                       this.validEmail=false;
                    
                }else{
                   event.target.classList.add('is-invalid');
                   this.msg="Email saisi n'est pas valide";
                      this.validEmail=true;
                }
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
               console.log(error.message);
                this.msgServer=(error.response)?`${error.response.data.message}`:
                `${error.message}:impossible de se connecter au serveur`;
                 this.validErrorServer=true;
              })   

    },
        

   
    },
    computed:{
             validation(){
                 return (this.validPass==false && this.validEmail==false) ? false : true;
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
            background-color: #8e44ad;
            color:#ffff;
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
.test{
    color:#c0392b;
}
.alert{
    position:relative;
    top:10px;
}

</style>