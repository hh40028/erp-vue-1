<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-3">
                <ul class="list-group">
                    <li class="list-group-item" :class="{'list-group-item-success':tag==='photo'}" @click="tag='photo'">头像</li>
                    <li class="list-group-item" :class="{'list-group-item-success':tag==='basic'}" @click="tag='basic'">基本信息</li>
                    <li class="list-group-item" :class="{'list-group-item-success':tag==='phone'}" @click="tag='phone'">更换手机号</li>
                </ul>
            </div>
            <div class="col-md-9 col-sm-9">
                <div class="panel panel-default" v-if="tag==='photo'">
                    <div class="panel-heading">
                        <h3 class="panel-title">上传头像照片</h3>
                    </div>
                    <div class="panel-body">
                        <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
                        <img :src="option.img" alt="">
                    </div>
                </div>
                <div class="panel panel-default" v-if="tag==='basic'">
                    <div class="panel-heading">
                        <h3 class="panel-title">基本信息设置</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-md-6 col-sm-6">
                                <label>姓名</label>
                                <input type="text" v-model="obj.name" class="form-control">
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>性别</label><br>
                                <div class="btn-group">
                                    <div class="btn" @click="obj.gender=true" :class="{'btn-primary':obj.gender,'btn-default':!obj.gender}">男</div>
                                    <div class="btn" @click="obj.gender=false" :class="{'btn-primary':!obj.gender,'btn-default':obj.gender}">女</div>
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>手机号码</label>
                                <input type="text" v-model="obj.phonenumber" readonly class="form-control">
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>出生日期</label>
                                <input type="date" v-model="obj.birthdate" class="form-control">
                            </div>
                            <div class="form-group col-md-3 col-sm-3">
                                <label>所在省</label>
                                <input type="text" v-model="obj.province" class="form-control">
                            </div>
                            <div class="form-group col-md-3 col-sm-3">
                                <label>所在市</label>
                                <input type="text" v-model="obj.city" class="form-control">
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>所在学校</label>
                                <input type="text" v-model="obj.school" class="form-control">
                            </div>
                            <div class="form-group col-md-12 col-sm-12">
                                <label>在读年级</label>
                                <br>
                                <div class="btn-group">
                                    <div class="btn" @click="obj.gradeid=dict.id" :class="{'btn-primary':obj.gradeid===dict.id,'btn-default':obj.gradeid!==dict.id}" v-for="dict in $root.dicts" :key="dict.id" v-if="dict.key==='GradeType'">{{ dict.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer text-center">
                        <button class="btn btn-primary" @click="save">保存</button>
                    </div>
                </div>
                <div class="panel panel-default" v-if="tag==='phone'">
                    <div class="panel-heading">
                        <h3 class="panel-title">更换手机号码</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-md-6 col-sm-6">
                                <label>原号码</label>
                                <input type="text" v-model="phone.oldnumber" class="form-control">
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>原号码验证</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="phone.oldcode" placeholder="原手机短信验证码...">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" :disabled="phone.countOld>0" @click="getOldVerifyCode">{{ phone.oldbtntxt }}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>新号码</label>
                                <input type="text" v-model="phone.newnumber" class="form-control">
                            </div>
                            <div class="form-group col-md-6 col-sm-6">
                                <label>新号码验证</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="phone.newcode" placeholder="新手机短信验证码...">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" :disabled="phone.countNew>0" @click="getNewVerifyCode">{{ phone.newbtntxt }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer text-center">
                        <button class="btn btn-primary" @click="changePhone">更换</button>
                    </div>
                </div>
                <div class="panel panel-default" v-if="tag==='password'">
                    <div class="panel-heading">
                        <h3 class="panel-title">修改密码</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-md-6 col-md-offset-3 col-sm-6">
                                <label>短信验证码</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="password.code" placeholder="输入验证码...">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" :disabled="password.count>0" @click="getPasswordVerifyCode">{{ password.btntxt }}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3 col-sm-6">
                                <label>新密码</label>
                                <div class="input-group">
                                    <input :type="password.eye?'text':'password'" v-model="password.password" class="form-control">
                                    <span class="input-group-addon" @click="password.eye=!password.eye">
                                         <i class="fa" :class="{'fa-eye':!password.eye,'fa-eye-slash':password.eye}"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer text-center">
                        <button class="btn btn-primary" @click="updatePassword">提交</button>
                    </div>
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
            tag: 'basic',
            obj: {
                gender: true
            },
            phone: {
                oldnumber: '',
                newnumber: '',
                oldverifycode: '',
                newverifycode: '',
                oldcode: '',
                newcode: '',
                oldbtntxt: '获取验证码',
                newbtntxt: '获取验证码',
                countOld: 0,
                countNew: 0
            },
            password: {
                code: '',
                verifyCode: '',
                btntxt: '获取验证码',
                count: 0,
                password: '',
                eye: false
            },
            option: {
                img: '',
                size: 1,
                outputType: 'jpg'
            }
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("student/getObj", null, function (data) {
                vm.obj = data;
            })
        },
        save() {
            let vm = this;
            this.$root.confirm('确认吗？', function () {
                vm.$root.getData("student/update", vm.obj, function (data) {
                    vm.$root.userObj = data;
                    sessionStorage.userObj = JSON.stringify(data);
                    vm.$root.msg('操作成功');
                })
            })
        },
        changePhone() {
            let vm = this;
            this.$root.confirm('确认吗？', function () {
                vm.$root.getData("student/changePhone", {
                    oldnumber: vm.phone.oldnumber,
                    oldverifycode: vm.phone.oldverifycode,
                    oldcode: vm.phone.oldcode,
                    newnumber: vm.phone.newnumber,
                    newverifycode: vm.phone.newverifycode,
                    newcode: vm.phone.newcode
                }, function (data) {
                    vm.$root.userObj = data.obj;
                    sessionStorage.userObj = JSON.stringify(data.obj);
                    sessionStorage.token = data.token;
                    vm.phone = {
                        oldnumber: '',
                        newnumber: '',
                        oldverifycode: '',
                        newverifycode: '',
                        oldcode: '',
                        newcode: '',
                        oldbtntxt: '获取验证码',
                        newbtntxt: '获取验证码',
                        countOld: 0,
                        countNew: 0
                    }
                })
            })
        },
        getOldVerifyCode() {
            let vm = this;
            this.$root.getData("student/getOldVerificationCode", {phonenumber: this.phone.oldnumber}, function (data) {
                vm.timerOld();
                vm.phone.oldverifycode = data;
                vm.phone.countOld = 60;
                vm.$root.alert('验证码已经发送到您的旧手机短信中，请查收。');
            })
        },
        getNewVerifyCode() {
            let vm = this;
            this.$root.getData("student/getVerificationCode", {phonenumber: this.phone.newnumber}, function (data) {
                vm.timerNew();
                vm.phone.newverifycode = data;
                vm.phone.countNew = 60;
                vm.$root.alert('验证码已经发送到您的新手机短信中，请查收。');
            })
        },
        getPasswordVerifyCode() {
            let vm = this;
            this.$root.getData("student/getVerificationCode", {phonenumber: this.$root.userObj.phonenumber}, function (data) {
                vm.timer();
                vm.password.verifyCode = data;
                vm.password.count = 60;
                vm.$root.alert('验证码已经发送到您的手机短信中，请查收。');
            })
        },
        timerOld() {
            let vm = this;
            if (this.countOld === 0) {
                this.phone.oldbtntxt = "获取验证码";
            } else {
                this.phone.oldbtntxt = "重新获取" + this.phone.countOld + "s";
                this.phone.countOld--;
                setTimeout(
                    function () {
                        vm.timerOld();
                    },
                    1000
                );
            }
        },
        timerNew() {
            let vm = this;
            if (this.countNew === 0) {
                this.phone.newbtntxt = "获取验证码";
            } else {
                this.phone.newbtntxt = "重新获取" + this.phone.countNew + "s";
                this.phone.countNew--;
                setTimeout(
                    function () {
                        vm.timerNew();
                    },
                    1000
                );
            }
        },
        timer() {
            let vm = this;
            if (this.password.count === 0) {
                this.password.btntxt = "获取验证码";
            } else {
                this.password.btntxt = "重新获取" + this.password.count + "s";
                this.password.count--;
                setTimeout(
                    function () {
                        vm.timer();
                    },
                    1000
                );
            }
        },
        updatePassword() {
            let vm = this;
            this.$root.confirm('确认吗？', function () {
                vm.$root.getData("student/updatePassword", {
                    code: vm.password.code,
                    verifyCode: vm.password.verifyCode,
                    password: vm.password.password
                }, function (data) {
                    vm.$root.userObj = data.obj;
                    sessionStorage.userObj = JSON.stringify(data.obj);
                    sessionStorage.token = data.token;
                    vm.$root.msg('密码修改成功');
                    vm.password.code = '';
                    vm.password.verifyCode = '';
                    vm.password.password = '';
                    vm.password.count = '0';
                    vm.password.btntxt = '获取验证码';
                })
            })
        },
        cutDown() {

        },
        uploadPhoto(e) {
            let vm = this;
            // 利用fileReader对象获取file
            var file = e.target.files[0];
            var filesize = file.size;
            var filename = file.name;
            // 2,621,440   2M
            if (filesize > 2101440) {
                // 图片大于2MB

            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                vm.option.img = e.target.result;
            }
        }
    }
}
</script>

<style scoped>

</style>
