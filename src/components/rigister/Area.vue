<template>
  <div class="write flex flex_col fontSize_13">
    <div class="content flex">
      <div class="left flex flex_al_center flex_ju_aroud">{{item}}</div>
      <div class="right flex_1 flex_col flex flex_al_left flex_ju_aroud">
        <select v-model="province" >
          <option disabled value>省/直辖市</option>
          <option v-for="item in provinces()" :key="item.id">{{item.name}}</option>
        </select>

        <select v-model="city" >
          <option disabled value>城市</option>
          <option v-for="item1 in citys()" :key="item1.id">{{item1.name}}</option>
        </select>
        <select v-model="area" v-show='isProvince'>
          <option disabled value>区/县</option>
          <option v-for="item2 in areas()" :key="item2.id">{{item2.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { getProvinces, getCitys, getAreas } from "province-city-area";

export default {
  props: {
    item: String
  },
  data() {
    return {

      province: "",
      provinceId: "",
      city: "",
      cityId: "",
      area: "",

      isProvince: true,
      spcialCitys:['北京','上海','天津','重庆','香港','澳门'],
      
      resultArea: ''
    };
  },
  methods: {
    provinces: function() {
      return getProvinces([{ id: "id", name: "name" }]);
    },
    citys: function() {
      return getCitys(this.provinceId);
    },
    areas: function() {
      return getAreas(this.cityId);
    }
  },
  watch: {
    province: function(val) {
      var provinces = this.provinces();
      var index = this.provinces().findIndex(ele => ele.name == this.province);
      this.provinceId = provinces[index].id;
    
      if(this.spcialCitys.find((ele)=> ele == val)){
        this.isProvince = false;
      }else{
         this.isProvince = true;
      }
        this.$emit('setProvince',this.province)
    },
    city: function() {
      var citys = this.citys();
      var index = citys.findIndex(ele => ele.name == this.city);
      this.cityId = citys[index].id;
      this.$emit('setCity',this.city)
    },
    area:function(){
     this.$emit('setArea',this.area)
    }
    
  }
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

      select {
        font-size: 12px;
        width:60%
      }
    }
  }
  .err {
    color: red;
  }
}
</style>
