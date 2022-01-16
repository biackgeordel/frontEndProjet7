<template>
    <div>
        <div>
            <commentaire :MessageId="MessageId"  :disLike="disLike" :like="like" :coments="coments"></commentaire>
            
        </div>
        
    </div>
   
    
</template>
<script>
import commentaire from "../user/commentaire.vue"
export default{
name:'Item-commentaire',
props:['coments','MessageId','like','disLike'],
components:{
    commentaire
},
watch:{


}


}



</script>
<style lang="scss" scoped>

</style>