<template>
  <div class="imageBlock">
    <ul class="imgWrapper">
      <li v-for="item in currentImgSrc" :key="item.id" @click.stop="checkEmoji(item)">
        <img :src="item"  />
      </li>
    </ul>
  </div>
</template>

<script>
import obj from "../../../data/emoji-data";

export default {
  //生成img 插入block,
  props: ["emojiId"],
  watch: {
    emojiId(c, p) {
      //如果c存在, 重新赋值currentImageTags,返回, 否则像imgtagarr里添加真正的元素;
      // console.log(c);
      if (this.ImageTagsArr[c] == undefined) {
        this.ImageTagsArr[c] = this.genetateImgSrc(c);
        this.currentImgSrc = this.ImageTagsArr[c];
      } else {
        this.currentImgSrc = this.ImageTagsArr[c];
      }
    }
  },

  data() {
    return {
      currentImgSrc: [],
      ImageTagsArr: new Array(5)
    };
  },
  methods: {
    checkEmoji(src) {
      //告诉父级的父级, 隐藏这个表情弹窗
      this.$emit("disppearEmoji",src);
    },
    genetateImgSrc(id) {
      //data是一个json对象;
      var result = [];
      var temp = Object.values(obj)[id]; //{:alien:: "alien.png"}
      var imgDataArr = Object.values(temp); //["bowtie.png", "smile.png"];
      imgDataArr.forEach(ele => {
        result.push("/emoji/" + ele);
      });
      return result;
    }
  }
};
</script>

<style scoped>
.imgWrapper {
  display: flex;
  flex-wrap: wrap;
}
.imgWrapper >>> li {
  width: 6.666%;
  height: 6.666%;
}
.imgWrapper >>> li img {
  width:100%;
  height: 100%;
  padding: 3px;
  box-sizing: border-box;
}
.imgWrapper >>> li img:hover {
  background: #ccc;
}
</style>
