<template>
  <div id="app">
    <div id="nav">
      <MyNav />
    </div>
    <div class="connector">
      <router-view />
    </div>
  </div>
</template>
<script>

import MyNav from './components/nav/MyNav'
export default {
  components:{
    MyNav
  }
}
</script>>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
body {
  height: 100%;
  width: 100%;
  #app {
    height: 100%;
    width: 100%;
    display: flex;
    #nav {
      height: 100%;
      width: 35px;
      padding: 0 12.5px;
      background: black;
    }
    .connector {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
