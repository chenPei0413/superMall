<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles = "['流行','新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="navTab" v-show='isTabFixed'/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="pullingUp">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <RecommendView :recommends = "recommends" />
      <FeatureView />
      <TabControl :titles = "['流行','新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <GoodsList :goods="goods[currentType].list"/>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBack" />      <!-- 想在组件添加事件必须添加native属性 -->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/bscroll/Bscroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/util'
  import {itemListenerMixin} from 'common/mixin' 

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      GoodsList,
      TabControl,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]}
        },
        currentType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0

      }
    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 500)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // // this.$bus.$on('itemImageLoad', () => {
      // //   refresh()
      // // })
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        this.isShowBack = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      pullingUp(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad(){
        // 所有的组件都有一个属性$el,用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1 
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .home-nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: var(--color-tint);
    color: white;
    font-size: 18px;
  }
  .navTab{
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
</style>