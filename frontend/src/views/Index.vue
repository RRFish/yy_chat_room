<template>
  <div ref="chat_room">
    <ul id="messages">
      <li v-for="item in messagesComputed" :key="item" :class="{'message-self': item.user_id === $store.state.userinfo.user_id }">
        <span v-show="item.type==0">{{item.nickname}}-{{ item.message }}</span>
        <img v-show="item.type==1" :src="apiUrl+'/'+item.message">
        <video v-show="item.type==2" :src="apiUrl+'/'+item.message" controls></video>
      </li>
    </ul>
    <div id="form" action="">
      <button @click.prevent="uploadFileClick">上傳</button>
      <input type="file" ref="inputFile" @change="uploadFileChange" id="inputFile">
      <input id="input" v-model="messageForm.message" autocomplete="off" v-on:keyup.enter="sendChatMessage"/>
      <button @click.prevent="sendChatMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { loginApi, chatMessageApi, chatFileUploadApi } from "@/api"
import { sendMessageSocket } from "@/utils/socket.js"
import { apiUrl} from "@/config.js"
export default {
    name: "Index",
    data(){
      return {
        messageForm:{
          message: undefined,
          file: undefined,
          fileName: undefined,
        },
        apiUrl: apiUrl
      }
    },
    created() {
      this.getChatMessage()
    },
    mounted() {
      this.observeHeight()
    },
    methods:{
      sendChatMessage(){
        try{
          if(this.messageForm.message.length>0){
            sendMessageSocket(this.messageForm.message)
            this.messageForm.message = undefined
          }
        }catch{}
      },
      getChatMessage(){
        chatMessageApi().then((res)=>{
          this.$store.dispatch("chatMessageSet", res.data.data)
        })
      },
      getMessageClass(user_id){
        if(user_id==this.$store.state.userinfo.user_id) return "message-self"
        return "message_other"
      },
      uploadFileClick() {
        this.$refs['inputFile'].click()
      },
      uploadFileChange(e) {
        const files = e.target.files || e.dataTransfer.files
        const allowTypes = ['png', 'jpg', 'gif', 'mp4']
        if (!files.length) { return }
        if (!allowTypes.includes(files[0].name.split('.')[1].toLowerCase())) {
          this.messageForm.file = undefined
          this.messageForm.fileName = undefined
          return
        }
        this.messageForm.fileName = files[0].name
        this.messageForm.file = files[0]
        const form = new FormData()
        Object.keys(this.messageForm).forEach((key)=>{
          form.append(key, this.messageForm[key]) 
        })
        chatFileUploadApi(form).then(() => {
          // this.searchHandle()
        })        
      },
      observeHeight() {//監聽視窗大小變化 當新訊息進來時scroll到最底
        const resizeObserver = new ResizeObserver(function() {
          window.scrollTo(0,document.body.scrollHeight);
        });

        resizeObserver.observe(this.$refs.chat_room);
      }
    },
    computed: {
      messagesComputed(){
        return this.$store.state.chatMessage
      },
      messageImageUrlComputed(){
        try{
          if(this.messageForm.file) return URL.createObjectURL(this.messageForm.file)
        }
        finally{
          return ""
        }
      }
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

  #inputFile { display: none; }
</style>