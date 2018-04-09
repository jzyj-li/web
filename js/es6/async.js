/*
*
* async 函数 generator 函数的语法糖 用来执行异步操作
* 返回一个promise对象
* */
function timeOut(s) {
    return new Promise((reslove) => {
        setTimeout(() => {
           reslove(console.log('我是异步'))
        }, s)
    })
}

async function asyncPrint(value, s) {
    await timeOut(s);
    console.log(value);
}

//asyncPrint('我是同步', 1000)

// async 和 awit 共同使用，awit 必须放在async函数中
/*
* awit 命令后面跟一个promise对象，如果不是会转成一个立即reslove的promise对象
*
* */
async function f() {
    return await 213
}
// f().then(res => {
//     console.log(res)
// })

async function s(){
     await Promise.reject('出错了')
}
// s().catch(err => {
//     console.log(err)
// })

// 只要一个await语句后面的promise变为reject,整个async函数都会中断执行。
async function d() {
    await Promise.reject('错哦了');
    return await Promise.reslove('争取的')
}
// d().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
// 不想中断操作可以将可能出错的表达式放在try catch中
async function e() {
    try {
        await Promise.reject('我是错的'); // reject 不需要return也可以
    }catch (e) {}
    return await Promise.resolve('我是对的')
}
// e().then(res=>{
//     console.log(res)
// }, err => {
//     console.log(err)
// })

/*使用注意点
1 await 后面的是promise对象，运行结果可能为reject,所以最好把await命令放在trycatch 中
2 多个await后面跟异步操作，如果不存在继发关系，最好同时触发 promise.all
*/

// 多个请求并发
async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => {
        db.post(doc)
    })
    let results = await Promise.all(promises)
    console.log(results)
}

// 实现原理（generator 函数和自动执行器）
function spawn(genF) { // genF 是一个generator函数
    return new Promise((resolve, reject) => { // async 返回是一个promise
        const gen = genF(); // 执行generator函数
        function step(nextF) {
            let next;
            try {
                next = nextF();
            }catch(e){
                return reject(e)
            }
            if (next.done) {
                return resolve(next.value)
            }
            Promise.reslove(next.value).then(res=>{ // 这里可以理解为递归一直调用知道generator函数结束，value为undefined
                step(()=>{return gen.next(res)})
            }, err => {
                step(()=> {return gen.throw(e)})
            })
        }

        step (()=>{return gen.next(undefined)})
    })
    
}

Promise.resolve(undefined).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})

// 比较






