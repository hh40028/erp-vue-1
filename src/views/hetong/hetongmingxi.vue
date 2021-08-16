<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">合同明細</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">合同单号</td>
                        <td class="text-left">{{ obj.contractno }}</td>
                        <td class="text-right">合同名称</td>
                        <td class="text-left">{{ obj.contractname }}</td>
                        <td class="text-right">合同类型</td>
                        <td class="text-left">{{ obj.typename }}</td>
                        <td class="text-right">备注</td>
                        <td class="text-left">{{ obj.remark }}</td>
                    </tr>
                    <tr>
                        <td class="text-right">业务部门</td>
                        <td class="text-left">{{ obj.depname }}</td>
                        <td class="text-right">业务员</td>
                        <td class="text-left">{{ obj.username }}</td>
                        <td class="text-right">客户名称</td>
                        <td class="text-left">{{ obj.customername }}</td>
                        <td class="text-right">客户代表</td>
                        <td class="text-left">{{ obj.customeruser }}</td>
                    </tr>
                    <tr>
                        <td class="text-right">签订日期</td>
                        <td class="text-left">{{ obj.signdate }}</td>
                        <td class="text-right">生效日期</td>
                        <td class="text-left">{{ obj.effectivedate }}</td>
                        <td class="text-right">开始日期</td>
                        <td class="text-left">{{ obj.startdate }}</td>
                        <td class="text-right">终止日期</td>
                        <td class="text-left">{{ obj.enddate }}</td>
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
                        <th class="text-center">合同数量</th>
                        <th class="text-center">合同单价</th>
                        <th class="text-center">金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in obj.children" :key="o.id">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ o.productid }}</td>
                        <td class="text-center">{{ o.name }}</td>
                        <td class="text-center">{{ o.norm }}</td>
                        <td class="text-center">{{ o.model }}</td>
                        <td class="text-center">{{ o.unit }}</td>
                        <td class="text-center">{{ o.count|number2 }}</td>
                        <td class="text-center">{{ o.price|number2 }}
                        </td>
                        <td class="text-center">
                            {{ o.total|number2 }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default" v-if="obj.status===0" @click="startProcess">发送审批</button>
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>
        <selectUser ref="selectUser" show-input="true" @selectObj="send"></selectUser>
    </div>
</template>

<script>
import selectUser from '@/components/selectUser.vue';
export default {
    props:['id'],
    name: "app",
    data() {
        return {
            obj: {}
        }
    },
    created: function () {
        if(!this.id){
            this.id=sessionStorage.contractId;
        }
        this.load();
    },
    components: {
        selectUser
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("contract/getMap", {id: this.id}, function (data) {
                vm.obj = data;
            })
        },
        startProcess(){
            this.$refs.selectUser.load();
        },
        send(obj){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("contract/startProcess", {id:vm.obj.id,sprid:obj.id}, function (data) {
                    vm.$router.push('hetong');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
