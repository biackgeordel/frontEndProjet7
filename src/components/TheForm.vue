<template>
        <div class="container-form">
            <div class="element_form">
                  <h2>
                Groupomania social, partagez et restez en contact avec votre entourage.
                </h2>
            </div>
            <div class="element_form">
                <form @submit.prevent="connexion" class="form">
                      <div class="mb-3">
                             <label for="validationEmail" class="form-label">Email</label>
                             <input type="email" @input="validationEmail" v-model="form.email" class="form-control"  id="validationEmail"  required>
                         <div class="invalid-feedback">
                             {{msg}}
                         </div>
                        </div>
                          <div class="mb-3">
                                  <label for="validationPassword" class="form-label">password</label>
                                  <input ref="password" @input="validationPass" v-model="form.password" type="password" class="form-control " id="validationPassword" value="Mark" required>
                                    <div class="invalid-feedback">
                                      {{msg}}
                                     </div>
                            </div>
                    <div class="col-12">
                            <button type="submit" :disabled="validation" class="btn btn-primary">Connexion</button>
                    </div>
                </form>
                        
             </div>
          
       

        </div>

</template>


<script>
import { eventBus } from '../main';
export default{
   
    name:"TheForm",
  
    data(){
        return{
            form:{
                email:'',
                password:''
            },
            msg:"",//variable pour afficher les erreurs
            valid:false,
            validPass:false,
            validEmail:false

        }
    },
    
    methods:{
        validationPass(event){
            const pass=new RegExp(/^[A-Z][a-zA-Z]+[0-9]+[$!#&*]$/g);
            //const email = new RegExp(/^[a-z]+[.a-z0-9-]+@[a-z]+[.][a-z]{2,}$/);
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
           connexion(){
               console.log({...this.form});
               eventBus.connexion({...this.form});
               eventBus.changerPage('Accueil');
               console.log(this.$parent);
               
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
   // border:1px solid red;
   @media (max-width:950px){
       flex-direction: column;
       align-items: center;
   }
    height:70vh;
    display: flex;
    justify-content:space-between;
    .element_form{
        width:50%;
        height:100%;
         @media (max-width:950px){
             width:100%;
   }
        
       // border:1px solid green;
        h2{
            text-align:center;
            padding-top:20%;
            padding-left:5%;
            color:grey;
        }
    }
    .form{
        display: flex;
        flex-direction: column;
        margin-top:5%;
        padding-left:10%;
        .form-control{
            width:80%;
            
        }
        .btn{
            margin-top:10%;
            margin-right:25%;
            @media (max-width:950px){
             width:50%;
             margin-right:100% !important

   }
        }
    }
}


</style>