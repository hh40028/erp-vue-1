<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">采购开单</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>往来单位</label>
                                <selectSupplier :name="obj.suppliername" @selectObj="selectSupplier"></selectSupplier>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>经办人</label>
                                <selectUser :name="obj.managername" @selectObj="selectUser"></selectUser>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>采购日期</label>
                                <input type="date" v-model="obj.purchasedate" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>摘要说明</label>
                                <input type="text" v-model="obj.remark" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">仓库</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">商品类型</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">商品数量</th>
                        <th class="text-center">商品单价</th>
                        <th class="text-center">金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,index) in list" :key="obj.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">
                            <select class="w-100" v-model="obj.warehouseid">
                                <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
                            </select>
                        </td>
                        <td class="text-center">{{ obj.name }}</td>
                        <td class="text-center">{{ obj.typename }}</td>
                        <td class="text-center">{{ obj.norm }}</td>
                        <td class="text-center">{{ obj.model }}</td>
                        <td class="text-center">
                            <select class="w-100" v-model="obj.bigpackage">
                                <option :value="false">{{ obj.unit }}</option>
                                <option :value="true">{{ obj.bigunit }}</option>
                            </select>
                        </td>
                        <td class="text-center w100">
                            <input type="number" style="height: 20px" class="w-100 text-center" v-model="obj.commoditycount">
                        </td>
                        <td class="text-center w100">
                            <input type="number" style="height: 20px" class="w-100 text-center" v-model="obj.commodityprice">
                        </td>
                        <td class="text-center">{{ obj.commoditycount * obj.commodityprice|number2 }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="panel-body text-center">
                    <button class="btn btn-default m-r-10" @click="openCommodityModal">选择商品</button>
                    <button class="btn btn-default m-r-10" @click="save">保存单据</button>
                    <router-link to="purchaseList" class="btn btn-default">返回</router-link>
                </div>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="selectCommodity"></selectCommodity>
    </div>
</template>

<script>
import selectSupplier from '@/components/selectSupplier.vue';
import selectUser from '@/components/selectUser.vue';
import selectCommodity from '@/components/selectCommodity.vue';

export default {
    name: "app",
    data() {
        return {
            obj: {},
            list: [],
            warehouses: []
        }
    },
    created: function () {
        this.$set(this.obj, 'purchasedate', this.$root.getCurrDay());
        this.load();
    },
    components: {
        selectSupplier, selectUser, selectCommodity
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                vm.warehouses = data;
            })
        },
        selectSupplier(obj) {
            this.$set(this.obj, 'supplierid', obj.id);
            this.$set(this.obj, 'suppliername', obj.name);
        },
        selectUser(obj) {
            this.$set(this.obj, 'manager', obj.id);
            this.$set(this.obj, 'managername', obj.username);
        },
        openCommodityModal() {
            this.$refs.selectCommodity.load();
        },
        selectCommodity(obj) {
            obj.commodityid=obj.id;
            obj.id=null;
            obj.bigunit = obj.bigpackage;
            obj.bigpackage = false;
            this.list.push(obj);
        },
        save(){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("purchase/save", {obj:JSON.stringify(vm.obj),rows:JSON.stringify(vm.list)}, function (data) {
                    sessionStorage.purchaseId=data.id;
                    vm.$router.push('purchaseview');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
