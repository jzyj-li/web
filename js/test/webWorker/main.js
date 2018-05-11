

/*
*
* web worker
* */
var worker = new Worker('webWorker.js')

worker.onmessage = function (e) { // 接收事件
    console.log(e)
    
}

// worker.terminate() 结束数据
worker.postMessage('nishihsui'); // 发送事件
console.log('我是主入口')