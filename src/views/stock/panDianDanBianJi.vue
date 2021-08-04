<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ obj.warehousename }}盘点单</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right">盘点仓库</td>
                        <td class="text-left">{{ obj.warehousename }}</td>
                        <td class="text-right">盘点日期</td>
                        <td class="text-left">{{ obj.checkdate }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="panel-body">
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">编号</th>
                        <th class="text-center">名称</th>
                        <th class="text-center">规格</th>
                        <th class="text-center">型号</th>
                        <th class="text-center">单位</th>
                        <th class="text-center">仓库货位</th>
                        <th class="text-center">盘点数量</th>
                        <th class="text-center">移除</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in list" :key="o.id" @click="selectItem(o)">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{ o.number }}</td>
                        <td class="text-center">{{ o.name }}</td>
                        <td class="text-center">{{ o.norm }}</td>
                        <td class="text-center">{{ o.model }}</td>
                        <td class="text-center w100">
                            <select v-model="o.bigpackage" class="w-100 text-center">
                                <option :value="false">{{ o.unit }}</option>
                                <option v-if="o.bigunit" :value="true">{{ o.bigunit }}</option>
                            </select>
                        </td>
                        <td class="text-center w100">

                            <selectCargolocation :warehouseid="obj.warehouseid" :name="o.cargolocationname" @selectObj="selectHW"></selectCargolocation>
                            <!--                            <input type="number" min="0" style="height: 20px" v-model="o.cargolocationname" class="w-100 text-center" @click="selectHW(o)">-->
                        </td>
                        <td class="text-center w100">
                            <input type="number" min="0" style="height: 20px" v-model="o.checkcount" class="w-100 text-center" onclick="select()">
                        </td>
                        <td class="text-center w50"><a class="c-red" @click="removeItem(index)">移除</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default m-r-10" @click="loadCommodity">选择商品</button>
                <button class="btn btn-default m-r-10" @click="save(false)">暂存</button>
                <button class="btn btn-default" @click="save(true)">提交变更</button>
                <button class="btn btn-default" @click="deleteObj">删除</button>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="addCommodity"></selectCommodity>
    </div>
</template>

<script>
import selectCommodity from '@/components/selectCommodity.vue';
import selectCargolocation from '@/components/selectCargolocation.vue';

export default {
    name: "app",
    data() {
        return {
            obj: {},
            list: [],
            objHW: {}
        }
    },
    created: function () {
        if (sessionStorage.stockcheckObj) {
            this.obj = JSON.parse(sessionStorage.stockcheckObj);
            this.load();
        }
    },
    components: {
        selectCommodity, selectCargolocation
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("stockcheckchild/getList", {pid: this.obj.id}, function (data) {
                vm.list = data;
            })
        },
        loadCommodity() {
            this.$refs.selectCommodity.load();
        },
        addCommodity(obj) {
            let flag = false;
            this.list.forEach(function (e) {
                if (e.commodityid === obj.id) {
                    flag = true;
                }
            })
            if (flag) {
                this.$root.alert('已选商品');
            } else {
                this.list.push({
                    commodityid: obj.id,
                    name: obj.name,
                    number: obj.number,
                    norm: obj.norm,
                    model: obj.model,
                    bigpackage: false,
                    checkcount: 0,
                    conversionrelationship: obj.conversionrelationship,
                    unit: obj.unit,
                    bigunit: obj.bigpackage,
                    stockcount: 0,
                    cargolocationid: 0,
                    cargolocationname: ''
                })
            }
        },
        removeItem(index) {
            this.list.splice(index, 1);
        },
        selectItem(obj) {
            this.objHW = obj;
        },
        selectHW(obj) {
            this.$set(this.objHW, 'cargolocationid', obj.id);
            this.$set(this.objHW, 'cargolocationname', obj.number);
        },
        save(submit) {
            let vm = this;
            this.$root.getData("stockcheck/temporaryStorage", {
                id: this.obj.id,
                rows: JSON.stringify(this.list),
                submit: submit
            }, function (data) {
                vm.$root.msg('操作成功');
                if (submit) {
                    vm.$router.push('panDianDan');
                }
            })
        },
        deleteObj() {
            let vm = this;
            this.$root.confirm('确认吗?', function () {
                vm.$root.getData("stockcheck/delete", {id: vm.obj.id}, function (data) {
                    vm.$router.push('panDianDan');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
