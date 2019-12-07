<template>
  <div id="detail">
    <detail-nav-bar />

    <scroll class="container" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="good" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgload="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComponents/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from 'components/content/goods/GoodsList';

import { getDetail, GoodsInfo, Shop, GoodsParam,getRecommend } from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";


export default {
  name: "Detail",
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      good: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],

    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
  created() {
    // 保存iid
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.good = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 保存商品详情
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出评论信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    });

    // 请求推荐数据
    getRecommend().then(res=>{
      console.log(res);
      this.recommends=res.data.list
    })
  },
  mounted(){
  },
  destroyed(){
    this.$EventBus.$off('itemImgLoad',this.itemListener);

  }
};
</script>
<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 11;
  background-color: #fff;
}
.container {
  /* calc在chrome中使用需要添加前缀 */
  height: -webkit-calc(100% - 44px);
  overflow: hidden;
}
</style>