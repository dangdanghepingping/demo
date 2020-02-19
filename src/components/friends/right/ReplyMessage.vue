<template>
  <div class="reply">
    <p class="item fontSize_12" v-if='replyMessage.length == 0'>
      暂时没有新消息!
    </p>
    <p v-else class="item fontSize_12" v-for='item in replyMessage' :key="item.id">
     <span class="name">{{item.responseWxId}}</span> 
     <span class="content"> {{item.accept == 1 ? '同意':'拒绝'}}了你的好友请求 </span>  

    </p>
  </div>
</template>

<script>
 import { mapState } from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed:{
...mapState('friend',['replyMessage'])
  },
  methods: {

  },


}
</script>

<style scoped lang="less">
.reply{
.item{
  padding: 5px 10px;
  background: #ddd;
  margin: 5px 20px;

}
}


</style>
