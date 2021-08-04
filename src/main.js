import Vue from 'vue';
import App from './App.vue';
import $ from 'jquery';
import './assets/css/bootstrap.css';
import './assets/css/bootstrap-theme.css';
import './assets/js/bootstrap.min.js';
import './assets/fonts/font-awesome/css/font-awesome.min.css';
import './assets/css/style.css';
import './assets/js/aui-dialog.js';
import './assets/js/aui-toast';
import filters from './assets/js/filter.js';
import router from './router';
import 'vue-easytable/libs/themes-base/index.css';

import {VTable, VPagination} from 'vue-easytable';

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.prototype.toHtml = function (msg) {
    if (!msg) {
        return '';
    }
    return msg.replace(/</g, '[').replace(/>/g, ']').replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');

};

Vue.prototype.loadTaskCount = function () {
    let vm = this;
    if (this.$root.userObj) {
        this.$root.getData("sys/getTaskCount", {}, function (data) {
            vm.$root.taskCount = data;
        })
    }
}
new Vue({
    data() {
        return {
            basePath: 'http://localhost:8080/',
            userObj: undefined,
            tag: 'index',
            path: [],
            menus: [],
            taskCount:0

        }
    },
    created() {
        if (sessionStorage.userObj && sessionStorage.token) {
            this.userObj = JSON.parse(sessionStorage.userObj);
        }
        if (sessionStorage.tag) {
            this.tag = sessionStorage.tag;
        }
        this.loadMenu();
    },
    methods: {
        loadMenu: function () {
            let vm = this;
            this.getData("menu/getTree", {pid: 0}, function (data) {
                vm.menus = data;
            })
        },
        //远程数据访问
        getData: function (action, obj, fun) {
            let vm = this;
            let time = new Date().getTime();
            $.ajax({
                url: this.basePath + action,
                type: "post",
                data: obj,
                headers: {
                    token: sessionStorage.token
                },
                async: true,
                dataType: "json",
                success: function (data) {
                    // console.log((new Date().getTime() - time) + ":" + action);
                    if (data.success) {
                        fun(data.children);
                    } else {
                        console.log("action:" + action);
                        vm.handleErrInfo(data);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 404) {
                        vm.alert("404错误：" + action);
                    }
                }
            });
        },
        handleErrInfo(obj) {
            if (obj.message === 'login') {
                this.$root.userObj = undefined;
                sessionStorage.removeItem("userObj");
                sessionStorage.removeItem("token");
                this.$router.push('login');
            } else if (obj.message === 'nopower') {
                this.$router.push('noPower');
            } else {
                this.alert(obj.message, function () {
                });
            }
        },
        //克隆对象
        clone: function (obj) {
            let o;
            switch (typeof obj) {
                case 'undefined':
                    break;
                case 'string':
                    o = obj + '';
                    break;
                case 'number':
                    o = obj - 0;
                    break;
                case 'boolean':
                    o = obj;
                    break;
                case 'object':
                    if (obj === null) {
                        o = null;
                    } else {
                        if (obj instanceof Array) {
                            o = [];
                            for (let i = 0, len = obj.length; i < len; i++) {
                                o.push(this.clone(obj[i]));
                            }
                        } else {
                            o = {};
                            for (let k in obj) {
                                o[k] = this.clone(obj[k]);
                            }
                        }
                    }
                    break;
                default:
                    o = obj;
                    break;
            }
            return o;
        },
        jsonSort: function (array, field, reverse) {
            if (array.length < 2 || !field || typeof array[0] !== "object") return array;
            if (typeof array[0][field] === "number") {
                array.sort(function (x, y) {
                    return x[field] - y[field]
                });
            }
            if (typeof array[0][field] === "string") {
                array.sort(function (x, y) {
                    if (x[field]) {
                        return x[field].localeCompare(y[field])
                    }
                });
            }
            if (reverse) {
                array.reverse();
            }
            return array;
        },
        getCurrDay() {
            let dt = new Date();
            let month = (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
            let date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return dt.getFullYear() + "/" + month + "/" + date;
        },
        stringToArr(val) {
            let arr = [];
            if (!!val && val.indexOf(",") >= 0) {
                arr = val.split(",");
            }
            return arr;
        },
        confirm(msg, func) {
            $('.aui-mask').remove();
            $('.aui-dialog').remove();
            new auiDialog().alert({
                title: '提示信息',
                msg: msg,
                buttons: ['取消', '确定']
            }, function (ret) {
                if (ret.buttonIndex === 2) {
                    func();
                }
            });
        },
        msg(m) {
            new auiToast().success({
                title: m,
                duration: 3000
            });
        },
        alert(msg, func) {
            $('.aui-mask').remove();
            $('.aui-dialog').remove();
            new auiDialog().alert({
                title: '提示信息',
                msg: msg,
                buttons: ['确定']
            }, function () {
                if (func) {
                    func();
                }
            });
        },
        deleteFile(filename) {
            let vm = this;
            this.$root.getData("common/deleteFile", {filename: filename}, function (data) {
                vm.msg(data);
            })
        },
        timesFun(timesData) {
            if (!timesData) {
                return "";
            }
            //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
            let dateBegin = new Date(timesData.replace(/-/g, "/"));//将-转化为/，使用new Date
            let dateEnd = new Date();//获取当前时间
            let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            let leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
            //计算相差分钟数
            let leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
            //计算相差秒数
            let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
            let seconds = Math.round(leave3 / 1000);
            let timesString = '';

            if (dayDiff != 0) {
                if (dayDiff < 365) {
                    timesString = dayDiff + '天前';
                } else {
                    timesString = dateBegin.toLocaleDateString();
                    // timesString = timesData;
                }
            } else if (dayDiff == 0 && hours != 0) {
                timesString = hours + '小时前';
            } else if (dayDiff == 0 && hours == 0) {
                timesString = minutes + '分钟前';
            }

            return timesString;
        }
    },
    router,
    render: h => h(App),
}).$mount('#app')
