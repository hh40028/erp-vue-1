<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">销售订单明细</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">订单编号</td>
                        <td class="text-left">{{obj.number}}</td>
                        <td class="text-right">订货客户</td>
                        <td class="text-left">{{obj.customername}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">订货日期</td>
                        <td class="text-left">{{obj.saleorderdate}}</td>
                        <td class="text-right">交货日期</td>
                        <td class="text-left">{{obj.enddate}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">订货金额</td>
                        <td class="text-left">{{obj.total|number2}}</td>
                        <td class="text-right">合同编号</td>
                        <td class="text-left">{{obj.contractno}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="panel-body">

                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">订货数量</th>
                        <th class="text-center">订货单价</th>
                        <th class="text-center">金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in obj.children" :key="o.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{o.number}}</td>
                        <td class="text-center">{{o.name}}</td>
                        <td class="text-center">{{o.norm}}</td>
                        <td class="text-center">{{o.model}}</td>
                        <td class="text-center">{{o.salecount}}</td>
                        <td class="text-center">{{o.saleprice|number2}}</td>
                        <td class="text-center">{{o.salecount*o.saleprice|number2}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['id'],
    name: "app",
    data() {
        return {
            obj:{
                children:[]
            }
        }
    },
    created: function () {
        if(!this.id){
            this.id=sessionStorage.saleorderId;
        }
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("saleorder/getMap", {id:this.id}, function (data) {
                vm.obj=data;
            })
        }
    }
}
</script>

<style scoped>

</style>
