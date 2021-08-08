<template v-cloak>
    <div class="row">
        <div class="col-md-12">
            <div style="position: absolute;top:30px;right:30px" v-if="!obj.redback && obj.enterwarehouse"><img src="../../assets/images/ruku.png" class="w100"></div>
            <div style="position: absolute;top:30px;right:30px" v-if="obj.redback"><img src="../../assets/images/delete.png" class="w100"></div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">采购单详细</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right wp-15">单据编号</td>
                        <td class="text-left wp-35">{{ obj.number }}</td>
                        <td class="text-right wp-15">采购日期</td>
                        <td class="text-left wp-35">{{ obj.purchasedate }}</td>
                    </tr>
                    <tr>
                        <td class="text-right">采购部门</td>
                        <td class="text-left">{{ obj.deptname }}</td>
                        <td class="text-right">经办人</td>
                        <td class="text-left">{{ obj.managername }}</td>
                    </tr>
                    <tr>
                        <td class="text-right">合计金额</td>
                        <td class="text-left">{{ obj.amount|number2 }} 元</td>
                        <td class="text-right">使用订金</td>
                        <td class="text-left">{{ obj.usedeposit|number2 }} 元</td>
                    </tr>
                    <tr>
                        <td class="text-right">编制人</td>
                        <td class="text-left">{{ obj.username }}</td>
                        <td class="text-right">摘要说明</td>
                        <td class="text-left">{{ obj.remark }}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">商品列表</h3>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">仓库</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">商品类型</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">数量</th>
                        <th class="text-center">单价(元)</th>
                        <th class="text-center">金额(元)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(child,index) in list" :key="obj.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ child.warehousename }}</td>
                        <td class="text-center">{{ child.name }}</td>
                        <td class="text-center">{{ child.typename }}</td>
                        <td class="text-center">{{ child.norm }}</td>
                        <td class="text-center">{{ child.model }}</td>
                        <td class="text-center">{{ child.bigpackage ? child.bigunit : child.unit }}</td>
                        <td class="text-center w100">{{ child.commoditycount|number2 }}</td>
                        <td class="text-center w100">{{ child.commodityprice|number2 }}</td>
                        <td class="text-center">{{ child.commoditycount * child.commodityprice|number2 }}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th class="text-center" colspan="9">合计</th>
                        <th class="text-center">{{ obj.amount|number2 }}</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div class="text-center" v-if="!process && showBtns">
                <div class="btn-group">
                    <button class="btn btn-primary" v-if="!obj.redback && !obj.submit" @click="submit">提交入库</button>
                    <button class="btn btn-danger" v-if="!obj.redback" @click="redback">删除</button>
                    <button class="btn btn-warning" v-if="!obj.redback && !obj.submit" @click="edit">编辑</button>
                    <button class="btn btn-info" v-if="!obj.redback" @click="printPDF">打印</button>
                    <router-link to="purchaseList" class="btn btn-default">返回</router-link>
                </div>
            </div>
        </div>
        <div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" style="width: 900px">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">报表打印</h4>
                    </div>
                    <div id="pdf"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            process: false,
            purchaseId: 0,
            obj: {},
            list: [],
            showBtns:false
        }
    },
    computed: {
        getPurchaseId: function () {
            return this.purchaseId
        }
    },
    created: function () {
        if (this.purchaseId === 0) {
            this.purchaseId = sessionStorage.purchaseId;
        }
        if (this.purchaseId) {
            this.load();
        }
    },
    methods: {
        //流程表单调用组件应调用该方法赋值
        processInit(process, purchaseId) {
            this.process = process;
            this.purchaseId = purchaseId;
            this.load();
        },
        load: function () {
            let vm = this;
            this.$root.getData("purchase/getMap", {id: this.purchaseId}, function (data) {
                vm.obj = data.obj;
                vm.list = data.list;
                vm.showBtns=true;
            })
        },
        printPDF() {
            let vm = this;
            this.$root.getData("purchase/buildPDF", {id: this.obj.id}, function (data) {
                vm.reportPdfUrl = vm.$root.basePath + 'common/getReportPdf?r=' + Math.random() + '&filename=' + data;
                $('#pdf').empty();
                $('#pdf').append("<object classid=\"clsid:CA8A9780-280D-11CF-A24D-444553540000\" width=\"900\" height=\"800\" border=\"0\">\n" +
                    "                        <param name=\"_Version\" value=\"65539\">\n" +
                    "                        <param name=\"_ExtentX\" value=\"20108\">\n" +
                    "                        <param name=\"_ExtentY\" value=\"10866\">\n" +
                    "                        <param name=\"_StockProps\" value=\"0\">\n" +
                    "                        <param name=\"SRC\" value=\"pdf/test.pdf\">\n" +
                    "                        <object data=\"" + vm.reportPdfUrl + "\" type=\"application/pdf\" width=\"900\" height=\"800\">\n" +
                    "                        </object>\n" +
                    "                    </object>")
                $('#viewModal').modal('show');
            })
        },
        redback() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("purchase/redback", {id: vm.obj.id}, function (data) {
                    vm.$set(vm.obj, 'redback', data);
                    if (!vm.process) {
                        vm.$router.push('purchaseList');
                    } else {
                        vm.$root.alert('操作成功', function () {
                            vm.$router.push('todoList');
                        });
                    }
                })
            })
        },
        edit() {
            sessionStorage.purchaseId = this.obj.id;
            this.$router.push('purchaseEdit');
        },
        submit() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("purchase/submit", {id: vm.obj.id}, function (data) {
                    vm.$router.push('purchaseList');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
