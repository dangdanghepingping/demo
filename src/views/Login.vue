<template>
  <div class="wrapper flexCenter">
    <div class="register"
    
     >
      <div class="avatar flexCenter marginTopLi">
        <span class="fileinput-button">
          <span v-if="!avatarUrl">
            <p>头像</p>
            <sub>(小于1M)</sub>
          </span>
          <!-- img的src的值可以是base64格式的数据 -->
          <img v-else :src="avatarUrl" alt /> 
          <input @change="previewFile($event)" type="file" />
        </span>
      </div>
      <div class="flexCenter marginTop">
        <span class="left">昵称:</span>
        <p class="right">
          <input v-model="nickName" type="text" placeholder="长度为2到6之间的非纯数字" @blur="checkName" />
        </p>
      </div>
      <div class="gender flexCenter marginTopLi">
        <span class="left">性别:</span>
        <p class="right">
          <label>
            <input type="radio" name="gender" checked value="男" v-model="gender" />男生
          </label>
          <label>
            <input type="radio" name="gender" value="女" v-model="gender" />女生
          </label>
        </p>
      </div>
      <div class="age flexCenter marginTopLi">
        <span class="left">年龄:</span>
        <p class="right">
          <input type="text" style="text-align: center;" v-model="age" @blur="checkAge" />
        </p>
      </div>

      <div class="area flexCenter marginTopLi">
        <span class="left">地区:</span>
        <div class="right">
          <!-- <span>省</span> -->
          <p>
            <select @change="changeProvince" ref="province">
              <option v-for="item in provinces" value="item.text" :key="item.id">{{item.name}}</option>
            </select>
          </p>
          <!-- <span>市</span> -->
          <p>
            <select @change="changeCity" ref="cities">
              <option v-for="item in  cities" value="item.text" :key="item.id">{{item.name}}</option>
            </select>
          </p>
          <p>
            <!-- <span>地区</span> -->
            <select v-if="isCityProvince" @change="changeAreas" ref="areas">
              <option v-for="item in areas" value="item.text" :key="item.id">{{item.name}}</option>
            </select>
          </p>
        </div>
      </div>
    </div>
    <div class="log">
      <div class="flexCenter marginTop">
        <span class="left">神州号:</span>
        <p class="right">
          <input
            v-model="wxId"
            v-if="$route.name=='register'"
            type="text"
            placeholder="长度不能少于6位数"
            @blur="checkWxId"
          />
          <input v-model="wxId" v-else type="text" />

          <span
            v-if="$route.name == 'register'"
            style="display: block;font-size:10px;color:red"
          >请注意: 神州号是登录的凭证之一,请记牢</span>
        </p>
      </div>
      <div class="flexCenter marginTop">
        <span class="left">密码:</span>
        <p class="right">
          <input
            v-if="$route.name=='register'"
            type="password"
            v-model="password"
            placeholder="至少6位数的非纯数字"
            @blur="checkPassword"
          />
          <input v-else type="password" v-model="password" />
        </p>
      </div>
      <div class="flexCenter marginTop" v-if="$route.name == 'register'">
        <span class="left">确认密码:</span>
        <p class="right">
          <input type="password" v-model="secondPw" />
        </p>
      </div>
    </div>

    <button v-if="$route.name != 'login'" @click="register">注册111</button>
    <button v-else @click="login">登录</button>
  </div>
</template>

<script>
import countryArr from "@/data/countries.js";
import { getProvinces, getCitys, getAreas } from "province-city-area";
import checkRules from "@/utils/registerCheckRules";
import { postProfiles, postAvatar, httpLogin } from "@/utils/http.js";
import http from "../utils/axios";
export default {
  data() {
    return {
      btnVal: "",

      avatarUrl: "",
      wxId: "",
      nickName: "",
      gender: "男",
      password: "",
      secondPw: "",
      age: "20",
      provinces: getProvinces(),
      cureentProvinceId: 11,
      cureentProvince: "北京",

      cities: getCitys(11),
      cureentCityId: 110101,
      cureentCity: "东城区",

      areas: undefined,
      cureentAreaId: undefined,
      currentArea: undefined,

      cityProvinceIdArr: ["11", "12", "31", "50", "81", "82"], //两个特别行政区和三个直辖市,
      isCityProvince: false
    };
  },
  watch: {
    cureentProvinceId(nowId, previous) {
      this.isCityProvince =
        this.cityProvinceIdArr.indexOf(this.cureentProvinceId) == -1
          ? true
          : false;
      this.cities = getCitys(nowId);
      this.cureentCityId = this.cities[0].id;
      this.cureentCity = this.cities[0].name;
    },
    cureentCityId(nowId, previous) {
      if (this.isCityProvince) {
        this.areas = getAreas(this.cureentCityId);
        this.cureentAreaId = this.areas[0].id;
        this.currentArea = this.areas[0].name;
      }
    }
  },
  methods: {
    register(){
console.log(111);
    },
    async login() {
      //验证成功后转到main
      if (this.wxId == "") {
        alert("请填写神州号");
        return;
      }
      if (this.password.trim() != "") {
        const data = await httpLogin(this.wxId, this.password);
        if (data.data.mes == "fail") {
          alert(data.data.data)
        } else {
          localStorage.setItem("token", data.data.token);
          alert(data.data.data);

          //跳转和设置请求头 (这样时间的设置还有用吗?)
          http.defaults.headers.common["Authorization"] = localStorage.getItem(
            "token"
          );//刷新后这请求头的设置会没了
          this.$store.commit('setWxId',this.wxId);
          this.$router.replace({ name: "main", params: { id: this.wxId } });
        }
      } else {
        alert("请填写密码");
        return;
      }
    },
    dealRegisterData(data) {
      if (data.data.mes == "ok") {
        alert("注册成功");
        this.nickName = data.data.username;
        this.password = "";
        //设置axios的请求头

        this.$router.replace({ name: "login" });
      } else {
        alert("注册失败");
      }
    },
    async postAvatat(profile) {
      if (!this.avatarUrl) {
        if (window.confirm("确定不传头像图片吗?")) {
          profile.avatarUrl = "default";
          const registerData = await postProfiles(profile);
          this.dealRegisterData(registerData);
        } else {
          return;
        }
      } else {
        var form = new FormData();
        form.append("file", this.$refs.imgInput.files[0]);
        const data = await postAvatar(form);
        console.log(111111111);
        if (data.data.mes == "ok") {
          profile.avatarUrl = data.data.filename;
          profile.avatarOriginalname = data.data.originalname;
         
          const registerData = await postProfiles(profile);
          this.dealRegisterData(registerData);
        }
      }
    },
    async postFiles(profile) {
      const mes = await postProfiles(profile);
      if (mes.data.mes == "ok") {
        var id = mes.data.insertId;
        //获得id ,按照id去插入头像\
      } else {
        alert("注册失败:" + mes.data.err);
      }
    },
    // async register() {
    //   if (
    //     checkRules.checkPassword(this.password) &&
    //     checkRules.checkName(this.nickName) &&
    //     checkRules.matchPassword(this.password, this.secondPw) &&
    //     checkRules.checkWxId(this.wxId)
    //   ) {
    //     const profile = {
    //       username: this.nickName,
    //       password: this.password,
    //       age: this.age,
    //       area: this.currentArea
    //         ? `${this.cureentProvince} ${this.cureentCity} ${this.currentArea}`
    //         : `${this.cureentProvince} ${this.cureentCity}`,
    //       gender: this.gender,
    //       wxId: this.wxId
    //     };
    //     this.postAvatat(profile);
    //   }

    //   //先发送图片, 返回filename后,把filename和profile一块发送到数据库
    // },
    async checkWxId() {
      checkRules.checkWxId(this.wxId);
    },
    checkPassword() {
      checkRules.checkPassword(this.password);
    },
    checkName() {
      checkRules.checkName(this.nickName);
    },
    checkAge() {
      if (!checkRules.checkAge(this.age)) {
        this.age = "18";
      }
    },

    changeAreas() {
      var a = this.$refs.areas;
      this.cureentAreaId = this.areas[a.selectedIndex].id;
      this.cureentArea = this.areas[a.selectedIndex].name;
    },
    changeCity() {
      var c = this.$refs.cities;
      this.cureentCityId = this.cities[c.selectedIndex].id;
      this.cureentCity = this.cities[c.selectedIndex].name;
      console.log(this.cureentCity);
      if (this.isCityProvince) {
        this.areas = getAreas(this.cureentCity);
      }
    },
    changeProvince() {
      var p = this.$refs.province;
      this.cureentProvinceId = this.provinces[p.selectedIndex].id;
      this.cureentProvince = this.provinces[p.selectedIndex].name;
      this.cities = getCitys(this.cureentProvince);
      console.log(this.cureentProvince);
    },

    previewFile(event) {
      var file = event.target.files[0]; //获取上传的文件(该文件上有大小类型等信息)
      var reg = /^image\//;
      if (reg.test(file.type)) {
        console.log(file);
        if (file.size > 1048576) {
          alert("请传入小于1M的文件");
        } else {
          var reader = new FileReader(); //创建reader对象
          reader.onload = () => {
            //reader对象上的onload方法
            this.avatarUrl = reader.result; //reader.result是一个base64格式的img
          
            //发送axios请求
          };
          if (file) {
            reader.readAsDataURL(file);
          }
        }
      } else {
        alert("请传入图片文件");
      }
    }
  },
  created() {
    if (this.$route.name == "Login") {
      this.btnVal = "登录";
    } else {
      this.btnVal = "注册";
    }
  }
};
</script>

<style scoped lang="less">
select {
  margin-right: 5px;
}
.flexCenter {
  align-items: center;
  justify-content: center;
  display: flex;
}
.marginTopLi {
  margin-top: 1vh;
}
.marginTop {
  margin-top: 4vh;
}
.left {
  width: 25%;
  text-align: right;
}
.right {
  flex: 1;
  text-align: center;
}
select {
  width: 150px;
}
input {
  height: 25px;
  vertical-align: middle;
  padding: 0 10px;
}
.wrapper {
  background: url("../assets/talkingBg.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  @width: 400px;
  .register {
    width: @width;
    height: 300px;
    background: wheat;
    .avatar {
      @height: 100px;
      .fileinput-button {
        position: relative;
        display: inline-block;
        overflow: hidden;
        height: @height;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ccc;
        background: url("../assets/default_avatar.jpg");
        background-size: 100% 100%;
        img {
          height: 100%;
          width: 100%;
        }
        span {
          position: absolute;
          width: 100%;
          height: @height;
          text-align: center;
          p {
            font-size: 14px;
            margin-top: 30%;
          }
          sub {
            font-size: 10px;
          }
        }
        input {
          position: absolute;
          display: line-block;
          width: 100%;
          height: @height;
          left: 0px;
          top: 0px;
          opacity: 0;
          border-radius: 50%;
        }
      }
    }
  }
  .log {
    width: @width;
    height: 30vh;
    background: wheat;
    z-index: 0;
  }
  button {
    margin-top: 20px;
    display: inline-block;
    width: 30%;
    padding: 3vh 4vh;
    background: #fff !important;
    color: #000;
    outline: none;
    border: none;
    border-radius: 5px;
    letter-spacing: 3px;
    cursor: default;
    &:hover {
      background: #4dd52b !important;
      color: #fff;
    }
  }
}
</style>
