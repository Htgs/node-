//冒泡排序
var bubbleSort = function(arr) {
    for (var i = 0; i < arr.length-1; i++) {
        for (var j = i+1; j < arr.length; j++) {
            if (arr[i]>arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

console.log(bubbleSort([1, 5, 32, 66, 43]));

//快速排序
var quickSort = function(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var len = arr.length;
    var midIndex = Math.floor(len/2);
    var mid = arr.splice(midIndex,1);
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(mid,quickSort(right))
}

//快速排序
var quickSort = function(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var len = arr.length;
    var midIndex = Math.floor(len/2);
    var mid = arr.splice(midIndex,1);
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(mid,quickSort(right))
}

// 去重
var distinct = function(arr) {
    var map = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!map[arr[i]]) {
            map[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

//查找字符串中最多的值
var search = function(str) {
    var json = {};
    var max = 0;
    var char;
    for (var i = 0; i < str.length; i++) {
        if (!json[str[i]]) {
            json[str[i]]=1;
        } else {
            json[str[i]]++;
        }
    }
    console.log(json);
    for(var i in json){
        if(json[i]>max){
            max = json[i];
            char = i;
        }
    }
    console.log(max, char);
}
