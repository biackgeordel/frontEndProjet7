<template>
   <commentaire :id='id'></commentaire> 
    
</template>
<script>
import commentaire from "./commentaire.vue"
export default{
name:'Item-commentaire',
props:['id'],
components:{
    commentaire
}

}

</script>
<style lang="scss" scoped>

</style>