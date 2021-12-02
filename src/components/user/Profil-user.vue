<template>
    <div>
     
       
        <div class="box">
          
            <div>
                  <h1 style="text-align:center">Information de  {{user}}</h1>
            <hr/>
            <div class="d-flex p-2 justify-content-around">
                <div>
                    <p style="padding-left:5%">Username:</p>
                    <p style="padding-left:5%">Email:</p>

                </div>
            
               <div class="box-img">
                    <img src="../../assets/image3.jpg"/>
                </div>

            </div>
          

            </div>
        
          
            <div class="box-btn">
                <button  @click="show=!show"  class="btn btn-primary" type="button">
                    Modifier votre profil <i class="bi bi-pencil-square"></i>
                 </button>
                <button class="btn btn-primary" type="button">Supprimer votre compte</button>
            </div>
          
        </div>
        <div v-show="show" class="box">
             <form  style="width:90%;padding-left:5%" class="show">
                <div class="mb-3">
                   <label for="exampleInputEmail1" class="form-label">Email address</label>
                   <input type="email" class="form-control" value="odilon" id="exampleInputEmail1" aria-describedby="emailHelp"/>
               <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
               </div>
               <div  class="mb-3">
                   <label for="exampleInputPassword1" class="form-label">Password</label>
                   <input type="password" class="form-control" id="exampleInputPassword1">
               </div>
 
               <button type="submit" class="btn btn-primary">Valider</button>
            </form>




        </div>
         

    </div>
</template>
<script>
export default{
    name:"profil-user",
    props:['user'],
    data(){
    return{
        show:false
    }
    },
    created(){
        console.log( 'created profil: ',this.$router);
    }

}


</script>
<style lang="scss" scoped>
    .box{
        position:relative;
        top:1vw;
        display: flex;
     flex-direction: column;
        justify-content: space-between;
   
        width:55%;
        height:100%;
        margin:auto;
        font-weight: bold;
        color:#2c3e50;
        background-color:#ecf0f1;
        border-radius:2%;
        @media (max-width:950px){
            width:99%;
        }
        .box-btn{
            display:flex;
           justify-content: space-around;
              @media (max-width:950px){
                  flex-direction:column;
             
        }
        }
   
    }
         .box-img{
            width:10vw;
            height:10vw;
            img{
                display: inline-block;
                object-fit: cover;
              width:10vw;
             height:10vw;
              border-radius: 2%;
            }
        }
</style>