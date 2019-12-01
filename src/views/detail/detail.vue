<template>
  <div id="detail">
    <DetailNavBar class="datail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages" />
      <DetailBaseInfo :goodsInfo="goodsInfo" />
      <DatailShopInfo :shopInfo="shopInfo" />
      <datail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DatailParamInfo ref="params" :paramsInfo="paramsInfo" />
      <DataCommentInfo ref="comment" :commentInfo="commentInfo" />
      <GoodsList ref="recommend" :goods="recommend"/>
    </scroll>
    <DetaBottomBar @addCart="addToCart"/>
    <BackTop @click.native="backClick" v-show="isShowBack" />      <!-- 想在组件添加事件必须添加native属性 -->
    <!-- <Toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DatailShopInfo from './childComps/DatailShopInfo'
  import DatailGoodsInfo from './childComps/DatailGoodsInfo'
  import DatailParamInfo from './childComps/DatailParamInfo'
  import DataCommentInfo from './childComps/DataCommentInfo'
  import DetaBottomBar from './childComps/DetaBottomBar'

  import Scroll from 'components/common/bscroll/Bscroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/util'
  import {itemListenerMixin,backTopMixin} from 'common/mixin' 

  export default {
    name: 'detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DatailShopInfo,
      DatailGoodsInfo,
      DatailParamInfo,
      DataCommentInfo,
      DetaBottomBar,
      GoodsList
      // Toast
    },
    mixins: [itemListenerMixin,backTopMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        currentIndex: 0,
        message: '',
        show: false
      }
    },
    created(){
      // 保存传入的iid
      this.iid = this.$route.params.iid
      // 根据iid请求详情数据
      getDetail(this.iid).then( res => {
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services) 
        // 创建店铺信息
        this.shopInfo = new Shop(data.shopInfo)
        // 获取商品详情页信息
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    destroyed(){
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop + -44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop + -44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop + -54)
        this.themeTopYs.push(Number.MAX_VALUE);
      },
      titleClick(index){
        // console.log(this.$refs.scroll.scrollTo)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position){
        const positionY = -position.y
        const length = this.themeTopYs.length;
        // 第一种方法
        // for(let i=0; i<length; i++){
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        
        // 第二种方法 
        for(let i=0; i<length; i++){
          if(this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        this.isShowBack = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      addToCart(){
        const product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.realPrice;
        this.$store.dispatch('addCart', product).then(res => {
          // this.show = true;
          // this.message = "添加购物车成功";
          // setTimeout(() => {
          //   this.show = false;
          //   this.message  = ''
          // },1000)
          this.$toast.show('添加到购物车成功')
        })

      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 99;
    background: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
  .datail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }
</style>


