<template>
    <div class="row">
        <div class="col-md-4">
            <div style="position: absolute;right: 30px;top: 10px;z-index: 1000" @click="loadTree"><i class="fa fa-refresh c-blue"></i></div>
            <div id="treeview"></div>
        </div>
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ obj.text }} 下级机构</h3>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center" style="width: 50px">序号</th>
                        <th class="text-center">机构名称</th>
                        <th class="text-center" style="width: 50px"><a @click="add">新建</a></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(org,index) in list" :key="org.id">
                        <td class="text-center" style="width: 50px">{{ index + 1 }}</td>
                        <td class="text-center">{{ org.name }}</td>
                        <td class="text-center"><a @click="edit(org)">编辑</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">编辑机构名称</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>机构名称</label>
                            <input type="text" v-model="org.name" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="save">保存</button>
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
            org: {}
        }
    },
    created: function () {
        this.loadTree();
    },
    methods: {
        loadTree: function () {
            let vm = this;
            this.$root.getData("api/getOrgTree", {}, function (data) {
                $('#treeview').treeview({
                    color: "#000000",
                    levels: 2,
                    data: data,
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
            this.$root.getData("api/getListByPid", {pid: this.obj.id}, function (data) {
                vm.list = data;
            })
        },
        add() {
            this.org = {};
            $('#editModal').modal('show');
        },
        edit(org) {
            this.org = this.$root.clone(org);
            $('#editModal').modal('show');
        },
        save() {
            let vm = this;
            this.org.pid = this.obj.id;
            this.$root.getData("api/saveOrganization", this.org, function (data) {
                $('#editModal').modal('hide');
                vm.org = {};
                vm.loadList();
            })
        }
    }
}
</script>

<style scoped>

</style>
