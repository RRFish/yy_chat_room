import { createStore } from "vuex";
import { userinfoApi } from "@/api"
import { authTokenSet, authTokenGet } from "@/utils/auth";

export default createStore({
  state() {
    return {
      authToken: '',
      userinfo:{
        user_id: undefined,
        account: undefined,
        nickname: undefined
      },
      chatMessage:[],
    };
  },
  mutations: {
    login(state, data) {
      state.authToken = data;
    },
    chatMessagePush(state, data) {
      state.chatMessage.push(data);
    },
    chatMessageSet(state, data) {
      state.chatMessage = data;
    },
    userinfoCommit(state, data) {
      state.userinfo = data
      console.log("data", data, state.userinfo)
      
    }
  },
  actions: {
    login(context, data) {
      context.commit('login', data)
      authTokenSet(data)
    },
    chatMessagePush(context, data){
      context.commit("chatMessagePush", data)
    },
    chatMessageSet(context, data){
      context.commit("chatMessageSet", data)
    },
    async userinfoAction({commit}) {
      console.log("執行")
      if(authTokenGet()){
        const res = await userinfoApi()
        commit("userinfoCommit", res.data.data)
        return true
      }
      return false

    }
  },
});