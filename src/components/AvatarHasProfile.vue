<template>
  <div>
    <div class="wrapper" ref="wrapper" :style="{height:size,width:size}">
      <img
        :src=" profile ? '/api' + profile.avatarUrl: ''"
        :style="{height:size,width:size}"
        @click.stop="showProfile"
      />
      <div class="profile" v-if="show" :style="getPosition()">
        <div class="top">
          <div class="nickname">
            <p>
              <span class="name">{{profile ? profile.nickName : ''}}</span>
              <span class="gender" v-if="profile ? profile.gender == 'boy' : true">
                <img :src="genderBoy" alt />
              </span>
              <span class="gender" v-else>
                <img :src="genderGirl" alt />
              </span>
            </p>
          </div>
          <div class="avatar">
            <img :src=" profile ? '/api' + profile.avatarUrl: ''"/>
          </div>
        </div>
        <ul class="middle flex flex_col">
          <li class="flex_1 flex">
            <span class="item flex flex_al_center flex_ju_aroud">地区</span>
            <span class="content flex flex_1 flex_al_center">{{profile ? profile.area:''}}</span>
          </li>
          <li class="flex_1 flex">
            <span class="item flex flex_al_center flex_ju_aroud">神州号</span>
            <span class="content flex flex_1 flex_al_center">{{profile?profile.wxId:''}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    profile: Object,
    size: {
      default: "40px",
      type: String
    },
    position: {
      type: Array,
      default: ["left", 0]
    }
  },

  data() {
    return {
      genderBoy: require("@/assets/nav/men.png"),
      genderGirl: require("@/assets/nav/women.png"),
      show: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    getPosition() {
      var position = {};
      var index = this.position[1];
      var wrapper = this.$refs.wrapper;
      function getFrame(node) {
        if (node.className == "frFrame") {
          return node;
        }
        node = node.parentElement;
        return getFrame(node);
      }
      const fra = getFrame(wrapper);
      //frame的高度;
      const fraHeight = parseInt(window.getComputedStyle(fra, null).height);
      const scrollHeight = window.demoTop ? window.demoTop : 0;

      var li = fra.getElementsByTagName("li");//获取li集合
      var positionHeight = 0; //累加当前说有li之前的高度
      for (let i = 0; i < this.position[1]; i++) {
        positionHeight += parseInt(window.getComputedStyle(li[i], null).height) + 10 ;
      }
      const positionTop = positionHeight + this.y + 10 - scrollHeight;
      if (positionTop < fraHeight / 2) {
        //证明需要在top定位
        if (this.position[0] == "left") {
          return {
            left:  this.x + "px",
            top: this.y + "px"
          };
        } else {
          return {
            right: parseInt(this.size) - this.x + "px",
            top:   this.y  + "px"
          };
        }
      } else {
        if (this.position[0] == "left") {
          return {
            left:  this.x + "px",
            bottom:parseInt(this.size) - this.y + "px"
          };
        } else {
          return {
            right: parseInt(this.size) - this.x + "px",
            bottom:parseInt(this.size) - this.y + "px"
          };
        }
      }
    },
    showProfile(e) {
      //如果window.show是true,则表示已经打开了, 再点击需要关闭

      if (window.proxy) {
        //如果存在,则表示已经打开了, 需要关闭所有的

        window.proxy.open = false;
      } else {
        //表示window.show不存在,没有打开
        window.show = { open: true };
        this.show = true;
        this.x = e.offsetX;
        this.y = e.offsetY;
        document.body.onclick = () => {
          this.show = false;
          document.body.onclick = null;
          window.proxy = null;
        };
        //打开后, 创建window.proxy
        var that = this;
        window.proxy = new Proxy(window.show, {
          set(show, prop, value) {
            console.log(show, prop, value);
            that.show = false;
            window.proxy = null;
            return 1;
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  .profile {
    position: absolute;
    z-index: 10;
    @color: #999;
    margin: 0 auto;
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    background: white;
    .top {
      flex: 3;
      display: flex;

      .nickname {
        flex: 1;
        .name {
          font-size: 20px;
          vertical-align: bottom;
        }
        .gender {
          img {
            margin-left: 10px;
            width: 15px;
            height: 15px;
          }
        }
      }
      .introduction {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
      }
      .avatar {
        flex: 1;
        text-align: right;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid;
        }
      }
    }
    .middle {
      flex: 5;
      li {
        color: @color;
        font-size: 13px;
        .item {
          width: 25%;
        }
      }
    }
  }
}
</style>
