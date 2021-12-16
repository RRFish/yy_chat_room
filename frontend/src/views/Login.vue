<template>
  <h1>yy聊天室登入頁</h1>
  <div>帳號: <input v-model="loginForm.account" type="text"></div>
  <div>密碼: <input v-model="loginForm.password" type="text"></div>
  <button @click="loginHandle">登入</button>
</template>

<script>
import { loginApi } from "@/api";

export default {
    name: "Login",
    data(){
        return {
            loginForm:{
                account: "user",
                password: "123456"
            }
        }
    },
    methods:{
        loginHandle(){
            loginApi(this.loginForm).then((res) => {
                if(res.data.code==200){
                    this.$store.dispatch("login", res.data).then(()=>{
                        this.$router.push("/index")
                    })
                }
            })
        },
    }
};
</script>