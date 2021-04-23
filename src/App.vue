<template>
  <div id="app">
    <Navcontainer/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navcontainer from "./components/Navcontainer"

export default {
  
  name: 'app',

  components : {
      Navcontainer
  }
  
 
}
</script>

<style scoped>
h1 {
  margin-left: 20px;
  margin-top:10px;
}

</style>
