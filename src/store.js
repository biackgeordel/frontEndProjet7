
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);




const store= new  Vuex.Store({
    state:{
        datas:{
            email:"",
            ville:"",
            pays:"",
            bio:"",
            urlImage:""
        }
       
    },
    mutations:{
        getUser(state,user){
            state.datas=user;
            console.log('user:',state.datas);
        }
      
    },
    actions:{
        fetchGetOne(context){
            const user=JSON.parse(localStorage.getItem('user')).idUser;
            axios.get(`/getOne/${user}`).then(response=>{
                if(response.status===200){
                    console.log(response.data);
                    context.commit('getUser',response.data);
                
                }
            })
        }
     
    }

 
});
export default store;