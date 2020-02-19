<template>
  <div class="write flex flex_col fontSize_13">
    <div class="content flex">
      <div class="left flex flex_al_center flex_ju_aroud">{{item}}</div>
      <div class="right flex_1 flex flex_al_left">
        <p>
          <input type="radio" id="boy" value="boy" v-model="gender" style="font-size:14px" />
          <label for="one">boy</label>
        </p>
        <p>
          <input type="radio" id="girl" value="girl" v-model="gender" />
          <label for="two">girl</label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: String
  },
  data() {
    return {
      gender: ""
    };
  },
  watch:{
    gender(val){
      this.$emit('setGender',val)
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.write {
  width: 90%;
  // background: yellow;
  .content {
    .left {
      width: 30%;
      text-align: center !important;
    }
    .right {
      p {
        width: 100px;
        display: flex;
        align-items: center;
    
        input {
          width: 15px;
          height: 15px;
        }
        label{
          margin-left: 5px;
        }
      }
    }
  }
  .err {
    color: red;
  }
}
</style>
