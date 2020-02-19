<template>
  <div class="wrapper center flex flex_col">
    <div class="content flex flex_al_center flex_ju_aroud flex_col">
      <UploadImg style="height:12vh" :avatarDefaultSrc="avatarDefaultSrc" />
      <WriteCom
        item="神州号"
        :errMsg="wxIdErr"
        placeholder="神州号为登录凭证,请务必记住"
        :errorShow="wxIdErrorShow"
        @setProfiles="setWxId"
      />
      <WriteCom
        item="密码"
        errMsg="密码不能为空"
        placeholder="密码"
        inputType="password"
        :errorShow="passwordErrorShow"
        @setProfiles="setPassword"
      />
      <WriteCom
        item="昵称"
        errMsg="昵称不能为空"
        :errorShow="nickNameErrorShow"
        placeholder="昵称"
        @setProfiles="setNickName"
      />
      <WriteCom
        item="年龄"
        errMsg="年龄不能为空,且必须是数字"
        :errorShow="ageErrorShow"
        placeholder="年龄"
        @setProfiles="setAge"
      />
      <Area item="地区" @setProvince="setProvince" @setCity="setCity" @setArea="setArea" />
      <Gender item="性别" @setGender="setGender" />
    </div>
    <div class="flex flex_al_center flex_ju_aroud flex_1">
      <button class="btn" @click="register">注册</button>
      <router-link class="linkTo fontSize_10" to="/login">去登录</router-link>
    </div>

    <Toast
      v-if="showErr"
      :type="type"
      :show="showErr"
      :title="title"
      :text="text"
      :hasConfirmBtn="hasConfirmBtn"
      @dispair="dispairToast"
    ></Toast>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import throtle from "../utils/throtle";
export default {
  data() {
    return {
      wxIdErr: "神州号长度不能少于三位,必须是字母数字或_",

      avatarDefaultSrc: require("@/assets/default_avatar.jpg"),
      profiles: {},
      wxIdErrorShow: true,
      passwordErrorShow: true,
      nickNameErrorShow: true,
      ageErrorShow: true,
      //弹出框的数据
      showErr: false,
      title: "",
      type: "",
      text: "",
      hasConfirmBtn: true
    };
  },
  components: {
    UploadImg: () => import("../components/rigister/UploadImg"),
    WriteCom: () => import("../components/rigister/Write"),
    Area: () => import("../components/rigister/Area"),
    Gender: () => import("../components/rigister/Gender")
  },
  computed: {
    ...mapState("regist_login", ["currentSpeaker"])
  },
  methods: {
    ...mapActions("regist_login", ["postProfiles"]),
    throtle,
    async setWxId(id) {
      if (id.trim() && id.trim().length >= 3) {
        //发送请求被注册的验证
        const registed = await this.http.checkWxIdIsRegisted(id);
        if (registed.data.mes == "fail") {
          this.wxIdErr = registed.data.data;
        } else {
          this.wxIdErrorShow = false;
          this.profiles.wxId = id;
        }
      } else {
        this.wxIdErr = "神州号长度不能少于三位,必须是字母数字或_";
        this.wxIdErrorShow = true;
      }
    },
    setPassword(pw) {
      if (pw.trim()) {
        this.profiles.password = pw;
        this.passwordErrorShow = false;
      } else {
        this.passwordErrorShow = true;
      }
    },
    setNickName(name) {
      if (name.trim()) {
        this.profiles.nickName = name;
        this.nickNameErrorShow = false;
      } else {
        this.nickNameErrorShow = true;
      }
    },
    setAge(age) {
      if (age.trim() && !isNaN(Number(age))) {
        this.profiles.age = age;
        this.ageErrorShow = false;
      } else {
        this.ageErrorShow = true;
      }
    },
    setProvince(province) {
      this.profiles.area = province;
    },
    setCity(city) {
      var area = this.profiles.area.split(" ");
      if (area.length < 2) {
        //防止出现选择多次城市的bug
        this.profiles.area = this.profiles.area + " " + city;
      } else {
        this.profiles.area = area[0] + " " + city;
      }
    },
    setArea(area1) {
      var area = this.profiles.area.split(" ");
      if (area.length < 3) {
        this.profiles.area = this.profiles.area + " " + area1;
      } else {
        this.profiles.area = area[0] + " " + area[1] + " " + area1;
      }
    },
    setGender(gender) {
      this.profiles.gender = gender;
    },
    checkProfileBeforeSend() {
      if (this.wxIdErrorShow) {
        this.showToast("err", "错误", "神州神州号不符合格式");
        return;
      } else if (this.passwordErrorShow) {
        this.showToast("err", "错误", "密码不符合格式");
        return;
      } else if (this.nickNameErrorShow) {
        this.showToast("err", "错误", "昵称不符合格式");
        return;
      } else if (this.ageErrorShow) {
        this.showToast("err", "错误", "年龄不符合格式");
        return;
      } else if (!this.profiles.area) {
        this.showToast("err", "错误", "请正确选择地区");
        return;
      } else if (!this.profiles.gender) {
        this.showToast("err", "错误", "请正确选择性别");
        return;
      }
      return true;
    },
    dispairToast() {
      this.showErr = false;
    },
    showToast(type, title, text, hasConfirmBtn) {
      this.showErr = true;
      this.title = title;
      this.hasConfirmBtn = hasConfirmBtn;
      this.type = type;
      this.text = text;
    },

    async register() {
      var timer = null;
      if (timer) {
        return;
      } else {
        const flag = this.checkProfileBeforeSend(); 
        if (flag) {
          const profiles = this.profiles;
          profiles.avatarUrl = this.currentSpeaker.avatarUrl;
         
          const resp = await this.http.postProfiles(profiles);
         
          if (resp.data.mes == "ok") {//用 
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.$router.push("/login?wxId="+this.profiles.wxId);//传递参数
          } 
        }
        timer = setTimeout(() => {
          timer = null
          clearTimeout(timer);
        }, 2000);
      }
    }
  }
};
</script>

<style scoped lang="less">
.wrapper {
  height: 100vh;
  width: 100vw;
  background: yellowgreen;
  .content {
    height: 90%;
  }
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
</style>
