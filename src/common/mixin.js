import { debounce } from "common/utils";
export const itemListenerMixin = {
  data(){
    return {
      itemListener:null

    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemListener = () => {
      refresh();
    };
    this.$EventBus.$on("itemImageLoad", this.itemListener);
    // console.log("我是混入我自豪");
    
  }
}