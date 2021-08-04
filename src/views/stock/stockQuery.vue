<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">库存查询</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <select v-model="warehouseid" class="form-control" @change="load">
                                <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">{{warehouse.name}}</option>
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
                </div>
                <v-table
                    error-content="暂无数据"
                    even-bg-color="rgba(0,0,0,0.02)"
                    :columns="columns"
                    :table-data="list"
                    :multiple-sort="false"
                    row-hover-color="#efefef"
                    row-click-color="#dff0d8"
                    sort-always
                    is-horizontal-resize
                    style="width:100%"
                    column-width-drag
                    is-vertical-resize
                    :row-click="selectItem"></v-table>
                <page ref="page" @pager="load"></page>
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
            warehouseid:0,
            warehouses:[
                {id:0,name:'全部仓库'}
            ],
            columns: [
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:false},
                {field: 'warehousename', title: '仓库', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:true},
                {field: 'cargolocationnumber', title: '货位', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:true},
                {field: 'number', title: '商品编号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:true},
                {field: 'name', title: '商品名称', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:true},
                {field: 'norm', title: '规格', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'model', title: '型号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'unit', title: '单位', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'stockprice', title: '库存均价', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'stockcount', title: '库存数量', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'amount', title: '合计', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
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
        loadWarehouses(){
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                data.forEach(function (e){
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
                warehouseid:this.warehouseid
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.list = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    if(!isNaN(e.stockprice)){
                        e.stockprice=e.stockprice.toFixed(2);
                    }
                    if(!isNaN(e.stockcount)){
                        e.stockcount=e.stockcount.toFixed(2);
                    }
                    if(!isNaN(e.amount)){
                        e.amount=e.amount.toFixed(2);
                    }
                    vm.list.push(e);
                })

            })
        },
        selectItem(rowIndex, rowData, column) {
            this.obj=rowData;
        },
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
