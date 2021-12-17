import { createStore } from "vuex";

export default createStore({
  state() {
    return {
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
        state.userinfo = data;
        console.log("userinfo", state.userinfo, data)
    },
    chatMessagePush(state, data) {
      state.chatMessage.push(data);
    },
    chatMessageSet(state, data) {
      state.chatMessage = data;
    },
  },
  actions: {
    login(context, data) {
      context.commit('login', data)
    },
    chatMessagePush(context, data){
      context.commit("chatMessagePush", data)
    },
    chatMessageSet(context, data){
      context.commit("chatMessageSet", data)
    },
  },
});