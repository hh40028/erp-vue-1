<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div id="treeview"></div>
            </div>
            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{ org.text }}项目列表</h3>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th class="text-center" style="width: 50px">序号</th>
                            <th class="text-center">项目名称</th>
                            <th class="text-center">项目编号</th>
                            <th class="text-center">创建日期</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center" style="width: 50px"><a @click="add">新建</a></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(project,index) in list" :key="project.id">
                            <td class="text-center" style="width: 50px">{{ index+1 }}</td>
                            <td class="text-center">{{project.name}}</td>
                            <td class="text-center">{{project.number}}</td>
                            <td class="text-center">{{project.createtime}}</td>
                            <td class="text-center">{{project.pmname}}</td>
                            <td class="text-center"><a @click="edit(project)">编辑</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div  class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">编辑项目信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>项目名称</label>
                            <input type="text" v-model="obj.name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>项目描述</label>
                            <textarea rows="3" v-model="obj.remark" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label>负责人</label>
                            <ul class="list-group">
                                <li class="list-group-item"
                                    :class="{'list-group-item-success':user.id===obj.pmuserid}"
                                    v-for="user in users" :key="user.id"
                                @click="selectPM(user)">{{user.username}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div  class="btn btn-primary" @click="save">保存</div>
                        <div  class="btn btn-default" data-dismiss="modal">关闭</div>
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
            list: [],
            org:{},
            obj:{},
            users:[]
        }
    },
    created: function () {
        this.loadTree();
        this.loadUsers();
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
                        vm.org=node;
                        vm.loadList();
                    }
                });
                $('#treeview').treeview('selectNode', [0, { silent: true }]);
                vm.org=data[0];
                vm.loadList();
            })
        },
        loadList() {
            let vm = this;
            this.$root.getData("project/getListByOids", {oid: this.org.id}, function (data) {
                vm.list = data;
            })
        },
        loadUsers(){
            let vm = this;
            this.$root.getData("api/getUserList", {}, function (data) {
                vm.users=data;
                console.log(vm.users);
            })
        },
        selectPM(user){
            this.$set(this.obj,'pmuserid',user.id);
        },
        add(){
            this.obj={};
            $('#editModal').modal('show');
        },
        edit(obj){
            this.obj=this.$root.clone(obj);
            $('#editModal').modal('show');
        },
        save(){
            let vm = this;
            if(!this.obj.oid){
                this.obj.oid=this.org.id;
            }
            this.$root.getData("project/save", this.obj, function (data) {
                $('#editModal').modal('hide');
                vm.obj={};
                vm.loadList();
            })
        }
    }
}
</script>

<style scoped>

</style>
