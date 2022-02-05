
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
        },
        //allMessage
        allMessage:[],
        //state contenant tous les nouveaux messages pour la notification
        commentaire:[],
        //state contenant un seul message
        message:{}
       
    },
    mutations:{
        //methode pour la mise à jour de l'user
        getUser(state,user){
            state.datas=user;
            console.log('user:',state.datas);
        },
        //methode pour la mise à jour de la notification dans le header
        getCommentaire(state,comments,){
            state.commentaire=[...comments]
        },
        getOneMessage(state,msg){
            state.message=msg
            console.log('state oneMessage',state.message)
        },
        getAllMessage(state,allmsg){
            console.log('param:',allmsg);
            state.allMessage=allmsg;
            console.log('state:',state.allMessage);
        }

      
        },
    actions:{
        //methode pour recupérer un user
        fetchGetOne(context){
            const user=JSON.parse(localStorage.getItem('user')).idUser;
            axios.get(`/getOne/${user}`).then(response=>{
                if(response.status===200){
                    console.log(response.data);
                    context.commit('getUser',response.data);
                
                }
            })
        },
        //methode pour recupéreer tous les nouveaux messages pour la notification dans le header
        fetchGetCommentaire(context){
            axios.get('/allCommentaire').then(response=>{
                console.log('datas vuex',response.data);
                if(response.status===200){
                    context.commit('getCommentaire',response.data)
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        fetchGetOneMessage(context,msgId){
            axios.get(`/oneMessage/${msgId}`).then(response=>{
                if(response.status===200){
                    context.commit('getOneMessage',response.data);
                }
            }).catch(error=>{
                console.log(error)
            })

        },
        fetchGetAllMessage(context){
         axios.get('/allmessage').then(response=>{
                if(response.status===200){
                    console.log(response.data);
                    context.commit('getAllMessage',response.data);
                }
         }).catch(error=>{
             console.log(error);
         })
        }
     
    }

 
});
export default store;