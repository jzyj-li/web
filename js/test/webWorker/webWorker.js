console.log('我是webWorker')

onmessage = function (e) {
    console.log(e.data)
}
postMessage('我是worker')

// importScripts, onmessage, postMessage

importScripts('a.js')