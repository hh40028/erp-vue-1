<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">仓库列表</h3>
                </div>
                <div class="panel-body">
                    <div class="btn-group">
                        <button class="btn btn-default" @click="add">新建</button>
                        <button class="btn btn-default" :disabled="!warehouse.id" @click="edit">编辑</button>
                        <button class="btn btn-default" :disabled="!warehouse.id" @click="location">货位设置</button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center" style="width: 50px">序号</th>
                        <th class="text-center" style="width: 50px">启用</th>
                        <th class="text-center">名称</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">负责人</th>
                        <th class="text-center" style="width: 60px">盘点中</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(w,index) in warehouses" :key="w.id" @click="selectObj(w)" :class="{'bg-success':w.id===warehouse.id}">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-center">
                            <input type="checkbox" v-model="w.status" @change="changeStatus(w)">
                        </td>
                        <td class="text-center">{{ w.name }}</td>
                        <td class="text-center">{{ w.address }}</td>
                        <td class="text-center">{{ w.managername }}</td>
                        <td class="text-center">{{ !w.checking ? "" : "盘点中" }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑仓库</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>名称</label>
                            <input type="text" v-model="warehouse.name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>地址</label>
                            <input type="text" v-model="warehouse.address" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>负责人</label>
                            <select v-model="warehouse.manager" class="form-control">
                                <option v-for="u in users" :key="u.id" :value="u.id">{{ u.username }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="save">保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
            warehouses: [],
            warehouse: {},
            users: []
        }
    },
    created: function () {
        this.loadUsers();
        this.load();
    },
    methods: {
        loadUsers() {
            let vm = this;
            this.$root.getData("api/getUserList", {}, function (data) {
                vm.users = data;
            })
        },
        load: function () {
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                vm.warehouses = data;
            })
        },
        changeStatus(obj) {
            this.warehouse = this.$root.clone(obj);
            this.save();
        },
        add() {
            this.warehouse = {};
            $('#editModal').modal('show');
        },
        edit() {
            $('#editModal').modal('show');
        },
        selectObj(obj) {
            this.warehouse = this.$root.clone(obj);
        },
        save() {
            let vm = this;
            this.$root.getData("warehouse/save", this.warehouse, function (data) {
                $('#editModal').modal('hide');
                vm.load();
            })
        },
        location() {
            sessionStorage.warehouseObj = JSON.stringify(this.warehouse);
            this.$router.push('cargolocation');
        }
    }
}
</script>

<style scoped>

</style>
