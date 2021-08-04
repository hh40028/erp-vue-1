<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">工序管理</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">新增</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="edit">编辑</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="deleteObj">删除</button>
                                <button class="btn btn-default" :disabled="!obj.id" @click="goView">详细</button>
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
                <page ref="page" @pager="load"></page>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑工序信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>工序编号</label>
                                <input type="text" v-model="obj.number" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>工序名称</label>
                                <input type="text" v-model="obj.name" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>参考单价</label>
                                <input type="number" v-model="obj.price" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>生产时间(分钟)</label>
                                <input type="number" v-model="obj.productiontime" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <label>生产部门</label>
                                <selectOrganization :orgname="obj.productiondeptname" @selectOrg="selectOrg"></selectOrganization>
                            </div>
                            <div class="form-group col-md-12">
                                <label>工序内容</label>
                                <textarea rows="5" class="form-control" v-model="obj.content"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" @click="save">保存</button>
                        <button class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="selectCommodity"></selectCommodity>
    </div>
</template>

<script>
import page from '@/components/page.vue';
import selectCommodity from '@/components/selectCommodity.vue';
import selectOrganization from '@/components/selectOrganization.vue';

export default {
    name: "app",
    data() {
        return {
            filterString: '',
            list: [],
            columns: [
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isResize: false, isFrozen: true},
                {field: 'number', title: '工序编号', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: false, isFrozen: true},
                {field: 'name', title: '工序名称', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, isFrozen: true},
                {field: 'price', title: '参考单价(元)', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: false, isFrozen: false},
                {field: 'productiontime', title: '生产时间(分钟)', width: 120, titleAlign: 'center', columnAlign: 'center', isResize: false, isFrozen: false},
                {field: 'productiondeptname', title: '生产部门', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, isFrozen: false},
                {field: 'content', title: '工序内容', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, isFrozen: false},
            ],
            obj: {},
            timeout: null
        }
    },
    created: function () {
        this.load();
    },
    components: {
        page, selectCommodity,selectOrganization
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
            this.$root.getData("worksequence/getQueryList", {
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
        selectOrg(obj){
            this.$set(this.obj,'productiondeptname',obj.text);
            this.$set(this.obj,'productiondeptid',obj.id);
        },
        selectItem(rowIndex, rowData, column) {
            this.obj = this.$root.clone(rowData);
        },
        add() {
            // this.$refs.selectCommodity.load();
            this.obj={};
            $('#editModal').modal('show');
        },
        edit() {
            $('#editModal').modal('show');
        },
        save() {
            let vm = this;
            this.$root.getData("worksequence/save", this.obj, function (data) {
                vm.obj = {};
                $('#editModal').modal('hide');
                vm.load();
            })
        },
        deleteObj() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("worksequence/delete", {id: vm.obj.id}, function (data) {
                    vm.load();
                })
            })
        },
        goView() {
            sessionStorage.worksequenceObj = JSON.stringify(this.obj);
            this.$router.push('gongXuHuanLiMingXi');
        },
        selectCommodity(obj) {
            this.obj = {
                commodityid: obj.id,
                number: obj.number,
                name: obj.name,
                unit: obj.unit,
                norm: obj.norm
            };
            this.obj.id = 0;
            this.obj.commodityid = obj.id;
            this.obj.remark = '';
            $('#editModal').modal('show');
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
