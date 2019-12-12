<template>
  <div class="bottom-bar">
    <div class="check-container">
      <check-button class="check-button" />
      <span>全选</span>
    </div>
    <div class="total-price">合计:{{totalPrice}}</div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  props: {},
  data() {
    return {};
  },

  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue*1+ item.price * item.count).toFixed(2);
          }, 0)
      );
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  line-height: 40px;
  height: 40px;

  background-color: #eee;
}
.check-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price{
  margin-left: 10px;
  flex: 1;
}
.calculate{
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>