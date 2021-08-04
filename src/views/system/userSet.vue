<template>
    <div class="row">
        <div class="col-md-3">
            <div id="treeview"></div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ obj.text }}</h3>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center" style="width: 50px">序号</th>
                        <th class="text-center">用户姓名</th>
                        <th class="text-center">登录名</th>
                        <th class="text-center">密码</th>
                        <th class="text-center" style="width: 50px"><a @click="add">新建</a></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(user,index) in list" :key="user.id">
                        <td class="text-center" style="width: 50px">{{ index + 1 }}</td>
                        <td class="text-center">{{ user.username }}</td>
                        <td class="text-center">{{ user.loginname }}</td>
                        <td class="text-center">{{ user.password }}</td>
                        <td class="text-center"><a @click="edit(user)">编辑</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="moveModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">调离</h4>
                    </div>
                    <div id="treeviewMove"></div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">编辑用户信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>用户名称</label>
                            <input type="text" v-model="user.username" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>登录名</label>
                            <input type="text" v-model="user.loginname" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input type="text" v-model="user.password" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="save">保存</button>
                        <button class="btn btn-primary" @click="userMove">调离</button>
                        <button class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../assets/js/bootstrap-treeview';

export default {
    name: "app",
    data() {
        return {
            obj: {},
            list: [],
            user: {},
            tree: []
        }
    },
    created: function () {
        this.loadTree();
    },
    methods: {
        loadTree: function () {
            let vm = this;
            this.$root.getData("api/getOrgTree", {}, function (data) {
                vm.tree = data;
                $('#treeview').treeview({
                    color: "#000000",
                    levels: 2,
                    data: vm.tree,
                    onNodeSelected: function (event, node) {
                        vm.obj = node;
                        vm.loadList();
                    }
                });
                $('#treeview').treeview('selectNode', [0, {silent: true}]);
                vm.obj = data[0];
                vm.loadList();
            })
        },
        loadList() {
            let vm = this;
            this.$root.getData("api/getListByOrganizationid", {organizationid: this.obj.id}, function (data) {
                vm.list = data;
            })
        },
        add() {
            this.user = {};
            $('#editModal').modal('show');
        },
        edit(user) {
            this.user = this.$root.clone(user);
            $('#editModal').modal('show');
        },
        save() {
            let vm = this;
            this.user.organizationid = this.obj.id;
            this.$root.getData("api/saveUser", this.user, function (data) {
                $('#editModal').modal('hide');
                vm.user = {};
                vm.loadList();
            })
        },
        userMove() {
            let vm = this;
            $('#editModal').modal('hide');
            $('#moveModal').modal('show');
            $('#treeviewMove').treeview({
                color: "#000000",
                levels: 2,
                data: vm.tree,
                onNodeSelected: function (event, node) {
                    vm.$root.confirm(vm.user.username + '调至' + node.text + ',确认吗?', function () {
                        vm.user.organizationid = node.id;
                        vm.$root.getData("api/saveUser", vm.user, function (data) {
                            $('#editModal').modal('hide');
                            vm.user = {};
                            vm.loadList();
                            $('#moveModal').modal('hide');
                        })
                    })
                }
            });
        },

    }
}
</script>

<style scoped>

</style>
