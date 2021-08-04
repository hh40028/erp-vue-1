<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default m-b-0">
                <div class="panel-heading">
                    <h3 class="panel-title">商品列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">新建</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="edit">编辑</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="deleteObj">删除</button>
                            </div>
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
            </div>
            <page ref="page" @pager="load"></page>
        </div>
    </div>
</template>

<script>
import page from '@/components/page.vue';

export default {
    name: "app",
    data() {
        return {
            columns: [
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'number', title: '商品编号', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'name', title: '商品名称', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'typename', title: '商品类型', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'unit', title: '计量单位', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'purchaseprice', title: '采购单价', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'saleprice', title: '销售单价', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'color', title: '颜色', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'use', title: '用途', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'source', title: '来源', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'norm', title: '规格', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'model', title: '型号', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'origin', title: '产地', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'barcode', title: '条码', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'supplierid', title: '供应商', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'bigpackage', title: '大包装单位', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'conversionrelationship', title: '换算关系', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'remark', title: '产品备注', width: 100, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
            ],
            list: [],
            filterString: '',
            obj: {}
        }
    },
    components: {
        page
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let offset = 0;
            let limit = 15;
            if (this.$refs.page) {
                offset = this.$refs.page.pageNo * this.$refs.page.pageSize;
                limit = this.$refs.page.pageSize;
            }
            let vm = this;
            this.$root.getData("commodity/getQueryList", {
                limit: limit,
                offset: offset,
                sort: "id",
                direction: "desc",
                filterString: this.filterString
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.list = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    vm.list.push(e);
                })

            })
        },
        selectItem(rowIndex, rowData, column) {
            this.obj = rowData;
        },
        add() {
            sessionStorage.removeItem('commodityObj');
            this.$router.push('bianJiShangPin');
        },
        edit() {
            sessionStorage.commodityObj = JSON.stringify(this.obj);
            this.$router.push('bianJiShangPin');
        },
        deleteObj() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("commodity/delete", {id: vm.obj.id}, function (data) {
                    vm.load();
                })
            })
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
