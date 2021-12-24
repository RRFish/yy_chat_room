<template>
    <div>
        <h1>yy聊天室登入頁</h1>
        <div v-show="loginForm.isRegister">暱稱: <input v-model="loginForm.nickname" type="text"></div>
        <div>帳號: <input v-model="loginForm.account" type="text"></div>
        <div>密碼: <input v-model="loginForm.password" type="password"></div>
        <button @click="loginHandle">登入</button>
        <button @click="loginForm.isRegister=!loginForm.isRegister">{{ registerButtonLabel }}</button>
        <button v-show="loginForm.isRegister" @click="registerHandle">提交</button>        
    </div>


</template>

<script>
import { loginApi, registerApi } from "@/api";

export default {
    name: "Login",
    data(){
        return {
            loginForm:{
                isRegister: false,
                account: "",
                password: "",
                nickname: ""
            }
        }
    },
    computed:{
        registerButtonLabel() {
            return this.loginForm.isRegister ? "取消" : "註冊"
        }
    },
    methods:{
        loginHandle() {
            loginApi(this.loginForm).then((res) => {
                if(res.data.code==200){
                    this.$store.dispatch("login", res.data.data).then(async ()=>{
                        await this.$store.dispatch("userinfoAction")
                        this.$router.push("/index")
                    })
                }
            })
        },
        registerHandle(){
            if(this.loginFormValidate()){
                registerApi(this.loginForm).then((res) => {
                    if(res.data.code==200){
                        this.$store.dispatch("login", res.data.data).then(()=>{
                            this.$router.push("/index")
                        })
                    }
                })
            }else{
                alert("註冊失敗!請檢查")
            }
        },
        loginFormValidate() {
            if(this.loginForm.account.length <=6) return false
            if(this.loginForm.password.length <=6) return false
            if(this.loginForm.nickname.length <=4) return false
            return true
        }

    }
};
</script>