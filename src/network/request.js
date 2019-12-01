// 封装一个网络请求的方法
import axios from 'axios'
// 第一种方式
// export function request(config, success, failure){
//   const instance = axios.create({
//     baseURL: 'http://106.54.54.237:8000/api/v1',
//     timeout: 5000
//   })

//   instance(config).then(res => {
//     success(res)
//   }).catch(err => {
//     failure(err)
//   })
// }

// 第二种方式
export function request(config){
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: "http://106.54.54.237:8000/api/v1" ? "http://123.207.32.32:8000/api/v2" : "",
      timeout: 5000
    })
    // axios拦截器
    // instance.interceptors.request.use(res => {
    //   console.log("请求成功")
    //   // console.log(res)
    //   return res          // 因为请求进行了拦截，所以需要返回出去
    // }, err => {
    //   console.log(err)
    // })

    instance.interceptors.response.use(res => {
      console.log("响应成功");
      return res.data
    },err => {
      console.log(err)
    })
    
    return instance(config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
  