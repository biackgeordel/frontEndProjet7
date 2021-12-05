<template>
<b-container  fluid >
    <section>
       
        <div class="box-content">
            <div class="d-flex p-4 justify-content-between">
                <div>
                  <b-img v-bind="mainProps" thumbnail
                  fluid :src="this.urlImage" alt="Image 1"></b-img>
                  <h3>{{user}}</h3>
                </div>

                <div class='btn-command'>
                    <b-button v-b-modal.modal-prevent-closing variant="outline-primary">Modifier</b-button>
                    <b-button  variant="outline-primary">Supprimer</b-button>
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

        <b-form-group label="Email" label-for="email-input">
          <b-form-input id="email-input" v-model="userInfo.email" type="email" required ></b-form-input>
        </b-form-group>

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
                <hr/> 
            <div class="box-info">
                <h2>Informations</h2>
                <p>Email:{{ userInfo.email }}</p>
                <p>Pays:{{userInfo.pays}}</p>
                <p>Ville:{{userInfo.ville}}</p>
                <h2>Biographies:</h2> 
                <div>
                   {{userInfo.bio}}
                </div> 
                
            </div>
     
          

        </div>

    </section>
</b-container>
  
</template>
<script>import { mapState } from "vuex";

export default{
    name:"profil-user",
    props:['user'],
    data(){
    return{
        show:false,
         mainProps: { width:150, height:150, class: 'm1' },
         userInfo:{
           email:this.$store.state.datas.email,
           ville:this.$store.state.datas.ville,
           pays:this.$store.state.datas.pays,
           bio:this.$store.state.datas.bio,
         },
         file:File,
         urlImage:this.$store.state.datas.urlImage
         
    }
    },
    created(){
        console.log( 'created profil: ',this.$router);
        this.$store.dispatch('fetchGetOne');
    },
    mounted(){
      console.log('datas',this.$store.state.datas.ville);
      
    },
    computed:{
      ...mapState([
        'datas'
      ])
    },
      methods: {
      resetModal() {
      //  this.userInfo.email= ''
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
        let formData=new FormData();
        formData.append('user',JSON.stringify(this.userInfo));
        formData.append('image',this.file);
          console.log(formData);
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
    }
  

}


</script>
<style lang="scss" scoped>
    .box-content{
        margin:auto;
        width:50%;
        height:50vw;
        border:1px solid #ecf0f1;
        border-radius:2%;
        position: relative;
        top:2vw;
        h2,h3{
            color:#2c3e50;
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