<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div style="position: absolute;top:30px;right:30px" v-if="!obj.redback && obj.submit"><img src="../../assets/images/ruku.png" class="w100"></div>
                    <div style="position: absolute;top:30px;right:30px" v-if="obj.redback"><img src="../../assets/images/delete.png" class="w100"></div>
                    <h3 class="panel-title">入库单信息</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">单据编号</td>
                        <td class="text-left">{{ obj.number }}</td>
                        <td class="text-right">仓库名称</td>
                        <td class="text-left">{{ obj.warehousename }}</td>
                    </tr>
                    <tr>
                        <td class="text-right">入库类型</td>
                        <td class="text-left">{{ obj.type }}</td>
                        <td class="text-right">关联单号</td>
                        <td class="text-left">{{ obj.relevancenumber }}</td>
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
                        <th class="text-center">单位</th>
                        <th class="text-center">入库数量</th>
                        <th class="text-center">入库单价</th>
                        <th class="text-center">入库货位</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in list" :key="o.id" @click="selectItem(o)">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ o.number }}</td>
                        <td class="text-center">{{ o.name }}</td>
                        <td class="text-center">{{ o.norm }}</td>
                        <td class="text-center">{{ o.model }}</td>
                        <td class="text-center">{{ o.bigpackage ? o.bigunit : o.unit }}</td>
                        <td class="text-center">{{o.incount|number2}}</td>
                        <td class="text-center">{{o.inprice|number2}}</td>
                        <td class="text-center" style="width:150px"  v-if="!obj.submit && process">
                            <selectCargolocation :warehouseid="o.warehouseid" :name="o.cargolocationnumber" @selectObj="selectObj"></selectCargolocation>
                        </td>
                        <td class="text-center" style="width:150px"  v-if="obj.submit">{{o.cargolocationnumber}}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="text-center" v-if="!process">
<!--                <button class="btn btn-default m-r-10" @click="submit" v-if="!obj.submit">提交入库</button>-->
                <button class="btn btn-default m-r-10" v-if="obj.submit">打印</button>
                <div onclick="history.back()" class="btn btn-default">返回</div>
            </div>
        </div>
    </div>
</template>

<script>
import selectCargolocation from '@/components/selectCargolocation.vue';
export default {
    props: {
        process: {
            type: Boolean,
            default: false
        }
    },
    name: "app",
    data() {
        return {
            obj: {},
            list: [],
            hwObj:{}
        }
    },
    created: function () {
        if (sessionStorage.inboundorderId) {
            this.load();
        }
    },
    components: {
        selectCargolocation
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("inboundorder/getMap", {id:sessionStorage.inboundorderId}, function (data) {
                vm.obj=data;
            })
            this.$root.getData("inboundorderchild/getList", {wid: sessionStorage.inboundorderId}, function (data) {
                vm.list = data;
            })
        },
        selectItem(obj){
            this.hwObj=obj;
        },
        selectObj(obj){
            this.$set(this.hwObj,'cargolocationid',obj.id);
            this.$set(this.hwObj,'cargolocationnumber',obj.text);
            let vm = this;
            this.$root.getData("inboundorderchild/save", this.hwObj, function (data) {

            })
        },
        submit(){
            let count=0;
            this.list.forEach(function (e){
                if(!e.cargolocationid){
                    count++;
                }
            })
            if(count>0){
                this.$root.alert('入库货位有遗漏');
            }else{
                let vm = this;
                this.$root.confirm('确认吗?',function (){
                    vm.$root.getData("inboundorder/inStock", {id:vm.obj.id}, function (data) {
                        vm.obj=data;
                        // vm.$router.push('ruKuDan');
                    })
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
