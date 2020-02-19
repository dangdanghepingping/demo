<template>
  <ul class="friendList">
    <li class="listWrapper" v-for="(item,i) in navList" :key="item.title">
      <p class="title nav" @click="changeHeight(i)">
        <span>{{item.title}}</span>
        <span class="icon" :style="{transform: 'scale(0.7,0.7) rotate(' + item.rotate+')'}">>></span>
      </p>
      <ul class="listContent" :style="{height: item.height}">
        <router-link
          class="item"
          v-for="child in item.children"
          tag="li"
          :to="child.linkTo"
          :key="child.linkTo"
        >
          <span>{{child.title}}</span>
        </router-link>
      </ul>
    </li>
    <slot></slot>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Avatar: () => import("@/components/Avatar")
  },
  data() {
    return {
      navList: [
        {
          title: "添加",
          height: "60px",
          rotate: "90deg",
          children: [
            {
              linkTo: "/friends/addNewFriend",
              title: "添加新朋友"
            },
            {
              linkTo: "/friends/joinNewGroup",
              title: "申请入群"
            }
          ]
        },
        {
          title: "创建",
          height: "30px",
          rotate: "90deg",
          children: [
            {
              linkTo: "/friends/createNewGroup",
              title: "创建新群"
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeBg() {
      //改变自身颜色背景; 把所有的背景原色都改成原来的色彩
    },
    rotateIcon(i) {
      this.navList[i].rotate =
        this.navList[i].height == "0px" ? "0deg" : "90deg";
    },
    changeHeight(i) {
      this.navList[i].height =
        this.navList[i].height == "0px"
          ? this.navList[i].children.length * 30 + "px"
          : "0px";
      this.rotateIcon(i);
    }
  },

  mounted() {
    // console.log(this.friends);
  }
};
</script>

<style scoped lang="less">
.friendList {
  .listWrapper {
    @padding: 10px;
    .title {
      padding: 5px 0;
      padding-left: @padding;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        font-size: 13px;
        margin-right: 20px;
        background: #bbb;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0px;
        padding-bottom: 2px;
        cursor: default;
        transform: scale(0.8);
        transition: all 0.5s;
      }

      &:hover {
        background: #4dd52b !important;
      }
      &:hover .icon {
        background: #4dd52b !important;
      }
    }
    .listContent {
      overflow: hidden;
      transition: all 0.5s;

      .item {
        padding: 5px 10px;
        box-sizing: border-box;
        display: flex;
        cursor: default;
        &:hover {
          background: #ccc;
        }
        span {
          display: inline-block;
          height: 20px;
          font-size: 13px;
          letter-spacing: 2px;
          line-height: 20px;
          padding-left: 10px;
        }
        .hasIcon {
          position: relative;
          i {
            position: absolute;
            height: 13px;
            width: 13px;
            border-radius: 50%;
            background: red;
            font-size: 10px;
            text-align: center;
            line-height: 13px;
            font-style: normal;
            color: white;
          }
        }
      }
      .router-link-exact-active {
        background: #bbb;
      }
    }
  }
}
</style>
