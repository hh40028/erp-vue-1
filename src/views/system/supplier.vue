<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default m-b-0">
                    <div class="panel-heading">
                        <h3 class="panel-title">供应商列表</h3>
                    </div>
                    <div class="panel-body">
                        <div class="btn-group">
                            <button class="btn btn-default" @click="add">新建</button>
                            <button class="btn btn-default" :disabled="!obj.id" @click="edit">编辑</button>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th class="text-center" style="width: 50px">序号</th>
                            <th class="text-center" style="width: 50px">启用</th>
                            <th class="text-center">名称</th>
                            <th class="text-center">联系人</th>
                            <th class="text-center">联系电话</th>
                            <th class="text-center">付款账期(天)</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-for="(o) in list" :key="o.id" @click="selectObj(o)" :class="{'bg-success':o.id===obj.id}">
                            <td class="text-center" style="width: 50px">{{obj.xh}}</td>
                            <td class="text-center" style="width: 50px">
                                <input type="checkbox" v-model="o.status" @change="changeStatus(o)">
                            </td>
                            <td class="text-center">{{o.name}}</td>
                            <td class="text-center">{{o.contactperson}}</td>
                            <td class="text-center">{{o.contactnumber}}</td>
                            <td class="text-center">{{o.paymentdays|number0}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <page ref="page" @pager="load"></page>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <div  class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">编辑</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>名称</label>
                            <input type="text" v-model="obj.name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>城市</label>
                            <input type="text" v-model="obj.area" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>联系人</label>
                            <input type="text" v-model="obj.contactperson" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>联系电话</label>
                            <input type="text" v-model="obj.contactnumber" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>付款账期</label>
                            <input type="number" v-model="obj.paymentdays" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div  class="btn btn-primary" @click="save">保存</div>
                        <div  class="btn btn-default" data-dismiss="modal">关闭</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import page from '../../components/page.vue';
export default {
    name: "app",
    data() {
        return {
            type:true,
            filterString: '',
            list:[],
            obj:{}
        }
    },
    components:{
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
            this.$root.getData("supplier/getQueryList", {
                limit: limit,
                offset: offset,
                sort: "id",
                direction: "asc",
                filterString: this.filterString,
                type:this.type
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.list=[];
                data.children.forEach(function (e){
                    vm.$set(e,'xh',++offset);
                    vm.list.push(e);
                })

            })
        },
        add(){
            this.obj={};
            $('#editModal').modal('show');
        },
        edit(){
            $('#editModal').modal('show');
        },
        save(){
            let vm = this;
            this.obj.type=this.type;
            this.$root.getData("supplier/save", this.obj, function (data) {
                $('#editModal').modal('hide');
                vm.load();
            })
        },
        changeType(flag){
            this.type=flag;
            this.load();
        },
        changeStatus(obj){
            this.obj=obj;
            this.save();
        },
        selectObj(obj){
            this.obj=obj;
        }
    }
}
</script>

<style scoped>

</style>
