
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);




const store= new  Vuex.Store({
    state:{
        datas:[],//array contenant tous les message
       
    },
    mutations:{
        getManyDatas(state,datas){
            state.datas=datas;
        }
    },
    actions:{
        fetchDatas(context){
            axios.get('allmessage').then(response=>{
                if(response.status===200){
                    const datas=response.data;
                context.commit('getManyDatas',Object.keys(datas).map(keys=>datas[keys]));
                }
            })
        }
    }

 
});
export default store;