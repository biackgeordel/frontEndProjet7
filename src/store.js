import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);




const store= new  Vuex.Store({
    state:{
        message:[],//array contenant tous les message
        commentaire:[],//array contenant tous les commentaires
        user:[]//array contenant tous les user
    },
    mutations:{
        //mutation permettant de recuperer tous les messages
        getAllmessage(state,message){
            state.message=message;

        },
        getAllUser(state,user){
            state.user=user;
        }
    },
    actions:{
        //methode permettant de recupérer les messages dans la BD 
        fetchMessage(context){
            axios.get('/allmessage').then(response=>{
                const data=response.data;
                context.commit('getAllmessage',Object.keys(data).map(key=>data[key]));
                console.log(data)
            }).catch(error=>{
                console.log(error);
            })
        },
        fetchUser(context){
            axios.get('/Alluser').then(response=>{
                const user=response.data;
                context.commit('getAllUser',user);
            }).catch((error)=>{
                console.log(error);
            })
        }



    }








});
export default store;