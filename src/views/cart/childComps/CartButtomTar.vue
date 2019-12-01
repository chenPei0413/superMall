<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckBotton :isChecked="isSelectAll" class="check-button" @click.native="checkClilck" />
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckBotton from "components/content/checkBotton/CheckBotton"
  import {mapGetters} from "vuex"

  export default {
    name: 'CartButtomTar',
    components: {
      CheckBotton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length 
      },
      isSelectAll(){
        if(this.cartList.length === 0) return false
        // 使用 filter
        // return !(this.cartList.filter(item => !item.checked).length)

        // 使用find
        // return !(this.cartList.find(item => !item.checked))

        // 普通遍历
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClilck(){
        // if(this.isSelectAll){
        //   this.cartList.forEach(item => item.checked = false)
        // }else{
        //   this.cartList.forEach(item => item.checked = true)
        // }
        let isSelectAll = this.isSelectAll
        this.cartList.forEach(item => item.checked = !isSelectAll)
      },
      calcClick(){
        this.cartList.forEach(item => {
          if(item.checked){
            this.$toast.show("购买成功")
          }else{
            this.$toast.show("请选择购买的商品")
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #eee
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px
  }
  .price{
    margin-left: 20px;
    flex: 1
  }
  .calculate{
    width: 90px;
    color: white;
    background: var(--color-tint);
    text-align: center
  }
</style>