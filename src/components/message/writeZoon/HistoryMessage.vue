<template>
  <div class="historyMessage" ref="historyMessage">
    <div class="top flex flex_col">
      <div class="listerning flex_1 flex" @mousedown="drag($event)">
        <span
          class="name flex_1 flex flex_al_center flex_al_left fontSize_13"
        >{{currentListener.nickName}}</span>
        <span class="button flex">
          <!-- <span class="minfy flex_1 flex flex_al_center flex_ju_aroud">-</span> -->
          <span class="close flex_1 flex flex_al_center flex_ju_aroud" @click='cloth'>×</span>
        </span>
      </div>
      <div class="search flex_1">
        <search />
      </div>
      <div class="menu flex_1 flex flex_al_center flex_ju_aroud">
        <ul class="flex flex_ju_aroud">
          <li
            v-for="(item, index) in menu"
            :key="item"
            @click="changeMenu(index)"
            :style="{color: index == active ? 'rgb(62, 172, 34)' : 'black'}"
          >
            {{item}}
            <span
              :style="{background: index == active ? 'rgb(62, 172, 34)' : 'transparent'}"
            ></span>
          </li>
        </ul>
      </div>
    </div>

    <SliderFrame>
      <div>
{{currentConversition}}
      </div>
    </SliderFrame>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Search: () => import("@/components/Search.vue"),
    SliderFrame: () => import("@/components/SliderFrame.vue")
  },
  data() {
    return {
      menu: ["全部", "文件", "图片", "视频"],
      active: 0
    };
  },
  computed: {
    ...mapState("message", ["currentListener"]),
    ...mapGetters('message',['currentConversition'])
  },
  methods: {
    cloth(){
      this.$emit('cloth')
    },
    changeIndex(i) {
      this.active = i;
    },
    changeMenu(index) {
      this.changeIndex(index);
    },
    drag(e) {
      var offsetX = e.offsetX; //
      var offsetY = e.offsetY;
      var bodyStyle = getComputedStyle(document.body);
      var maxWidth = parseInt(bodyStyle.width);
      var maxHeight = parseInt(bodyStyle.height)
      const historyMessage = this.$refs.historyMessage;
      document.onmousemove = function(e1) {
        var x1 = e1.clientX < 0 ? 0 : (e1.clientX > maxWidth ? maxWidth : e1.clientX );//防止拖出边界拖不回来了
        var y1 = e1.clientY < 0 ? 0 : (e.clientY > maxHeight ? maxHeight : e1.clientY);
        historyMessage.style.left = x1 - offsetX + "px";
        historyMessage.style.top = y1 - offsetY + "px";
      };
      document.onmouseup = function() {
        document.onmousemove = null;
      };
    }
  },
  //获取历史记录
created(){
  
}
};
</script>

<style scoped lang="less">
span {
  cursor: default;
}
.historyMessage {
  width: 550px;
  height: 95%;
  position: fixed;
  top: 10px;
  left: 320px;
  border: 1px solid #ddd;
  background: #eee;
  .top {
    height: 140px;
    border-bottom: 1px solid #ccc;
    .listerning {
      .name {
        height: 25px;
        padding-left: 10px;
        color: #999;
      }
      .button {
        width: 35px;
        height: 25px;
        span {
          padding: 5px 0;
          box-sizing: content-box;
          cursor: pointer;
        }
        span:first-child {
          &:hover {
            background: #ccc;
          }
        }
        span:last-child {
          &:hover {
            background: red;
            color: white;
          }
        }
      }
    }
    .search {
      padding: 0 30px;
    }
    .menu {
      ul {
        width: 65%;
       min-width: 250px;
       
        li {
          cursor: pointer;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          height: 30px;
          width: 20px;
          font-size: 16px;
          span {
            width: 20px;
            height: 2px;
            // background: green;
          }
        }
      }
    }
  }
}
</style>
