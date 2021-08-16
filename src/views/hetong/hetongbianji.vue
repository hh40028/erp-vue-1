<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">合同编辑</h3>
                </div>
                <div class="panel-body">
                    <div class="row">

                         <div class="col-md-2">
                            <div class="form-group">
                                <label>合同单号</label>
                                <input type="text" class="form-control" v-model="obj.contractno">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>合同名称</label>
                                <input type="text" class="form-control" v-model="obj.contractname">
                            </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group">
                            <label>合同类型</label>
                            <selectDict :name="obj.hetongleixing" @selectObj="selectDict"></selectDict>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>备注</label>
                            <input type="text" class="form-control" v-model="obj.remark">
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>业务部门</label>
                                <selectOrganization :orgname="obj.productiondeptname" @selectOrg="selectOrg"></selectOrganization>
                            </div>
                        </div>
                         <div class="col-md-3">
                            <div class="form-group">
                                <label>业务员</label>
                                <selectUser :name="obj.yewuyuan" @selectObj="selectUser"></selectUser>
                            </div>
                        </div>
                         <div class="col-md-3">
                             <div class="form-group">
                                 <label>客户名称</label>
                                <selectCustomer :name="obj.customername" @selectObj="selectCustomer"></selectCustomer>
                             </div>
                         </div>
                         <div class="col-md-3">
                            <div class="form-group">
                                <label>客户代表</label>
                                <input type="text" class="form-control" v-model="obj.customeruser">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>签订日期</label>
                            <input type="date" class="form-control" v-model="obj.signdate">
                          </div>
                        </div>
                         <div class="col-md-3">
                             <div class="form-group">
                                 <label>生效日期</label>
                                 <input type="date" class="form-control" v-model="obj.effectivedate">
                             </div>
                         </div>
                         <div class="col-md-3">
                             <div class="form-group">
                                 <label>开始日期</label>
                                 <input type="date" class="form-control" v-model="obj.startdate">
                             </div>
                         </div>
                         <div class="col-md-3">
                             <div class="form-group">
                                 <label>终止日期</label>
                                 <input type="date" class="form-control" v-model="obj.enddate">
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
                      <th class="text-center">合同数量</th>
                      <th class="text-center">合同单价</th>
                      <th class="text-center">金额</th>
                      <th class="text-center">移除</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in list" :key="o.id">
                      <td class="text-center w50">{{ index + 1 }}</td>
                      <td class="text-center">{{ o.productid }}</td>
                      <td class="text-center">{{ o.name }}</td>
                      <td class="text-center">{{ o.norm }}</td>
                      <td class="text-center">{{ o.model }}</td>
                      <td class="text-center">
                        {{ o.unit }}
                      </td>
                      <td class="text-center w120">
                        <input type="number" v-model="o.count" class="w-100" min="0">
                      </td>
                      <td class="text-center w120">
                        <input type="number" v-model="o.price" class="w-100" min="0">
                      </td>
                      <td class="text-center">
                        {{ o.count * o.price|number2 }}
                      </td>
                      <td class="text-center">
                        <a class="c-red" @click="removeItem(index)">移除</a>
                      </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="text-center">
                <button class="btn btn-default m-r-10" @click="openselectCommodity">选择商品</button>
                <button class="btn btn-default m-r-10" @click="save">保存</button>
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>
        <selectCommodity ref="selectCommodity" @selectCommodity="selectCommodity"></selectCommodity>
    </div>
</template>

<script>
import selectCustomer from '@/components/selectCustomer.vue';
import selectCommodity from '@/components/selectCommodity.vue';
import selectUser from '@/components/selectUser.vue';
import selectOrganization from '@/components/selectOrganization.vue';
import selectDict from '@/components/selectDict.vue';

export default {
    name: "app",
    data() {
        return {
            obj: {},
            list: []
        }
    },
    created: function () {
        this.load();
    },
    components: {
        selectCustomer, selectUser,selectOrganization,selectCommodity,selectDict
    },
    methods: {
        load: function () {
        },
        selectCustomer(obj) {
            this.$set(this.obj, 'customername', obj.name);
            this.$set(this.obj, 'customerid', obj.id);
        },
        openselectCommodity() {
             this.$refs.selectCommodity.load();
        },
        selectCommodity(obj) {
            console.log(obj);
            let flag=false;
            this.list.forEach(function (e){
              if(e.productid===obj.number){
                flag=true;
              }
            })
            if(!flag){
              let c={
                name:obj.name,
                productid:obj.id,
                unit:obj.unit,
                norm:obj.norm,
                model:obj.model,
                price:obj.saleprice,
                count:1,
              }
              this.list.push(c);
            }else{
              this.$root.alert("已选商品");
            }
        },
        selectUser(obj){
          this.$set(this.obj,'userid',obj.id);
          this.$set(this.obj,'yewuyuan',obj.username);
        },
        selectDict(obj){
          this.$set(this.obj,'contracttype',obj.id);
          this.$set(this.obj,'hetongleixing',obj.name);
        },
        selectOrg(obj){
          this.$set(this.obj,'productiondeptname',obj.text);
          this.$set(this.obj,'depid',obj.id);
        },
        removeItem(index) {
            this.list.splice(index, 1);
        },
        save() {
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("contract/save", {
                    obj: JSON.stringify(vm.obj),
                    rows: JSON.stringify(vm.list)
                }, function (data) {
                    sessionStorage.contractId = data.id;
                    vm.$router.push('hetongmingxi');
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
