<template>
  <div class="welcome">
    <div class="img">
      <img class="welcomeImg" :src="imgSrc" alt='aaa' />
      <img class="adWord" src="../assets/ad_word.png" alt="">
      <ul class="btn1">
        <li>
          <router-link tag='span' to='/login'>登录</router-link>
        </li>
        <!-- <button @click="Alert">dianjia</button> -->
        <li>
         <router-link tag='span' to='/register'>注册</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("@/assets/timg.jpg"),
      msg:'demo'
    };
  },
  methods: {
    // Alert() {
    //   //  使用直之前绑定到原型上的方法
    //   this.$message({
    //     message: "你今天开心吗?",
    //     type:"warn"
    //   });
    // },
    // isOK() {
    //   console.log("输出帮助");
    // }
  }
};
</script>

<style scoped lang="less">
.welcome {
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  background: radial-gradient(circle at 50% 50%, #1a2127, rgb(7, 7, 7));
  font-family: '微软雅黑';

  .img {
    height: 100%;
    position: relative;
    display: inline-block;
    .welcomeImg {
      height: 100%;

  
    }
    .adWord{
      position: absolute;
          top: 50%;
      left: 50%;
      transform: translatex(-50%) translateY(-50%);
    }
    .btn1 {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      color: white;
      width: 100%;
      display: flex;
      justify-content: space-between;

      box-sizing: border-box;
      margin-bottom: 10vh;
      li {
        flex: 1;
        text-align: center;
        font-size: 14px;
        background: transparent!important;
        span {
          display: inline-block;
          width: 30%;
          padding: 3vh 4vh;
          background: #fff!important;
          color: #000;
          border-radius: 5px;
          letter-spacing: 3px;
          cursor: default;
          &:hover{
          background: #4DD52B!important;
          color: #fff;
        }
        }
     
      }
    }
  }
}
</style>
