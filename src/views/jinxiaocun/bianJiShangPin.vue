<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">编辑商品信息</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>商品编号</label>
                                <input type="text" v-model="obj.number" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>商品名称</label>
                                <input type="text" v-model="obj.name" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>商品类别</label>
                                <select class="form-control" v-model="obj.typeid">
                                    <option v-for="dict in dicts" :key="dict.id" :value="dict.id" v-show="dict.key==='chanpinleibie'">{{dict.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>计量单位</label>
                                <select class="form-control" v-model="obj.unit">
                                    <option v-for="dict in dicts" :key="dict.id" :value="dict.name" v-show="dict.key==='jiliangdanwei'">{{dict.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>采购单价</label>
                                <input type="number" v-model="obj.purchaseprice" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>销售单价</label>
                                <input type="number" v-model="obj.saleprice" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>颜色</label>
                                <input type="text" v-model="obj.color" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>用途</label>
                                <input type="text" v-model="obj.use" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>规格</label>
                                <input type="text" v-model="obj.norm" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>型号</label>
                                <input type="text" v-model="obj.model" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>产地</label>
                                <input type="text" v-model="obj.origin" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>供应商</label>
                                <select v-model="obj.supplierid" class="form-control">
                                    <option v-for="s in suppliers" :key="s.id" :value="s.id">{{s.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>条码</label>
                                <input type="text" v-model="obj.barcode" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>大包装单位</label>
                                <input type="text" v-model="obj.bigpackage" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>换算关系</label>
                                <input type="number" v-model="obj.conversionrelationship" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>备注</label>
                                <textarea rows="3" v-model="obj.remark" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-primary m-r-10" @click="save">保存</button>
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            obj:{},
            dicts:[],
            suppliers:[]
        }
    },
    created: function () {
        if(sessionStorage.commodityObj){
            this.obj=JSON.parse(sessionStorage.commodityObj);
        }
        this.loadDicts();
    },
    methods: {
        loadDicts(){
            let vm = this;
            this.$root.getData("api/getDictList", {}, function (data) {
                vm.dicts=data;
            })
            this.$root.getData("supplier/getList", {}, function (data) {
                vm.suppliers=data;
            })
        },
        save(){
            let vm = this;
            this.$root.getData("commodity/save", this.obj, function (data) {
                history.back();
            })
        }
    }
}
</script>

<style scoped>

</style>
