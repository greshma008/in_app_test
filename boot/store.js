import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userLoggedIn : '',
        userInfo : {},
        token :'',
    },
    mutations:{
        setUserLoggedIn(state, username){
            state.userLoggedIn = username;
        },
        setUserInfo(state, payload){
            state.userInfo = payload;
        },
        setToken (state, token){
            state.token = token;
        },
        
    },
    actions:{
        setUserLoggedIn(context, username){
            console.log("username--- ", username);
            context.commit('setUserLoggedIn',username);
        },
        setUserInfo(context,payload){
            context.commit('setUserInfo',payload);
        },
        setToken(context,token){
            context.commit('setToken',token);
        },
        
    },
    getters:{

    }
});

export default store;

