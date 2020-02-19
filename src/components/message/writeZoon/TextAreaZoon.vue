<template>
  <div class="textAreaZoon">
    <!-- 为了能够插入img,这里必须改成div,而不是只能显示文本的textarea -->
    <!-- 至于v-model, 就用最笨的change实现就可以 -->
    <!-- <textarea class="textarea"
      v-model="message"
      :style="{background:color}"
      @input="input($event)"
      ref="textarea"
      @focus="focus"
      @blur="blur"
    ></textarea>-->
    <div
      class="textarea"
      @contextmenu="chechFileClick($event)"
      ref="textarea"
      @blur="getBlur"
      @focus="focus"
      contenteditable="true"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import fontObj from "@/assets/iconfont/iconfont.js";
export default {
  props: ["emoj", "file"],
  data() {
    return {
      height: 22,
      minHeight: 100,
      maxHeight: 300,
      conversition: "",
      color: "#eee",
      message: "",
      range: undefined,
      selection: undefined
    };
  },
  watch: {
    file(current, previous) {
      if (current) {
        window.file = current;
        var appendFile = document.getElementById("appendFile");
        if (appendFile) {
          appendFile.parentNode.removeChild(appendFile);
        }
        var fontArr = fontObj.glyphs;
        const nameArr = current.name.split(".");
        const lastName = nameArr[nameArr.length - 1];
        const temp = fontArr.find(ele => ele.type == lastName);
        const spanContent = temp
          ? temp.unicode
          : fontArr.find(ele => ele.type == "undefind").unicode;

        //1,获取文件相关信息, 并根据文件后缀名,选择文件图片,
        //2,创建div, 用来显示已添加的信息, 并且将他插入.到输入区.
        var div = document.createElement("div");

        div.setAttribute("id", "appendFile");
        div.setAttribute("class", "innerFile");
        div.setAttribute("contenteditable", "false");
        div.style.border = "0.5px solid #888";
        div.style.background = "#eee";
        div.style.boxSizing = "border-box";
        div.style.padding = "5px";
        div.style.display = "inline-block";
        //不是图片
        if (!/(.png)|(.jpg)|(.jpeg)$/.test(current.name)) {
          div.style.height = "50px";
          div.style.width = "300px";
          div.innerHTML = `
          <p class='innerFile' style='cursor: default;width:50px;height:40px; float:left; display: flex;justify-content: space-around;align-items: center'>  
              <span class="iconfont innerFile" style='cursor: default;display:inline-block;font-size:40px;color:red'>&#x${spanContent};</span></p>
          <p class='innerFile' style='float:left;cursor: default;display: flex;flex-direction: column; font-size:12px'>
            <span class='innerFile' style='cursor: default;flex:1'>${current.name}</span>
            <span class='innerFile' style='cursor: default;flex:1' >${current.size}</span>
          </p>
          `;
          this.$refs.textarea.appendChild(div);
          //  至于为什么这里需要加个span,否则光标会靠上, 我不知道
          this.$refs.textarea.innerHTML =
            this.$refs.textarea.innerHTML + "<span></span>";
        } else {
          //整成图片
          var reader = new FileReader();
          var img = new Image();
          reader.addEventListener("load", () => {
            img.src = reader.result;
            div.appendChild(img);
            this.$refs.textarea.appendChild(div);
            this.$refs.textarea.innerHTML =
              this.$refs.textarea.innerHTML + "<span></span>";
          });
          reader.readAsDataURL(current.file);
        }
      }
    },
    emoj() {
      if (this.emoj) {
        const img = new Image();
        img.src = this.emoj.src;
        img.style.width = "20px";
        img.style.margin = "0 2px";
        if (this.range) {
          //如果有光标选择,就在光标选择的地方, 先删除选择的, 再在指定位置插入
          this.range.deleteContents();
          this.range.insertNode(img);
        } else {
          this.$refs.textarea.appendChild(img); //没有光标, 就直接加上
          this.range = document.createRange(img); //创建range对象
        }
        this.range.setStartAfter(img); //移动光标位置到新插入的图片之后
      }
    }
  },
  methods: {
    ...mapMutations("message", ["setStyle", "setWriteMessage"]),
    chechFileClick(e) {
      // e.preventDefault();
      const target = e.target;
      if (target.className.split(" ").includes("innerFile")) {
        //产生菜单
        var div = document.getElementById("appendFile");
        var menu = document.getElementById("menu");
        if (menu) {
          menu.style.left = e.layerX + "px";
          menu.style.top = e.layerY + "px";
        } else {
          window.file = this.file;
          menu = document.createElement("ul");
          menu.setAttribute("id", "menu");
          menu.style.position = "absolute";
          menu.style.zIndex = "99";
          menu.style.left = e.layerX + "px";
          menu.style.top = e.layerY + "px";
          menu.style.border = "1px solid #999";
          menu.innerHTML = `
            <a class='itemHover' :hover {background:#ccc} style='display:block;text-align: center;font-size:12px;padding:3px 5px;background:white'
            onclick='var file = document.getElementById("appendFile") ;file.parentNode.removeChild(file)'>
            删除
            </a>
             <a class='itemHover' :hover {background:#ccc} style='display:block;text-align: center;font-size:12px;padding:3px 5px;background:white'
            onclick='console.log(window.file)'>
            复制
            </a>
        `;
          div.appendChild(menu);
          document.body.onclick = function() {
            menu.parentNode.removeChild(menu);
            document.body.onclick = null;
          };
        }
      }
    },
    getBlur() {
      this.color = "#eee";
      this.setStyle("blur");
      this.selection = window.getSelection();
      this.range = this.selection.getRangeAt(0);
    },
    focus() {
      this.color = "white";
      this.setStyle("focus");
    },
    input(e) {
      this.setWriteMessage(this.message);
      this.changHeight();
    },
    clearMessage() {
      this.$refs.textarea.innerHTML = "";
    },
    resetHeight() {
      this.$refs.textarea.style.height = "80px";
    }
  }
};
</script>

<style scoped lang="less">
.itemHover {
  display: block;
}
.textAreaZoon {
  width: 100%;

  .textarea {
    overflow-y: hidden;
    outline: none;
    border: none;
    width: 100%;
    // background: #fff!important;
    font-size: 14px;
    line-height: 18px;
    font-family: "微软雅黑";
    min-height: 80px;
    word-break: break-all;

    // &::after {
    //   content: "";
    //   width: 1000px;
    //   height: 50px;
    //   background: red;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
