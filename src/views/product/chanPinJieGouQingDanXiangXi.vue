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
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">子商品列表</h3>
                </div>
                <div class="panel-body">
                    <div class="btn-group">
                        <button class="btn btn-default" @click="addCommodity">选择</button>
                        <button class="btn btn-default" @click="deleteCommodity">删除</button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">数量</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">类别</th>
                        <th class="text-center">计量单位</th>
                        <th class="text-center">采购单价</th>
                        <th class="text-center">销售单价</th>
                        <th class="text-center">颜色</th>
                        <th class="text-center">用途</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(c,index) in list" :key="c.id" @click="selectChild(c)" :class="{'bg-success':c.id===child.id}">
                        <td class="text-center">{{index+1}}</td>
                        <td class="text-center">{{c.commoditycount}}</td>
                        <td class="text-center">{{c.number}}</td>
                        <td class="text-center">{{c.name}}</td>
                        <td class="text-center">{{c.typename}}</td>
                        <td class="text-center">{{c.unit}}</td>
                        <td class="text-center">{{c.purchaseprice|number2}}</td>
                        <td class="text-center">{{c.saleprice|number2}}</td>
                        <td class="text-center">{{c.color}}</td>
                        <td class="text-center">{{c.use}}</td>
                        <td class="text-center">{{c.norm}}</td>
                        <td class="text-center">{{c.model}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default" onclick="history.back()">返回</button>
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
import selectCommodity from '@/components/selectCommodity.vue';
export default {
    name: "app",
    data() {
        return {
            obj:{},
            list:[],
            child:{}
        }
    },
    created: function () {
        if(sessionStorage.productObj){
            this.obj=JSON.parse(sessionStorage.productObj);
            this.load();
        }
    },
    components: {
        selectCommodity
    },
    methods: {
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
                this.$root.getData("productstructurechild/save", this.child, function (data) {
                    $('#setCountModal').modal('hide');
                    vm.child={};
                    vm.load();
                })
            }
        },
        selectCommodity(obj){
            if(obj.id===this.obj.commodityid){
                this.$root.alert('不可选择主商品');
            }else{
                this.child={
                    commodityid:obj.id,
                    pid:this.obj.id,
                    commoditycount:1
                }
                $('#setCountModal').modal('show');
            }
        },
        deleteCommodity(obj){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("productstructurechild/delete", {id:vm.child.id}, function (data) {
                    vm.load();
                })
            })
        },
        selectChild(obj){
            this.child=obj;
        }
    }
}
</script>

<style scoped>

</style>
