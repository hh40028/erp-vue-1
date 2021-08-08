<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="pull-right">
                        <label>
                            <input type="checkbox" v-model="isRedback" @change="load"> <span :class="{'c-red':isRedback}">显示删除</span>
                        </label>
                    </div>
                    <h3 class="panel-title">采购单列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">开单</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">查看</button>
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
                    :row-click="selectItem"
                    :row-dblclick="view"></v-table>
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
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: false},
                {field: 'inbound', title: '入库', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: true},
                {field: 'number', title: '单据号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: true},
                {field: 'suppliername', title: '供应商', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: true},
                {field: 'deptname', title: '采购部门', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false, isResize: true},
                {field: 'purchasedate', title: '采购日期', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false, isResize: true},
                {field: 'managername', title: '经办人', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false, isResize: true},
                {field: 'username', title: '编制人', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false, isResize: true},
                {field: 'amount', title: '采购金额', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false, isResize: true},
                {field: 'remark', title: '摘要', width: 350, titleAlign: 'left', columnAlign: 'left', isFrozen: false, isResize: true},
            ],
            list: [],
            filterString: '',
            obj: {},
            isRedback: false
        }
    },
    created: function () {
        if (sessionStorage.purchaseRedback) {
            this.isRedback = sessionStorage.purchaseRedback;
        }
        this.load();
    },
    components: {
        page
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
            let url = 'purchase/getQueryList';
            if (this.isRedback) {
                url = 'purchase/getQueryListByRedback';
            }
            this.$root.getData(url, {
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
                    if (!isNaN(e.amount)) {
                        e.amount = e.amount.toFixed(2);
                    }
                    if (e.submit && e.enterwarehouse) {
                        e.inbound = "完成";
                    }
                    if (e.submit && !e.enterwarehouse) {
                        e.inbound = "提交";
                    }
                    vm.list.push(e);
                })

            })
        },
        selectItem(rowIndex, rowData, column) {
            this.obj = rowData;
        },
        add() {
            sessionStorage.removeItem('purchaseId');
            this.$router.push('purchaseEdit');
        },
        view() {
            sessionStorage.purchaseId = this.obj.id;
            this.$router.push('purchaseview');
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
