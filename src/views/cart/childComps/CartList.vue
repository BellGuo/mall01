<template>
  <div class="cart-list">
    <scroll class="container" ref="scroll">
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :key="index" 
      :product="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";


import { mapGetters } from "vuex";

export default {
  name: "CartList",
  props: {},
  data() {
    return {};
  },

  components: {
    Scroll,
    CartListItem
  },

  computed: {
    ...mapGetters(["cartList"])
  },
  activated (){ 
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
.cart-list{
   height: -webkit-calc(100% - 44px - 49px - 40px);

}
.container {
  height: 100%;
  overflow: hidden;
}

</style>