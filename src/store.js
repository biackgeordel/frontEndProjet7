import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);




const store= new  Vuex.Store({
    state:{
        message:[],//array contenant tous les message
        commentaire:[],//array contenant tous les commentaires
        user:[],//array contenant tous les user
        pseudo:''
    },
    getters:{
        getPseudo(state){
            return state.pseudo;
        }

    },
    mutations:{

        //mutation permettant de recuperer tous les messages
        getAllmessage(state,message){
            state.message=message;

        },
        setPseudo(state){
            if(localStorage.getItem('user')){
                state.pseudo=JSON.parse(localStorage.getItem('user')).username;
            }
        },
        //mutation pour recupérer tous les users
        getAllUser(state,user){
            state.user=user;
        },
        //mutation pour ajouter un commentaire
        addCommentaire(state,commentaire){
                state.commentaire=[...state.commentaire,commentaire];
        
           
        },//mutation pour recupérer tous les commentaires
        getAllCommentaire(state,commentaire){
            state.commentaire=commentaire;
        }
    },
    actions:{
        //action permettant de recupérer les messages dans la BD 
        fetchMessage(context){
            axios.get('/allmessage').then(response=>{
                const data=response.data;
                context.commit('getAllmessage',Object.keys(data).map(key=>data[key]));
                console.log(data)
            }).catch(error=>{
                console.log(error);
            })
        },
        
        //action pour recupérer tous users
        fetchUser(context){
            axios.get('/Alluser').then(response=>{
                const user=response.data;
                context.commit('getAllUser',user);
            }).catch((error)=>{
                console.log(error);
            })
        },
        //action pour recupérer tous les commentaires dans la BD
        fetchAllCommentaire(context){
            axios.get('/allcommentaire').then(response=>{
                const commentaire=response.data;
                console.log('com:',commentaire)
                context.commit('getAllCommentaire',commentaire);
            }).catch(error=>{
                console.log(error);
            })

        },//action pour ajouter un commentaire
        fetchCommentaire(context,commentaire){
            axios.post('/addCommentaire',commentaire,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response=>{
                const commentaire=response.data;
                context.commit('addCommentaire',commentaire);

            })
        }



    }








});
export default store;