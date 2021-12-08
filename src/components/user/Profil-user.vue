<template>
      <user :datas="datas" :user="user"></user>
  
</template>
<script>import { mapState } from "vuex";
  import user from './user.vue'
export default{
    name:"profil-user",
    props:['user'],
    components:{
      user
    },
    created(){
        console.log( 'created profil: ',this.$router);
        this.$store.dispatch('fetchGetOne');
    },
    mounted(){
      
      
    },
    computed:{
      ...mapState([
        'datas'
      ])
    },
}
    
</script>
<style lang="scss" scoped>

</style>