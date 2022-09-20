<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="dj">点击</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import request from '../api/login'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }, data() {
    return {
      username: 'admin',
      password: 'admin'
    }
  }, methods: {
    dj() {
      request.login({ username: this.username, password: this.password }).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>
