<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ warehouse.name }}货位设置</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div style="position: absolute;top: 10px;right:20px;z-index: 50"><a class="c-blue" @click="load">刷新</a></div>
                            <div id="treeviewLocation"></div>
                        </div>
                        <div class="col-md-9">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th class="text-center w50">序号</th>
                                    <th class="text-center">编号</th>
                                    <th class="text-center">名称</th>
                                    <th class="text-center w50"><a class="c-blue" @click="add">新建</a></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(obj,index) in list" :key="obj.id">
                                    <td class="text-center w50">{{ index + 1 }}</td>
                                    <td class="text-center">{{ obj.number }}</td>
                                    <td class="text-center">{{ obj.name }}</td>
                                    <td class="text-center"><a class="c-blue" @click="selectItem(obj)">编辑</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editLocationModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑货位</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>货位编码</label>
                            <input type="text" v-model="selectObj.number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>货位名称</label>
                            <input type="text" v-model="selectObj.name" class="form-control">
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
import '../../assets/js/bootstrap-treeview';

export default {
    name: "app",
    data() {
        return {
            warehouse: {},
            list: [],
            node: {},
            selectObj:{},
            tree:[]
        }
    },
    created: function () {
        if (sessionStorage.warehouseObj) {
            this.warehouse = JSON.parse(sessionStorage.warehouseObj);
            this.load();
        }
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("cargolocation/getTree", {warehouseId: this.warehouse.id}, function (data) {
                vm.tree=data;
                $('#treeviewLocation').treeview({
                    color: "#000000",
                    levels: 2,
                    data: vm.tree,
                    onNodeSelected: function (event, node) {
                        vm.node = node;
                        vm.loadList();
                    }
                });
                if(!vm.node.id){
                    $('#treeviewLocation').treeview('selectNode', [0, {silent: true}]);
                    vm.node = vm.tree[0];
                    vm.loadList();
                }
            })
        },
        loadList() {
            let vm = this;
            this.$root.getData("cargolocation/getList", {pid: this.node.id}, function (data) {
                vm.list = data;
            })
        },
        add(){
            this.selectObj={};
            $('#editLocationModal').modal('show');
        },
        selectItem(obj){
            this.selectObj=this.$root.clone(obj);
            $('#editLocationModal').modal('show');
        },
        save(){
            let vm = this;
            this.selectObj.pid=this.node.id;
            this.$root.getData("cargolocation/save", this.selectObj, function (data) {
                vm.selectObj={};
                $('#editLocationModal').modal('hide');
                vm.loadList();
            })
        }
    }
}
</script>

<style scoped>

</style>
