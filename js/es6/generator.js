/*
* generator 函数的异步应用
* 回调函数
* 时间监听
* 发布/订阅
* Promise对象
* */

// 回调函数
var fs = require('fs');
fs.readFile('01.html', (err, data) => {
    if (err) throw err;
    console.log(err)
    //console.log(data.toString())
})

// promise
let a = new Promise((reslove, reject) => {
    fs.readFile('promise.html', (err, data) => {
        if (err) {
            reject(err)
        } else {
            reslove(data)
        }
    })
})
let b = new Promise((reslove, reject) => {
    fs.readFile('proxy.html', (err, data) => {
        if (err) {
            reject(err)
        } else {
            reslove(data)
        }
    })
})
a.then(res => {
   // console.log(res.toString())
}).then(res => {
    return b
}).then(res =>{}
)

// 协程 generator
function *gen() {
    yield '11';
    yield '22';
}
console.log(gen().next())

function *foo(x) {
    yield x + 2;
    return 3;
}
console.log(foo(1).next())

// thunk 函数 是自动执行generator函数的一种方法
// 函数参数求值的方式有两种传值调用，传名调用，顾名思义就是第一种在函数调用之前参数已经计算完毕，第二种
// 参数开始使用时才计算

let x = 4;
function aa(num) {
    return num + 2;
}

aa(x + 3); // 如果是传值调用的话相当于aa(6) 传名调用相当于 return x + 3 + 2 在return时一起计算

// thunk 函数的定义 实现传名调用，将参数放到一个临时函数中，再将临时函数传入函数体，这个临时函数就是thunk函数
let thrunk = function () {
    return x + 5;
}
aa = function (thrunk) {
    return thrunk() + 2; // 这样 x + 5 就会在调用的时候执行而不是在调用之前
}

// js 语言本身是传值调用它与thunk函数含义有所不同，是将多参数函数替换成一个只接受回调函数作为参数的单参数函数，
// 函数必须有参数为回调函数
var thunk = function (fn) { // fn变成thunk函数的函数
    return function () { // 接受参数的函数 参数为本来应该传给fn的参数
        var args = Array.prototype.slice.call(arguments); // 将类数组对象 转成数组
        return function (callback) { // 回调函数
            args.push(callback);
            return fn.apply(this, args); // 最终还是调用fn()
        }
    }
}

function test(a, fn) {
    fn(a)
}
test1 = thunk(test);
test1(2)(console.log)
// thunk 函数的本质是将多参数函数中参数为回调函数的参数拿出来变成单参数函数

// Thunkify 模块
function thunkify(fn) {
    return function () {
        var args = new Array(arguments.length);
        var ctx = this;

        for (let v  = 0;v<args.length;v ++) {
            args[v] = arguments[v];
        }
        return function (done) { // 接受回调函数为参数的函数
            var called;
            args.push(function () { // 这一层是保证回调函数只执行一次
                if (called) return;
                called = true;
                done.apply(null, arguments);
            })
            try{
                fn.apply(ctx, args)
            }catch (err) {
                done(err)
            }
        }
    }
}

// thunk函数的主要作用是generator函数的自动流程管理
var readFileThunk = thunkify(fs.readFile);
function * readfile() {
    var r1 = yield readFileThunk('01.html');
   console.log(r1.toString());
    yield readFileThunk('promise.html');
}

var readfile1 = readfile();
readfile1.next().value(function (err, data) {
    console.log(err, data)
    readfile1.next(data)
})

// 上面这段代码本质上相当于下面这段
// fs.readFile('01.html', function (err, data) { // 这个函数是 上面push进去的
//     (function (err, data) { // 这个函数才是callback 即我们在value中传入的函数
//
//     })()
//
// })

// co 模块

