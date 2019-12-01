<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <CartList />
    <CartButtomTar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartButtomTar from './childComps/CartButtomTar'
  import {mapGetters} from "vuex"
  export default {
    name: "Cart",
    data(){
      return {
      }
    },
    components: {
      NavBar,
      CartList,
      CartButtomTar
    },
    computed: {
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters(['cartLength','cartList'])
    },
    created(){
      
    },
    mounted(){
      
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background: var(--color-tint);
    color: white;
  }
</style>