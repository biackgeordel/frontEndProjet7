<template>
      <div>
          <user :datas="datas" :username="username"></user>
        
      </div>
    
  
</template>
<script>import { mapState } from "vuex";
  import user from './user.vue'
export default{
    name:"profil-user",
    props:['username'],
    components:{
      user
    },
    created(){
        console.log( 'created profil: ',this.$router);
        this.$store.dispatch('fetchGetOne');
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