import originJSONP from 'jsonp'

export default function jsonp(url,data,options){
  url+=(url.indexOf('?')?'?':'&')+ params(data)
  return new Promise((resolve, reject)=>{
    // 这里其实就是封装了script 发送请求
    originJSONP(url,options,(err,data)=>{
      if(!err){
        // 如果成功则 resolve data
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

// 把传过来的data 做拼接  传过来的data一般为对象的形式
function params(data){
  // 定义一个空字符串
  let url=''
  for(var key in data){
    // 三木 如果不为空 则反悔data中的数据 否则返回空字符串
    let value=data[key] !== undefined ? data[key] : '';
    url+=`&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
