<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">销售开单</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">客户名称</td>
                        <td class="text-left">{{obj.customername}}</td>
                        <td class="text-right">销售日期</td>
                        <td class="text-left">{{obj.saledate}}</td>
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
                        <th class="text-center">仓库</th>
                        <th class="text-center">货位</th>
                        <th class="text-center">商品编号</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">销售数量</th>
                        <th class="text-center">销售单价</th>
                        <th class="text-center">金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in obj.children" :key="o.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ o.warehousename }}</td>
                        <td class="text-center">{{ o.cargolocationnumber }}</td>
                        <td class="text-center">{{ o.number }}</td>
                        <td class="text-center">{{ o.name }}</td>
                        <td class="text-center">{{ o.norm }}</td>
                        <td class="text-center">{{ o.model }}</td>
                        <td class="text-center">
                            {{ o.unit }}
                        </td>
                        <td class="text-center">{{o.salecount|number2}}
                        </td>
                        <td class="text-center">{{o.saleprice|number2}}
                        </td>
                        <td class="text-center">
                            {{ o.salecount * o.saleprice|number2 }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "app",
    data() {
        return {
            obj: {}
        }
    },
    created: function () {
        this.load();
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("sale/getMap", {id:sessionStorage.saleId}, function (data) {
                vm.obj=data;
            })
        },
    }
}
</script>

<style scoped>

</style>
