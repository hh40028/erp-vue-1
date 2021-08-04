<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="pull-right">
                        <label>
                            <input type="checkbox" v-model="isRedback" @change="load"> <span :class="{'c-red':isRedback}">显示删除</span>
                        </label>
                    </div>
                    <h3 class="panel-title">入库单列表</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button class="btn btn-default" :disabled="!selectObj.id" @click="view">查看</button>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="filterString" placeholder="过滤名称...">
                                <label class="input-group-btn">
                                    <button class="btn btn-default" @click="filterString=''" :disabled="!filterString">清除</button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">单据号</th>
                        <th class="text-center">仓库名称</th>
                        <th class="text-center">入库类型</th>
                        <th class="text-center">关联单号</th>
                        <th class="text-center">入库</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,index) in list" :key="obj.id" @click="selectItem(obj)" @dblclick="view"
                    :class="{'bg-success':selectObj.id===obj.id,'bg-danger':obj.redback}">
                        <td class="text-center w50">{{ index + 1 }}</td>
                        <td class="text-center">{{obj.number}}</td>
                        <td class="text-center">{{obj.warehousename}}</td>
                        <td class="text-center">{{obj.type}}</td>
                        <td class="text-center">{{obj.relevancenumber}}</td>
                        <td class="text-center" :class="{'c-teal':obj.submit}">{{obj.submit?"已入库":"未入库"}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <page ref="page" @pager="load"></page>
        </div>
    </div>
</template>

<script>
import page from '@/components/page.vue';
export default {
    name: "app",
    data() {
        return {
            list: [],
            filterString: '',
            selectObj: {},
            isRedback:false
        }
    },
    created: function () {
        this.load();
    },
    components: {
        page
    },
    methods: {
        load: function () {
            let offset = 0;
            let limit = 15;
            if (this.$refs.page) {
                offset = this.$refs.page.pageNo * this.$refs.page.pageSize;
                limit = this.$refs.page.pageSize;
            }
            let vm = this;
            let url='inboundorder/getQueryList';
            if(this.isRedback){
                url='inboundorder/getQueryListByRedback';
            }
            this.$root.getData(url, {
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
            this.selectObj=obj;
        },
        view(){
            sessionStorage.inboundorderId=this.selectObj.id;
            this.$router.push('ruKuDanMingXi');
        }
    },
    watch: {
        filterString: {
            handler() {
                let vm = this;
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    vm.load();
                }, 500);
            }
        }
    },
}
</script>

<style scoped>

</style>
