/*
*
* 数组reduce
* */
// 求和
var arr = [1,2,3,4]
var a = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
})

console.log(a)
// 二维转一维
var arr2 = [[1,2],[3,4], [5,6]]
var b = arr2.reduce((a, c)=>{
    return a.concat(c)
})
console.log(b)

// 出现次数
var arr3 = ['a', 'b', 'c', 'e', 'f', 'a', 'c', 'e']
var c = arr3.reduce((a,c)=>{
    if (c in a) {
        a[c] ++;
    } else {
        a[c]=1
    }
    return a
}, {})
console.log(c)

// 获取对象中的数组
var arr4 = [
    {
    name: '1',
    tag: [1,2]
    },
    {
        name: '1',
        tag: [3,4]
    },
    {
        name: '1',
        tag: [5,6]
    }
]
var d = arr4.reduce((a, c)=> {
    return [...a, ...c.tag]
}, [])

console.log(d)

// 数组去重
let arr5 = [1,2,3,4,5,76,2,3,1,1,1,2,2,3,3,3]
var e = arr5.sort().reduce((a, c) => {
    if (a.length ===0 || a[a.length-1] !== c) {
        a.push(c)
    }
    return a
}, [])

console.log(e)