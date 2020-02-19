<template>
  <div class="MyNewFriends">
    <ul class="wrapper" v-if="friendRequestMessage.length == 0">
      <li class="item">没有新消息</li>
    </ul>

    <ul class="wrapper" v-else>
      <SliderFrame>
        <li
          v-for="(message,i) in friendRequestMessage"
          :key="message.id"
          class="item flex flex_col"
        >
          <div class="top flex_1 flex flex_col">
            <p class="flex_1">
              <span class="nickname">{{message.requesterWxId}}</span>
              <span v-if='message.groupname'>想就如你的群: {{message.groupname}}</span>
              <span v-else>想和你交朋友</span>
            </p>
            <p class="flex_1">
              <span>留言:</span>
              <span>{{message.words}}</span>
            </p>
          </div>
          <div class="bottom flex_1">
            <p>
              <button class="right btn" @click="agree(message.id,i)">同意</button>
              <button class="right btn" @click="disagree(message.id,i)">拒绝</button>
            </p>
          </div>
        </li>
      </SliderFrame>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  components: {
     SliderFrame: () => import("@/components/SliderFrame.vue"),
  },
  props: {},
  data() {
    return {
      wxId: ""
    };
  },
  methods: {
    ...mapMutations("friend", ["spliceFriendRequestMessage"]),
    clickSpliceFriendRequestMessage(index) {
      this.spliceFriendRequestMessage(index);
    },
    dealMakeFriendRequest(messageId,flag) {

      socket.emit('dealMakeFriendRequest',{messageId,flag});



    },
    agree(messageId,index) {
      //这几个应该是保证全部完成的,而不是有的可以做完有的未做;用数据库的语言叫做事务;
      //去数据库里改写sent状态
      this.dealMakeFriendRequest(messageId,true);
      //同意请求后增加数据库里user_relationship表的信息



      // 保证前两条吧,后面的出意外不影响数据的正确性
      //通知对方socket请求, 已经同意, 可以聊天了
      //弹出提示框 同意添加成功,已经是好友了
      //好友名单里要添加入这个人的名字
         this.clickSpliceFriendRequestMessage(index)
    },
    disagree(messageId,index) {
      this.dealMakeFriendRequest(messageId,false);
     this.clickSpliceFriendRequestMessage(index)
    }
  },
  computed: {
    ...mapState("friend", ["friendRequestMessage"]) //requesterWxId, words,time
  },
  watch: {}
};
</script>

<style scoped lang="less">
.MyNewFriends {
  height: 100%;
  width: 100%;
  .wrapper {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    font-size: 12px;
    li {
      border-bottom: 1px solid #ccc;
      padding: 5px;
      .top {
        .nickname {
          font-size: 13px;
          font-weight: bolder;
        }
        span:first-child {
          margin-right: 7px;
        }
      }
      .bottom {
        text-align: right;
        p {
          display: inline-block;
          button {
            padding: 5px 10px;
            margin-right: 10px;
            &:nth-child(2n):hover {
              background: red !important;
            }
          }
        }
      }
    }
  }
}
</style>