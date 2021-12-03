import { createApp } from 'vue'
import router from "@/router";
import store from "@/store";
import App from './App.vue'
import { socket } from "@/utils/socket.js"

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
