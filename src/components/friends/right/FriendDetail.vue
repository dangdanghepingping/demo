<template>
  <div class="detail">
    <div class="top">
      <div class="nickname">
        <p>
          <span class="name">{{friendsList.find(e=>e.wxId == $route.params.id) ? friendsList.find(e=>e.wxId == $route.params.id).nickName:''}}</span>
          <span class="gender">
            <img v-if="friendsList.find(e=>e.wxId == $route.params.id) ? friendsList.find(e=>e.wxId == $route.params.id).gender == 'girl':''" :src="woman" alt />
            <img v-else :src="man" alt />
          </span>
        </p>
        <p class="introduction">{{friendsList.find(e=>e.wxId == $route.params.id) ? friendsList.find(e=>e.wxId == $route.params.id).introduction:''}}</p>
      </div>
      <div class="avatar">
        <img :src="friendsList.find(e=>e.wxId == $route.params.id) ? '/api'+ friendsList.find(e=>e.wxId == $route.params.id).avatarUrl:''" />
      </div>
    </div>
    <ul class="middle">
      <li class="title">
        <p>
          <span>备注</span>
        </p>
        <p>
          <span>地区</span>
        </p>
        <p>
          <span>神州号</span>
        </p>
        <p>
          <span>来源</span>
        </p>
      </li>
      <li class="content">
        <content>
          <input placeholder="点击添加备注" />
        </content>
        <content>
          <span>{{friendsList.find(e=>e.wxId == $route.params.id) ? friendsList.find(e=>e.wxId == $route.params.id).area:''}}</span>
        </content>
        <content>
          <span>{{friendsList.find(e=>e.wxId == $route.params.id) ? friendsList.find(e=>e.wxId == $route.params.id).wxId:''}}</span>
        </content>
        <content>
          <span>通过群聊添加</span>
        </content>
      </li>
    </ul>
    <div class="bottom">
      <span @click="sendMessage">发送消息</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      man: require("@/assets/nav/men.png"),
      woman: require("@/assets/nav/women.png"),
    
    };
  },
  computed: {
      ...mapState('friend',['friendsList'])

  },
  methods: {
    sendMessage() {
      this.$router.push("/message/talking/" + this.$route.params.id);
    }
  },
   
  watch: {
    // '$route'(to, from) {
    //   if (to.name == "friendDetail") {
    //    this.id = to.params.id;
    //    console.log('this.id',this.id);
    //   }
    // }
  },
  created() {
    // console.log(this.id);
    // this.id = this.$route.params.id;
   
  }
};
</script>

<style scoped lang="less">
.detail {
  @color: #999;
  margin: 0 auto;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
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
        widows: 60px;
        height: 60px;
        border: 1px solid;
      }
    }
  }
  .middle {
    flex: 5;
    padding: 20px 0 30px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    .title {
      flex: 1;
      display: flex;
      flex-direction: column;
      p {
        flex: 1;
        font-size: 14px;
        color: @color;
        line-height: 100%;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 100%;
          text-align-last: justify;
        }
      }
    }
    .content {
      flex: 6;
      display: flex;
      flex-direction: column;
      content {
        flex: 1;
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 14px;
        padding-left: 30px;
        input {
          background: transparent;
          border: 1px solid transparent;
          padding: 2px 10px;
          padding-left: 0;

          display: inline-block;

          &:hover {
            border: 1px solid #aaaaaa;
            background: #bbbbbb;
          }
        }
      }
    }
  }
  .bottom {
    flex: 2;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    span {
      padding: 10px 40px;
      font-size: 14px;
      color: #fff;
      background: rgb(2, 151, 2);
      &:hover {
        background: green;
      }
    }
  }
}
</style>
