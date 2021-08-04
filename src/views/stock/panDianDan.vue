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
                    <h3 class="panel-title">盘点单列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" @click="add">新建</button>
                                <button class="btn btn-default" :disabled="!selectObj.id" @click="view">查看</button>
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
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">单据号</th>
                        <th class="text-center">仓库名称</th>
                        <th class="text-center">盘点日期</th>
                        <th class="text-center">盘盈金额</th>
                        <th class="text-center">盘亏金额</th>
                        <th class="text-center">提交</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,index) in list" :key="obj.id"  @click="selectItem(obj)" @dblclick="view"
                        :class="{'bg-success':selectObj.id===obj.id,'bg-danger':obj.redback}">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ obj.number }}</td>
                        <td class="text-center">{{ obj.warehousename }}</td>
                        <td class="text-center">{{ obj.checkdate }}</td>
                        <td class="text-center">{{ obj.profit|number2 }}</td>
                        <td class="text-center">{{ obj.loss|number2 }}</td>
                        <td class="text-center" :class="{'c-teal':obj.submit}">{{ obj.submit ? "已提交" : "" }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <page ref="page" @pager="load"></page>
        </div>
        <div class="modal fade" id="editStockcheckModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">新建盘点单</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>盘点仓库</label>
                            <select v-model="selectObj.warehouseid" class="form-control">
                                <option v-for="w in warehouses" :key="w.id" :value="w.id">{{w.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>盘点时间</label>
                            <input type="date" v-model="selectObj.checkdate" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="save">提交</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
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
            list: [],
            filterString: '',
            selectObj: {},
            isRedback: false,
            warehouses:[]
        }
    },
    created: function () {
        this.loadWarehous();
        this.load();
    },
    components: {
        page
    },
    methods: {
        loadWarehous(){
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                vm.warehouses=data;
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
            let url = 'stockcheck/getQueryList';
            if (this.isRedback) {
                url = 'stockcheck/getQueryListByRedback';
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
                    vm.list.push(e);
                })

            })
        },
        selectItem(obj) {
            this.selectObj = obj;
        },
        add() {
            $('#editStockcheckModal').modal('show');
            this.selectObj = {};
        },
        save(){
            let vm = this;
            if(!this.selectObj.warehouseid){
                this.$root.alert('请选择盘点仓库');
            }
            else if(!this.selectObj.checkdate){
                this.$root.alert('请选择盘点日期');
            }else{
                let warehousename='';
                this.warehouses.forEach(function (e){
                    if(e.id===vm.selectObj.warehouseid){
                        warehousename=e.name;
                    }
                })
                this.$root.confirm(warehousename+'将被锁定，期间不可以出入库操作，确认吗?',function (){
                    vm.$root.getData("stockcheck/saveStockcheck", vm.selectObj, function (data) {
                        $('#editStockcheckModal').modal('hide');
                        sessionStorage.stockcheckObj=JSON.stringify(data);
                        vm.$router.push('panDianDanBianJi');
                    })
                })
            }
        },
        view() {
            sessionStorage.stockcheckObj = JSON.stringify(this.selectObj);
            this.$router.push('panDianDanBianJi');
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
