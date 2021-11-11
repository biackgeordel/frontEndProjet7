<template>

<div>
       <div class="box-img">
                <div class="id-user" >
                 <div class="photo-user">
                    <img src="../../assets/logo.png" alt="photo user"/>
                 </div>
                 <div class="p-3">
                      <span>{{getUserMessage.toUpperCase()}}</span> 
                 </div> 
               
                </div>
                   
                <div>
                   <img :src="items.urlImage" class="card-img-top" alt="..."/>
                </div>
                 <div>
                     <h5>{{items.title}}</h5>
                     <p>{{items.description}}</p>
                    
                </div>
               
        </div>
    

</div>

    
</template>
<script>
export default{
    name:"Message",
    props:['items','user'],
    computed:{
       //on affiche tous les noms des users stockés dans la table message
       getUserMessage(){
          let nom="" ;  
           this.user.forEach(element => {
              if(element.idUser===this.items.idUser){
                 nom=element.username;
              }
              
           });  
          
          console.log(nom);
          return nom;
       }
    }

}


</script>
<style lang="scss" scoped>
.box-img{
width:80%;
margin:auto;

}
.id-user{
 height:5vw;
 width:100%;
 position:relative;
  display: flex;
 align-items:center;
 margin-top:3%;
 margin-bottom:4%;
 .photo-user{
    width:5vw;
    height:5vw;
     img{
   display: inline-block;
  
   object-fit: cover;
    border-radius:50%;
    background-color: aqua;
    width:100%;
    height:100%;
    }
 }


}

</style>