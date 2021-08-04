<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">新增</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="edit">编辑</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">详细</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="yanghu">养护</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">故障</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="view">维修</button>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="filterString" placeholder="过滤名称...">
                                <label class="input-group-btn">
                                    <button class="btn btn-default"  @click="filterString=''" :disabled="!filterString">清除</button>
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
            filterString:'',
            list:[],
            columns:[
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'number', title: '设备编码', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'name', title: '设备名称', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'model', title: '设备型号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'norm', title: '设备规格', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'usedeptname', title: '使用部门', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'size', title: '外形尺寸', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'use', title: '设备用途', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'weight', title: '设备重量', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'typename', title: '设备类型', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'storagelocation', title: '存放地点', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'attributionname', title: '归属公司', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'originalvalue', title: '设备原值', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'manufacturer', title: '制造公司', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'principalname', title: '设备负责人', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'manufacturedate', title: '制造日期', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'statusname', title: '设备状态', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'serialnumber', title: '出厂编号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'enabledate', title: '启用日期', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'purchasedate', title: '采购日期', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
                {field: 'contractnumber', title: '合同号', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: false},
            ],
            obj:{},
            timeout:null
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
            this.$root.getData("equipment/getQueryList", {
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
            sessionStorage.removeItem('equipmentObj');
            this.$router.push('bianJiSheBei');
        },
        edit(){
            sessionStorage.equipmentObj=JSON.stringify(this.obj);
            this.$router.push('bianJiSheBei');
        },
        yanghu(){
            sessionStorage.equipmentObj=JSON.stringify(this.obj);
            this.$router.push('sheBeiYangHu');
        },
        view(){
            sessionStorage.equipmentObj=JSON.stringify(this.obj);
            this.$router.push('sheBeiMingXi');
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
