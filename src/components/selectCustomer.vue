<template>
    <div class="row">
        <div class="col-md-12">
            <input type="text" class="form-control" v-model="getName" @click="load" readonly>
            <div class="modal fade" id="selectSupplierModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">选择客户</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6 col-md-offset-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="filterString" placeholder="过滤名称...">
                                        <label class="input-group-btn">
                                            <button class="btn btn-default"  @click="filterString=''" :disabled="!filterString">清除</button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered m-b-0">
                            <thead>
                            <tr>
                                <th class="text-center" style="width: 50px">序号</th>
                                <th class="text-center">名称</th>
                                <th class="text-center">区域</th>
                                <th class="text-center">联系人</th>
                                <th class="text-center">联系电话</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(obj,index) in list" :key="obj.id" @click="selectItem(obj)">
                                <td class="text-center">{{index+1}}</td>
                                <td class="text-center">{{obj.name}}</td>
                                <td class="text-center">{{obj.area}}</td>
                                <td class="text-center">{{obj.contactperson}}</td>
                                <td class="text-center">{{obj.contactnumber}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <page ref="page" @pager="load"></page>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import page from '@/components/page.vue';
export default {
    props:['name'],
    name: "app",
    data() {
        return {
            filterString:'',
            timeout:null,
            list:[]
        }
    },
    components: {
        page
    },
    computed:{
        getName:function (){
            return this.name;
        }
    },
    created: function () {
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
            this.$root.getData("customer/getQueryList", {
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
                $('#selectSupplierModal').modal('show');
            })
        },
        selectItem(obj) {
            this.$emit('selectObj',obj);
            $('#selectSupplierModal').modal('hide');
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
