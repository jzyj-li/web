/*
* @des 检测数据类型
* @author mz
* @date 2018/07/26
* */

function checkObjOne(param) {
    let type = typeof param;
    if (type == 'object'){ // null Array Object Function
        type = objParamHandler(param)
    }

    // 检测type of 为object
    function objParamHandler(param) {
        let type, arr = [Function, Object];
        if (param) {
            type = Array.isArray(param)?'Array':arr.filter((v) => {
                return param instanceof v
            })[0].name
        } else {
          type = 'Null';
        }
        return type
    }
    return type;
}


function checkObjTwo(param) {
    let str = Object.prototype.toString.call(param)
    return str.substring(8, str.length-1);
}

console.log(checkObjTwo({}))