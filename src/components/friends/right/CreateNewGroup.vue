<template>
  <div class="addNewFriend">
    <div class="wrapper">
      <div class="grid">
        <div class="left" >群名称</div>
        <div class="right">
          <input type="text" v-model="wxId" placeholder="请输入想要创建的群名称"/>
        </div>
      </div>
      <button @click='createNewGroup'>创建新群</button>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      wxId:''
    };
  },
  methods: {
    createNewGroup(){
      const groupName = this.wxId.trim();
      //提交建群请求;
      

    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
.addNewFriend {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .wrapper {
    width: 500px;
    height: 300px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    .grid {
      display: flex;
      height: 80px;
      .left {
        text-align: right;
        line-height: 80px;
        width: 150px;
        background: #eee!important;
      }
      .right {
        text-align: center;
        line-height: 80px;
        flex: 1;
        
        input{
          padding: 0 15px;
          display: inline-block;
          height: 25px;
         width: 300px;
         margin-left: 20px;
        }
      }
    }
    button{
      margin-top: 30px;
      width:150px;
      padding:15px;
      background: #cccccc!important;
      border-radius: 5px;
      outline: none;
      border: none;
      &:hover{
        background: #4dd52b!important;
      }
    }
  
  }
}
</style>
