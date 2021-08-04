<template>
    <div class="modal fade" id="selectCommodityModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">选择商品</h4>
                </div>
                <div class="modal-body p-0">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered table-hover m-b-0">
                                <thead>
                                <tr>
                                    <th class="text-center w50">序号</th>
                                    <th class="text-center">产品编号</th>
                                    <th class="text-center">产品名称</th>
                                    <th class="text-center">产品规格</th>
                                    <th class="text-center">计量单位</th>
                                    <th class="text-center">备注说明</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(obj,index) in list" :key="obj.id" @click="selectItem(obj)">
                                    <td class="text-center w50">{{index+1}}</td>
                                    <td class="text-center">{{obj.number}}</td>
                                    <td class="text-center">{{obj.name}}</td>
                                    <td class="text-center">{{obj.norm}}</td>
                                    <td class="text-center">{{obj.unit}}</td>
                                    <td class="text-center">{{obj.remark}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <page ref="page" @pager="load"></page>
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
    props:['single'],
    name: "app",
    data() {
        return {
            filterString:'',
            list:[],
            timeout:null
        }
    },
    created: function () {

    },
    components: {
        page
    },
    methods: {
        load(){
            $('#selectCommodityModal').modal('show');
            this.loadList();
        },
        loadList: function () {
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
        selectItem(obj) {
            this.$emit("selectCommodity",obj);
            if(this.single){
                $('#selectCommodityModal').modal('hide');
            }
        },
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.loadList();
                }, 500);
            }
        }
    },
}
</script>

<style scoped>

</style>
