<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">工序信息</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right wp-15">工序编号</td>
                        <td class="text-left wp-35">{{ obj.number }}</td>
                        <td class="text-right wp-15">工序名称</td>
                        <td class="text-left wp-35">{{ obj.name }}</td>
                    </tr>
                    <tr>
                        <td class="text-right wp-15">参考单价(元)</td>
                        <td class="text-left wp-35">{{ obj.price|number2 }}</td>
                        <td class="text-right wp-15">生产时间(分钟)</td>
                        <td class="text-left wp-35">{{ obj.productiontime }}</td>
                    </tr>
                    <tr>
                        <td class="text-right wp-15">生产部门</td>
                        <td class="text-left wp-35">{{ obj.productiondeptname }}</td>
                        <td class="text-right wp-15">工序内容</td>
                        <td class="text-left wp-35">{{ obj.content }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">材料表</h3>
                </div>
                <div class="panel-body">
                    <div class="btn-group">
                        <button class="btn btn-default" @click="add">选择</button>
                        <button class="btn btn-default" :disabled="!child.id" @click="deleteObj">删除</button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">数量</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">商品类型</th>
                        <th class="text-center">计量单位</th>
                        <th class="text-center">用途</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">产地</th>
                        <th class="text-center">条码</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,index) in list" :key="obj.id" @click="selectItem(obj)" :class="{'bg-success':obj.id===child.id}">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ obj.commoditycount }}</td>
                        <td class="text-center">{{ obj.number }}</td>
                        <td class="text-center">{{ obj.name }}</td>
                        <td class="text-center">{{ obj.typename }}</td>
                        <td class="text-center">{{ obj.unit }}</td>
                        <td class="text-center">{{ obj.use }}</td>
                        <td class="text-center">{{ obj.norm }}</td>
                        <td class="text-center">{{ obj.model }}</td>
                        <td class="text-center">{{ obj.origin }}</td>
                        <td class="text-center">{{ obj.barcode }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="inputCountModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">数量</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>材料数量</label>
                            <input type="number" v-model="child.commoditycount" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="saveChild">保存</button>
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
            obj: {},
            list: [],
            child:{}
        }
    },
    created: function () {
        if (sessionStorage.worksequenceObj) {
            this.obj = JSON.parse(sessionStorage.worksequenceObj);
            this.load();
        }
    },
    components: {
        selectCommodity
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("worksequencematerial/getList", {wid: this.obj.id}, function (data) {
                vm.list = data;
            })
        },
        add() {
            this.$refs.selectCommodity.load();
        },
        selectCommodity(obj){
            this.child={
                wid:this.obj.id,
                commodityid:obj.id,
                commoditycount:1
            }
            $('#inputCountModal').modal('show');
        },
        saveChild(){
            let vm = this;
            this.$root.getData("worksequencematerial/save", this.child, function (data) {
                vm.child={};
                $('#inputCountModal').modal('hide');
                vm.load();
            })
        },
        selectItem(obj){
            this.child=this.$root.clone(obj);
        },
        deleteObj(){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("worksequencematerial/delete", {id:vm.child.id}, function (data) {
                    vm.load();
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
