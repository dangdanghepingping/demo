<template>
  <div class="addNewFriend">
    <ul class="wrapper">
      <li class="item">
        <div class="left">
          <img src alt />
          <span class="nickname">tom</span>
          <span>想加入你的群:</span>
          <span>旅行天地</span>
        </div>
        <button class="right" @click="agree">同意</button>
         <button class="right" @click="disagree">拒绝</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      wxId: ""
    };
  },
  methods: {
    agree() {
      //同意请求;
    },
    disagree(){

    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
.addNewFriend {
  .wrapper {
    padding: 5px;
    li {
      display: flex;
      .left {
        padding: 5px 20px;
        font-size: 13px;
        flex:1;
        background: #ccc;
         &:hover{
          background: #bbb!important;
        }
      }
      button {
        margin:0 10px;
        padding: 5px 20px;
        font-size: 13px;
        border:none;
        border-radius: 3px;
        &:hover{
          background: #4dd52b!important;
        }
      }
    }
  }
}
</style>