function loginApi(){
    Vue.axios.get(api).then((response) => {
        console.log("test")
      })
}


export default {
    loginApi
}

