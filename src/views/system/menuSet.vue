<template>
    <div class="row">
        <div class="col-md-3">
            <div style="position: absolute;top:10px;right: 20px;z-index: 50"><a @click="loadTree">刷新</a></div>
            <div id="treeview"></div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">下级菜单</h3>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center" style="width: 50px">序号</th>
                        <th class="text-center">名称</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">图标</th>
                        <th class="text-center" style="width: 100px">排序</th>
                        <th class="text-center" style="width: 100px">编辑</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(menu,index) in list" :key="menu.id">
                        <td class="text-center" style="width: 50px">{{ index + 1 }}</td>
                        <td class="text-center">
                            <input type="text" v-model="menu.name" class="form-control">
                        </td>
                        <td class="text-center">
                            <input type="text" v-model="menu.url" class="form-control">
                        </td>
                        <td class="text-center">
                            <input type="text" v-model="menu.icon" class="form-control">
                        </td>
                        <td class="text-center" style="width: 100px">
                            <a class="c-blue m-r-5" @click="up(index)" v-if="index>0">上移</a>
                            <a class="c-blue" @click="down(index)" v-if="index<list.length-1">下移</a>
                        </td>
                        <td class="text-center" style="width: 50px">
                            <a class="c-blue m-r-5" @click="saveMenu(menu)">保存</a>
                            <a class="c-blue" @click="deleteMenu(menu)">删除</a>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td class="text-center" style="width: 50px"></td>
                        <td class="text-center">
                            <input type="text" v-model="menu.name" class="form-control">
                        </td>
                        <td class="text-center">
                            <input type="text" v-model="menu.url" class="form-control">
                        </td>
                        <td class="text-center">
                            <input type="text" v-model="menu.icon" class="form-control">
                        </td>
                        <td class="text-center" style="width: 50px" colspan="2"><a class="c-blue" @click="saveNewMenu">新增</a></td>
                    </tr>
                    </tfoot>
                </table>
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
            menu: {}
        }
    },
    created: function () {
        this.loadTree();
    },
    methods: {
        loadTree: function () {
            let vm = this;
            this.$root.getData("menu/getTree", {pid: 0}, function (data) {
                $('#treeview').treeview({
                    color: "#000000",
                    levels: 1,
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
            this.$root.getData("menu/getList", {pid: this.obj.id}, function (data) {
                vm.list = data;
                console.log(vm.list);
            })
        },
        saveMenu(menu) {
            let vm = this;
            this.$root.getData("menu/save", menu, function (data) {
                vm.loadList();
            })
        },
        saveNewMenu() {
            let vm = this;
            this.menu.pid=this.obj.id;
            this.$root.getData("menu/save", this.menu, function (data) {
                vm.menu={};
                vm.loadList();
            })
        },
        deleteMenu(menu) {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("menu/delete", {id: menu.id}, function (data) {
                    vm.loadList();
                })
            })
        },
        up(index){
            if(index>0)
            this.list[index] = this.list.splice(index-1, 1, this.list[index])[0];
            this.changeSort();
        },
        down(index){
            if(index<this.list.length-1)
            this.list[index] = this.list.splice(index+1, 1, this.list[index])[0];
            this.changeSort();
        },
        changeSort(){
            let vm = this;
            this.$root.getData("menu/changeSort", {rows:JSON.stringify(this.list)}, function (data) {

            })
        }
    }
}
</script>

<style scoped>

</style>
