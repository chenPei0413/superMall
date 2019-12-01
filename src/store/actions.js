export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
      // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      // if(oldProduct){
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){   // 数量 +1 
        context.commit('addCounter', oldProduct)
        resolve("数量 +1 ")
      }else{            // 添加新商品
        payload.count = 1;
        payload.checked = true;
        context.commit('addToCart', payload)
        // context.state.cartList.push(payload)
        resolve("添加新商品 ")
      }
    })
  }
}