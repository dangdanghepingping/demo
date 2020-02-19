<template>
  <div class="main">
    <div id="nav">
      <MyNav />
    </div>
    <div class="connector">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import Vue from "vue";
export default {
  components: {
    MyNav: () => import("../components/nav/MyNav")
  },
  computed: {},
  methods: {
    ...mapActions("regist_login", ["getCurrentSpeaker"])
    // 设置currentspeaker
    // const  { age, area,gender} = data;
    // let obj = {
    //   age,
    //   area,
    //   gender,
    //   nickName: data.u_name,
    //   wxId: data.wx_id
    // };
    // this.setCurrentSpeaker(obj);
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.$router.push("/login");
    }
    this.getCurrentSpeaker();


      
   
  }
};
</script>>
<style scoped lang="less">
.main {
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
</style>
