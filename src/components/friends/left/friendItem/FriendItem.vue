<template>
  <ul class="friendList">
    <!-- {{friendsListByOrder}} -->
    
    <li class="listWrapper" v-for="item in friendsListByOrder" :key="item.title">
      <p class="title">{{item.title}}</p>
      <ul class="listContent">
        <router-link
          class="item"
          v-for="item1 in item.items"
          :key="item1.id"
          tag="li"
          :to="'/friends/detail/'+item1.wxId"
        >
          <Avatar :imgSrc="'/api'+ item1.avatarUrl"></Avatar>
          <span>{{item1.nickName}}</span>
        </router-link>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState,mapGetters, mapActions } from "vuex";
import pinyin from "pinyin";
export default {
  components: {
    Avatar: () => import("@/components/Avatar")
  },
  data() {
    return {
      navList: [
        {
          title: "添加",
          children: [
            {
              linkTo: "/friends/addNewFriend"
            }
          ]
        }
      ],
   
    };
  },
  methods: {
    
    changeBg() {
      //改变自身颜色背景; 把所有的背景原色都改成原来的色彩
    },
    dealBypinyin(arr) {
      for (var i = 0; i < arr.length; i++) {//把friendList的每个元素添加首字母
        const firstChar = arr[i].nickName[0];
        var letter = pinyin(firstChar, {
          style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
          heteronym: true
        });
       
        arr[i].letter = letter[0][0].toUpperCase();
      };
      //按照首字母分类出相应的数组
      var temp = []
      for(let j = 0; j < arr.length; j++){
        temp.push(arr[j].letter)
      }
     
      var set = new Set(temp);
      var tempArr = [...set];
      var result = [];
      for(let k = 0; k < tempArr.length; k++){
        result.push({title:tempArr[k]})
      };
      for(let l = 0; l < arr.length; l++){
        let index = result.findIndex(ele=> ele.title == arr[l].letter);
        result[index].items = result[index].items ? result[index].items : [];
        result[index].items.push(arr[l])
      }
   
      return result;

      

    }
  },
  computed: {
    ...mapState("friend", ["friendRequestMessage"]),
    
    friendsListByOrder() {
      const friendsList = this.$store.state.friend.friendsList;
      
      return this.dealBypinyin(friendsList);
      //按照nickName把这个数组处理下,生成字母表下的数组
    }
  },
  created() {
   
  }
};
</script>

<style scoped lang="less">
.friendList {
  .listWrapper {
    @padding: 10px;
    .title {
      padding-top: @padding;
      padding-left: @padding;
      box-sizing: border-box;
    }
    .listContent {
      .item {
        padding: @padding;
        box-sizing: border-box;
        display: flex;
        &:hover {
          background: #ccc;
        }
        span {
          display: inline-block;
          height: 35px;
          font-size: 14px;
          line-height: 35px;
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
