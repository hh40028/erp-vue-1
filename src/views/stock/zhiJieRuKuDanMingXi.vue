<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">直接入库单明细</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">入货仓库</td>
                        <td class="text-left">{{obj.warehousename}}</td>
                        <td class="text-right">入库日期</td>
                        <td class="text-left">{{obj.entrydate}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">摘要说明</td>
                        <td class="text-left" colspan="3">{{obj.remark}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="panel-body"></div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">入库数量</th>
                        <th class="text-center">入库单价</th>
                        <th class="text-center">入库货位</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in list" :key="obj.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{o.number}}</td>
                        <td class="text-center">{{o.name}}</td>
                        <td class="text-center">{{o.norm}}</td>
                        <td class="text-center">{{o.model}}</td>
                        <td class="text-center">{{o.bigpackage?o.bigunit:o.unit}}{{o.bigpackage?"(大包装)":""}}</td>
                        <td class="text-center">{{o.incount|number2}}</td>
                        <td class="text-center">{{o.inprice|number2}}</td>
                        <td class="text-center w100">{{o.cargolocationnumber}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-danger m-r-10" v-if="!obj.redback" @click="redback">删除</button>
                <router-link to="zhiJieRuKuDan" class="btn btn-default">返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            obj:{},
            list:[],
        }
    },
    created: function () {
        if(sessionStorage.directstorageObj){
            this.obj=JSON.parse(sessionStorage.directstorageObj);
            this.load();
        }
    },
    methods: {
        load(){
            let vm = this;
            this.$root.getData("directstoragechild/getViewList", {did:this.obj.id}, function (data) {
                vm.list=data;
            })
        },
        redback(){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("directstorage/redback", {id:vm.obj.id}, function (data) {
                    vm.$router.push('zhiJieRuKuDan');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>

