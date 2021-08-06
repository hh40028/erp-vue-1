<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">销售开单</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>选择客户</label>
                                <selectCustomer :name="obj.customername" @selectObj="selectCustomer"></selectCustomer>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>销售日期</label>
                                <input type="date" class="form-control" v-model="obj.saledate">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>摘要说明</label>
                                <input type="text" class="form-control" v-model="obj.remark">
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">仓库</th>
                        <th class="text-center">货位</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">销售数量</th>
                        <th class="text-center">销售单价</th>
                        <th class="text-center">金额</th>
                        <th class="text-center">移除</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in list" :key="o.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ o.warehousename }}</td>
                        <td class="text-center">{{ o.cargolocationnumber }}</td>
                        <td class="text-center">{{ o.number }}</td>
                        <td class="text-center">{{ o.name }}</td>
                        <td class="text-center">{{ o.norm }}</td>
                        <td class="text-center">{{ o.model }}</td>
                        <td class="text-center">
                            {{ o.unit }}
                        </td>
                        <td class="text-center w120">
                            <input type="number" v-model="o.salecount" class="w-100" min="0">
                        </td>
                        <td class="text-center w120">
                            <input type="number" v-model="o.saleprice" class="w-100" min="0">
                        </td>
                        <td class="text-center">
                            {{ o.salecount * o.saleprice|number2 }}
                        </td>
                        <td class="text-center">
                            <a class="c-red" @click="removeItem(index)">移除</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default m-r-10" @click="selectCommodity">选择商品</button>
                <button class="btn btn-default m-r-10" @click="save">保存</button>
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>
        <selectStockCommodity ref="selectStockCommodity" @selectCommodity="selectStockCommodity"></selectStockCommodity>
    </div>
</template>

<script>
import selectCustomer from '@/components/selectCustomer.vue';
import selectStockCommodity from '@/components/selectStockCommodity.vue';

export default {
    name: "app",
    data() {
        return {
            obj: {},
            list: []
        }
    },
    created: function () {
        this.load();
    },
    components: {
        selectCustomer, selectStockCommodity
    },
    methods: {
        load: function () {
        },
        selectCustomer(obj) {
            this.$set(this.obj, 'customername', obj.name);
            this.$set(this.obj, 'customerid', obj.id);
        },
        selectCommodity() {
            this.$refs.selectStockCommodity.loadModal();
        },
        selectStockCommodity(obj) {
            let flag = false;
            this.list.forEach(function (e) {
                if (e.warehouseid === obj.warehouseid && e.cargolocationid === obj.cargolocationid && e.commodityid === obj.commodityid) {
                    flag = true;
                }
            })
            if (flag) {
                this.$root.alert('已选商品');
            } else {
                obj.id = null;
                this.list.push(obj);
            }
        },
        removeItem(index) {
            this.list.splice(index, 1);
        },
        save() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("sale/save", {
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(vm.list)
                }, function (data) {
                    sessionStorage.saleId = data.id;
                    vm.$router.push('xiaoShouDanMingXi');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
