// 二次封装axios，类式API
// 1.接口API化：通过`调用方法的形式`替代传统的`.get()请求`
// 2.请求自动绑定
// 3.阻止重复提交（同一个地址）

import server from "./server.js";
function myserver() {
    this.server = server
    this.nowHandle = null // 阻止重复提交（同一个地址）
}

myserver.prototype.parseRouter = function (name, url) {
    this[name] = {}
    Object.keys(url).forEach(apiName => {
        this[name][apiName] = this.sendMes.bind(this, name, apiName, url[apiName])
        this[name][apiName].state = "ready" //绑定到函数的静态属性上
    })
}

// 任何封装切记写死了，一定要预留自定义空间
myserver.prototype.sendMes = function (moduleName, apiName, url, config) {
    var config = config || {}
    var type = config.type || "get"
    var param = config.param || {}
    var bindName = config.bindName || apiName;
    var self = this

    // 将请求处理分为数据处理模块和效果处理模块；
    // 效果处理模块
    var before = function (mes) {
        self[moduleName][apiName].state = "ready"
    }
    // 数据处理模块
    var defaultFn = function (mes) {
        self.nowHandle[bindName] = mes.data
    }
    var success = config.success || defaultFn;

    if (this[moduleName][apiName].state === "ready") {
        this.server[type](url).then(before).then(success);
        this[moduleName][apiName].state = "waiting"
    }
    this.server[type](url).then(before).then(success)
}

// 请求自动绑定
myserver.prototype.bindThis = function (that) {
    this.nowHandle = that
}

export default myserver