<template>
    <div class="modal fade" id="selectStockCommodityModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">选择库存商品</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <select v-model="warehouseid" class="form-control" @change="load">
                                <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">{{ warehouse.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="filterString" placeholder="过滤名称...">
                                <label class="input-group-btn">
                                    <button class="btn btn-default" @click="filterString=''" :disabled="!filterString">清除</button>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body p-0">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered table-hover m-t-15">
                                    <thead>
                                    <tr>
                                        <th class="text-center w50">序号</th>
                                        <th class="text-center">仓库</th>
                                        <th class="text-center">货位</th>
                                        <th class="text-center">编号</th>
                                        <th class="text-center">名称</th>
                                        <th class="text-center">规格</th>
                                        <th class="text-center">型号</th>
                                        <th class="text-center">单位</th>
                                        <th class="text-center">库存数量</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(obj,index) in list" :key="obj.id" @click="selectObj(obj)">
                                        <td class="text-center w50">{{ index + 1 }}</td>
                                        <td class="text-center">{{ obj.warehousename }}</td>
                                        <td class="text-center">{{ obj.cargolocationnumber }}</td>
                                        <td class="text-center">{{ obj.number }}</td>
                                        <td class="text-center">{{ obj.name }}</td>
                                        <td class="text-center">{{ obj.norm }}</td>
                                        <td class="text-center">{{ obj.model }}</td>
                                        <td class="text-center">{{ obj.unit }}</td>
                                        <td class="text-center">{{ obj.stockcount }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <page ref="page" @pager="load"></page></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import page from '@/components/page.vue';

export default {
    name: "app",
    data() {
        return {
            warehouseid: 0,
            warehouses: [
                {id: 0, name: '全部仓库'}
            ],
            list: [],
            filterString: '',
            obj: {}
        }
    },
    created: function () {
        this.loadWarehouses();
        this.load();
    },
    components: {
        page
    },
    methods: {
        loadModal() {
            $('#selectStockCommodityModal').modal('show');
        },
        loadWarehouses() {
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                data.forEach(function (e) {
                    vm.warehouses.push(e);
                })
            })
        },
        load: function () {
            let offset = 0;
            let limit = 15;
            if (this.$refs.page) {
                offset = this.$refs.page.pageNo * this.$refs.page.pageSize;
                limit = this.$refs.page.pageSize;
            }
            let vm = this;
            this.$root.getData("stock/getQueryList", {
                limit: limit,
                offset: offset,
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                warehouseid: this.warehouseid
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.list = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    if (!isNaN(e.stockprice)) {
                        e.stockprice = e.stockprice.toFixed(2);
                    }
                    if (!isNaN(e.stockcount)) {
                        e.stockcount = e.stockcount.toFixed(2);
                    }
                    if (!isNaN(e.amount)) {
                        e.amount = e.amount.toFixed(2);
                    }
                    vm.list.push(e);
                })

            })
        },
        selectObj(obj){
            this.$emit('selectCommodity',obj);
        }
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.load();
                }, 500);
            }
        }
    },
}
</script>

<style scoped>

</style>
