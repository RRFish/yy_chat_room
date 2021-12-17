<template>
  <div ref="chat_room">
    <ul id="messages">
      <li v-for="item in messagesComputed" :key="item" :class="{'message-self': item.user_id === $store.state.userinfo.user_id }">{{item.nickname}}-{{ item.message }}</li>
    </ul>
    <form id="form" action="">
      <input ref="input" id="input" v-model="messageForm.message" autocomplete="off" /><button @click.prevent="sendChatMessage">Send</button>
    </form>
  </div>
</template>

<script>
import { loginApi, chatMessageApi } from "@/api"
import { sendMessageSocket } from "@/utils/socket.js"

export default {
    name: "Index",
    data(){
      return {
        messageForm:{
          message: undefined
        }
      }
    },
    created(){
      this.getChatMessage()
    },
    mounted(){
      window.scrollTo(0,document.body.scrollHeight);
    },
    methods:{
      sendChatMessage(){
        sendMessageSocket(this.messageForm.message)
        this.messageForm.message = undefined
      },
      getChatMessage(){
        chatMessageApi().then((res)=>{
          this.$store.dispatch("chatMessageSet", res.data.data)
        })
      },
      getMessageClass(user_id){
        if(user_id==this.$store.state.userinfo.user_id) return "message-self"
        return "message_other"
      }
    },
    computed: {
      messagesComputed(){
        return this.$store.state.chatMessage
      },
    }
};
</script>


<style>
  body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

  #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
  #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
  #input:focus { outline: none; }
  #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

  #messages { list-style-type: none; margin: 0; padding: 0; text-align: start;}
  #messages > li { padding: 0.5rem 1rem; background: aquamarine;}
  .message-self {
    text-align: end;
    background: #efefef !important;
  }

</style>