<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">产品结构清单详细信息</h3>
                </div>

                <table class="table table-bordered m-b-10">
                    <tbody>
                    <tr>
                        <td class="text-right" style="width: 15%">产品编号</td>
                        <td class="text-left" style="width: 35%">{{obj.number}}</td>
                        <td class="text-right" style="width: 15%">产品名称</td>
                        <td class="text-left" style="width: 35%">{{obj.name}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">产品规格</td>
                        <td class="text-left">{{obj.norm}}</td>
                        <td class="text-right">计量单位</td>
                        <td class="text-left">{{obj.unit}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">备注说明</td>
                        <td class="text-left" colspan="3">{{obj.remark}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div id="tree"></div>
                </div>
                <div class="col-md-9">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">{{node.text}} - 下级商品列表</h3>
                        </div>
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th class="text-center w50">序号</th>
                                    <th class="text-center">名称</th>
                                    <th class="text-center">编号</th>
                                    <th class="text-center">规格</th>
                                    <th class="text-center">型号</th>
                                    <th class="text-center w100">数量</th>
                                    <th class="text-center w50"><a class="c-blue" @click="addCommodity">新增</a></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(o,index) in list" :key="obj.id">
                                    <td class="text-center w50">{{ index + 1 }}</td>
                                    <td class="text-center">{{o.name}}</td>
                                    <td class="text-center">{{o.number}}</td>
                                    <td class="text-center">{{o.norm}}</td>
                                    <td class="text-center">{{o.model}}</td>
                                    <td class="text-center w100">
                                        <input type="number" v-model="o.commoditycount" class="w-100">
                                    </td>
                                    <td class="text-center w50"><a class="c-red" @click="removeObj(index)">移除</a></td>
                                </tr>
                                </tbody>
                            </table>
                    </div>  <div class="text-center">
                    <button class="btn btn-default" @click="saveList">保存</button>
                    <button class="btn btn-default" onclick="history.back()">返回</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="setCountModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑数量</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>子件数量</label>
                            <input type="number" v-model="child.commoditycount" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveChild">保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="selectCommodity"></selectCommodity>
    </div>
</template>

<script>

import '../../assets/js/bootstrap-treeview';
import selectCommodity from '@/components/selectCommodity.vue';
export default {
    name: "app",
    data() {
        return {
            obj:{},
            list:[],
            child:{},
            tree:[],
            node:{}
        }
    },
    created: function () {
        if(sessionStorage.productObj){
            this.obj=JSON.parse(sessionStorage.productObj);
            this.loadTree();
        }
    },
    components: {
        selectCommodity
    },
    methods: {
        loadTree(){
            let vm = this;
            this.$root.getData("productstructure/getTree", {id:this.obj.id}, function (data) {
                vm.tree=data;
                $('#tree').treeview({
                    color: "#000000",
                    levels: 3,
                    data: data,
                    onNodeSelected: function (event, node) {
                        vm.node=node;
                        vm.loadList(node.id);
                    }
                });
                if(data.length>0){
                    $('#tree').treeview('selectNode', [0, {silent: true}]);
                    vm.node = vm.tree[0];
                    vm.loadList(vm.node.id);
                }
            })
        },
        loadList(pid){
            let vm = this;
            this.$root.getData("productstructure/getListByPid", {pid:pid}, function (data) {
                vm.list=data;
            })
        },
        load: function () {
            let vm = this;
            this.$root.getData("productstructurechild/getList", {pid:this.obj.id}, function (data) {
                vm.list=data;
            })
        },
        addCommodity(){
            this.$refs.selectCommodity.load();
        },
        saveChild(){
            let vm = this;
            if(!this.child.commoditycount){
                this.$root.alert('必须大于0');
            }else{
                this.$root.getData("productstructure/save", this.child, function (data) {
                    $('#setCountModal').modal('hide');
                    vm.child={};
                    vm.load();
                })
            }
        },
        selectCommodity(obj){
            let flag=false;
            this.list.forEach(function (e){
                if(e.commodityid===obj.id){
                    flag=true;
                }
            })
            if(flag){
                this.$root.alert('已选商品');
            }
            else if(obj.id===this.obj.commodityid){
                this.$root.alert('不可选择主商品');
            }else{
                obj.commodityid=obj.id;
                obj.commoditycount=1;
                obj.pid=this.node.id;
                obj.id=null;

                this.list.push(obj);
            }
        },
        removeObj(index){
            let obj=this.list[index];
            if(obj.id){
                let vm = this;
                this.$root.confirm('确认吗?',function (){
                    vm.$root.getData("productstructure/delete", {id:obj.id}, function (data) {
                        vm.loadTree();
                    })
                })
            }
            this.list.splice(index,1);
        },
        saveList(){
            let vm = this;
            this.$root.getData("productstructure/saveList", {rows:JSON.stringify(this.list)}, function (data) {
                vm.$root.msg('操作成功');

                vm.loadTree();
            })
        }
    }
}
</script>

<style scoped>

</style>
