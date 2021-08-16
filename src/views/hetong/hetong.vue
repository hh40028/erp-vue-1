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
                    <h3 class="panel-title">合同列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">新建</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">查看</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">复制新建</button>
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
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true,isResize:false},
                {field: 'contractno', title: '合同单号', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                 {field: 'contractname', title: '合同名称', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                  {field: 'contracttype', title: '合同类型', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
               {field: 'signdate', title: '签订日期', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'depid', title: '部门编号', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'userid', title: '业务员ID', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'customerid', title: '客户ID', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'customeruser', title: '客户代表', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'startdate', title: '合同开始日期', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'enddate', title: '合同结束日期', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'effectivedate', title: '合同生效日期', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'remark', title: '备注', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
                {field: 'status', title: '合同状态', width: 80, titleAlign: 'center', columnAlign: 'center', isFrozen: false,isResize:true},
            ],
            list: [],
            filterString: '',
            obj: {},
            isRedback:false
        }
    },
    created: function () {
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
            let url='contract/getQueryList';
            if(this.isRedback){
                url='Contract/getQueryListByRedback';
            }
            this.$root.getData(url, {
                tablename: "contractview",
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
            this.obj=rowData;
        },
        add(){
            this.$router.push('hetongbianji');
        },
        view(){
            sessionStorage.contractId=this.obj.id;
            this.$router.push('hetongmingxi');
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