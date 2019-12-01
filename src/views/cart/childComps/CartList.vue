<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem v-for="(item, index) in cartList" :key="index" :product="item" />
    </Scroll>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import Scroll from 'components/common/bscroll/Bscroll'
  import CartListItem from './CartListItem'

  export default {
    name: 'CartList',
    components:{
      Scroll,
      CartListItem
    },
    computed: {
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters(['cartLength','cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }

</style>