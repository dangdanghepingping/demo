<template>
  <div class="detail">
    <div class="top">
      <div class="nickname">
        <p>
          <span class="name">{{profile.nickName}}</span>
          <span class="gender" v-if="profile.gender == 'boy'">
            <img :src="genderBoy" alt />
          </span>
          <span class="gender" v-else>
            <img :src="genderGirl" alt />
          </span>
        </p>
      </div>
      <div class="avatar">
        <img :src="'/api'+profile.avatarUrl" />
      </div>
    </div>
    <ul class="middle flex flex_col">
      <li class="flex_1 flex">
        <span class="item flex flex_al_center flex_ju_aroud">地区</span>
        <span class="content flex flex_1 flex_al_center">{{profile.area}}</span>
      </li>
      <li class="flex_1 flex">
        <span class="item flex flex_al_center flex_ju_aroud">神州号</span>
        <span class="content flex flex_1 flex_al_center">{{profile.wxId}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  },
  data() {
    return {
      genderBoy: require("@/assets/nav/men.png"),
      genderGirl: require("@/assets/nav/women.png")
    };
  },

  methods: {}
   
};
</script>

<style scoped lang="less">
.detail {
  @color: #999;
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
    li {
      color: @color;
      font-size: 12px;
      .item {
        width: 30%;
      }
    }
  }
}
</style>
