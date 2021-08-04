<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">用户登录</h3>
                </div>
                <div class="panel-body">
                    <label>登录名</label>
                    <input type="text" class="form-control" v-model="loginname">
                    <label>密码</label>
                    <input type="password" class="form-control" v-model="password">
                    <button class="btn btn-primary m-t-15" @click="login">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            loginname: undefined,
            password: undefined
        }
    },
    created: function () {
    },
    methods: {
        login() {
            let vm = this;
            $.ajax({
                url: this.$root.basePath + "api/login",
                type: "post",
                data: {loginname: this.loginname, password: this.password},
                timeout: 15000, //超时日期设置，单位毫秒
                async: true,
                dataType: "json",
                success: function (data) {
                    if (data.success) {
                        sessionStorage.token = data.children.token;
                        sessionStorage.userObj = JSON.stringify(data.children.user);
                        sessionStorage.login=true;
                        vm.$root.userObj = data.children.user;
                        vm.$root.login = true;
                        vm.loadTaskCount();
                        vm.$router.push('index');
                    } else {
                        vm.$root.handleErrInfo(data);
                    }
                },
            });
        }
    }
}
</script>

<style scoped>

</style>
