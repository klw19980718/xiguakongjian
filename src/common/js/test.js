// let aaa='我是aaa';
// let bbb={
//     bbb:"我是bbb",
//     ccc(){
//         console.log(this.bbb+'函数')
//     }
// }
// let ddd=[
//     1,2,3,4
// ]
// export default {aaa,bbb,ddd}

// export default的特性
// 很多都差不多
// export default只能默认导出一个
// 引入时可以改名  
// 
// --------------------premise---------------------------
// export default function test(){
//     // 默认的两个参数 
//     // resole
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('倒计时结束')
//             resolve()
//         },1000)
//     })
// }
export class test{
    constructor(a,b){
        this.a=a,
        this.b=b
    }
}
