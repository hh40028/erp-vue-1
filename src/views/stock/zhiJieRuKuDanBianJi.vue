
<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">直接入库单</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>选择仓库</label>
                                <select class="form-control" v-model="obj.warehouseid">
                                    <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">{{warehouse.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>入库日期</label>
                                <input type="date" v-model="obj.entrydate" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>摘要说明</label>
                                <input type="text" v-model="obj.remark" class="form-control">
                            </div>
                        </div>
                    </div>
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
                    <tr v-for="(o,index) in list" :key="obj.id" @click="selectItem(o)">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{o.number}}</td>
                        <td class="text-center">{{o.name}}</td>
                        <td class="text-center">{{o.norm}}</td>
                        <td class="text-center">{{o.model}}</td>
                        <td class="text-center">
                            <select class="w100" v-model="o.bigpackage">
                                <option :value="false">{{o.unit}}</option>
                                <option :value="true">{{o.bigunit}}</option>
                            </select>
                        </td>
                        <td class="text-center">
                            <input type="number" v-model="o.incount" class="w100">
                        </td>
                        <td class="text-center">
                            <input type="number" v-model="o.inprice" class="w100">
                        </td>
                        <td class="text-center w100">
                            <selectCargolocation :name="o.cargolocationnumber" :warehouseid="obj.warehouseid" @selectObj="selectCargolocation"></selectCargolocation>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default m-r-10" @click="openCommodityModal">选择商品</button>
                <button class="btn btn-default m-r-10" @click="submit">提交入库</button>
                <router-link to="zhiJieRuKuDan" class="btn btn-default">返回</router-link>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="selectCommodity"></selectCommodity>
    </div>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import selectCargolocation from '@/components/selectCargolocation.vue';
export default {
    name: "app",
    data() {
        return {
            obj:{},
            list:[],
            warehouses:[]
        }
    },
    created: function () {
        this.loadWarehouses();
        this.load();
    },
    components: {
        selectCommodity,selectCargolocation
    },
    methods: {
        loadWarehouses(){
            let vm = this;
            this.$root.getData("warehouse/getList", {}, function (data) {
                vm.warehouses=data;
            })
        },
        load: function () {
        },
        openCommodityModal(){
            this.$refs.selectCommodity.load();
        },
        selectItem(obj){
            this.hwObj=obj;
        },
        selectCommodity(obj){
            console.log(obj);
            let flag=false;
            this.list.forEach(function (e){
                if(e.commodityid===obj.id){
                    flag=true;
                }
            })
            if(!flag){
                let c={
                    commodityid:obj.id,
                    name:obj.name,
                    number:obj.number,
                    norm:obj.norm,
                    model:obj.model,
                    unit:obj.unit,
                    bigunit:obj.bigpackage,
                    bigpackage:false,
                    conversionrelationship:obj.conversionrelationship
                }
                this.list.push(c);
            }else{
                this.$root.alert("已选商品");
            }
        },
        selectCargolocation(obj){
            this.$set(this.hwObj,'cargolocationid',obj.id);
            this.$set(this.hwObj,'cargolocationnumber',obj.number);
        },
        submit(){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("directstorage/save", {
                    obj:JSON.stringify(vm.obj),
                    rows:JSON.stringify(vm.list)
                }, function (data) {
                    vm.$router.push('zhiJieRuKuDan');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
