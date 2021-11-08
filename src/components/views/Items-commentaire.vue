<template>
   <commentaire :idMessage='idMessage'></commentaire> 
    
</template>
<script>
import commentaire from "../user/commentaire.vue"
export default{
name:'Item-commentaire',
props:['idMessage'],
components:{
    commentaire
}

}

</script>
<style lang="scss" scoped>

</style>