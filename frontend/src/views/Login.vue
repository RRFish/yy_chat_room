<template>
  <h1>yy聊天室登入頁</h1>
  <div>帳號: <input v-model="loginForm.account" type="text"></div>
  <div>密碼: <input v-model="loginForm.password" type="text"></div>
  <button @click="loginHandle">登入</button>
  <button @click="test">tt</button>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            loginForm:{
                account: "",
                password: ""
            }
        }
    },
    methods:{
        loginHandle(){
            if(this.userlogin(this.loginForm)){
                this.$router.push("/index")
            }
        },
        userlogin(form){
            if(form.account=="user"&&form.password=="123456") return true
            return false
        },
        test(){
            this.$store.dispatch("login")
        }
    }
};
</script>