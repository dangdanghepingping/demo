<template>
  <div class="wrapper center flex flex_col">
    <div class="content flex flex_al_center flex_ju_aroud flex_col">
      <WriteCom item="神州号" :placeholder="wxId" @setProfiles="setWxId" />
      <WriteCom item="密码" placeholder="请输入密码" inputType="password" @setProfiles="setPassword" />
    </div>
    <div class="flex flex_al_center flex_ju_aroud">
      <button class="btn" @click="login({wxId,password})">登录</button>
      <router-link class="linkTo fontSize_10" to="/register">去注册</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      wxId: "",
      password: ""
    };
  },
  components: {
    UploadImg: () => import("../components/rigister/UploadImg"),
    WriteCom: () => import("../components/rigister/Write")
  },
  methods: {
    // ...mapMutations('regist_login',['setCurrentSpeaker']),
    async login(file) {
      const res = await this.http.login(file); //逻辑写错了,这块应该分开,登录在login页面写 返回值然后去触发mapstate里的setProfile
      if (res.status == 200 && res.data.mes == "ok") {
        const result = res.data;
        const data = result.data;
        //设置token 到localstorage
        localStorage.token = result.token;
        //跳转页面
        this.$router.push("/message");
      }
    },
    setWxId(id) {
      this.wxId = id;
    },
    setPassword(pw) {
      this.password = pw;
    }
  },
  mounted() {
    const wxId = this.$route.query.wxId;

    this.setWxId(wxId);
  }
};
</script>

<style scoped lang="less">
.wrapper {
  height: 100vh;
  width: 100vw;
  background: yellowgreen;
  justify-content: center;
  align-items: center;
  .content {
    height: 40%;
    width: 80%;
  }
  div {
    position: relative;
    width: 100%;

    button {
      height: 50px;
      width: 30%;
      font-size: 14px;
    }
    .linkTo {
      position: absolute;
      bottom: 20px;
      right: 50px;
    }
  }
}
</style>
