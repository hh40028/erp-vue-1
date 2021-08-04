<template>
    <div class="row">
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备养护信息设置</h3>
                </div>
                <div class="panel-body">
                    <div class="btn-group">
                        <button class="btn btn-default" @click="add">新增</button>
                        <button class="btn btn-default" :disabled="!selectObj.id" @click="edit">编辑</button>
                        <button class="btn btn-default" :disabled="!selectObj.id" @click="deleteObj">删除</button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center w50">序号</th>
                        <th class="text-center">养护名称</th>
                        <th class="text-center">养护周期(天)</th>
                        <th class="text-left">养护内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,index) in list" :key="obj.id" @click="selectItem(obj)" :class="{'bg-success':obj.id===selectObj.id}">
                        <td class="text-center">{{index+1}}</td>
                        <td class="text-center">{{obj.name}}</td>
                        <td class="text-center">{{obj.cycle}}</td>
                        <td class="text-left">{{obj.content}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">养护记录</h3>
                </div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="text-center">序号</th>
                        <th class="text-center">养护日期</th>
                        <th class="text-center">养护名称</th>
                        <th class="text-center">养护内容</th>
                        <th class="text-center">维修人</th>
                        <th class="text-center">验收</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,obj) in upkeeps" :key="obj.id">
                        <td class="text-center">{{index+1}}</td>
                        <td class="text-center">{{obj.upkeeptime}}</td>
                        <td class="text-center">{{obj.name}}</td>
                        <td class="text-center">{{obj.content}}</td>
                        <td class="text-center">{{obj.maintenanceman}}</td>
                        <td class="text-center">{{obj.acceptance?"通过":""}}</td>
                    </tr>
                    </tbody>
                </table>
                <page ref="page" @pager="load"></page>
            </div>
        </div>

        <div class="col-md-3">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备信息</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right" style="width: 15%">设备编码</td>
                        <td class="text-left" style="width: 35%">{{obj.number}}</td>
                    </tr>
                    <tr>
                        <td class="text-right" style="width: 15%">设备名称</td>
                        <td class="text-left" style="width: 35%">{{obj.name}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备型号</td>
                        <td class="text-left">{{obj.model}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备规格</td>
                        <td class="text-left">{{obj.norm}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">使用部门</td>
                        <td class="text-left">{{obj.usedeptname}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备负责人</td>
                        <td class="text-left">{{obj.principalname}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备照片</h3>
                </div>
                <div class="panel-body p-0">

                    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carousel-example-generic" :data-slide-to="index"
                                :class="{'active':index===0}"
                                v-for="(file,index) in files" :key="file.id" v-if="file.type==='photo'"
                            ></li>
                        </ol>
                        <div class="carousel-inner" role="listbox">
                            <div class="item" :class="{'active':index===0}" v-for="(file,index) in files" :key="file.id" v-if="file.type==='photo'">
                                <img :src="$root.basePath+'/common/getImage?filename='+file.filename">
                            </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑养护设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>养护名称</label>
                            <input type="text" v-model="selectObj.name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>养护周期(天)</label>
                            <input type="number" v-model="selectObj.cycle" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>养护内容</label>
                            <textarea rows="5" v-model="selectObj.content" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="save">保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import page from '@/components/page.vue';
export default {
    name: "app",
    data() {
        return {
            obj: {},
            list:[],
            files:[],
            selectObj:{},
            upkeeps:[]
        }
    },
    created: function () {
        if (sessionStorage.equipmentObj) {
            this.obj = JSON.parse(sessionStorage.equipmentObj);
            this.loadFiles();
            this.loadList();
        }
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
            this.$root.getData("upkeep/getQueryList", {
                limit: limit,
                offset: offset,
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                eid:this.obj.id
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.upkeeps = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    vm.upkeeps.push(e);
                })

            })
        },
        loadFiles: function () {
            let vm = this;
            this.$root.getData("attachment/getAllList", {rid:this.obj.id}, function (data) {
                vm.files=data;
            })
        },
        loadList(){
            let vm = this;
            this.$root.getData("upkeepset/getList", {eid:this.obj.id}, function (data) {
                vm.list=data;
            })
        },
        selectItem(obj){
            this.selectObj=this.$root.clone(obj);
        },
        add(){
            this.selectObj={};
            $('#editModal').modal('show');
        },
        edit(){
            $('#editModal').modal('show');
        },
        save(){
            let vm = this;
            this.selectObj.eid=this.obj.id;
            this.$root.getData("upkeepset/save", this.selectObj, function (data) {
                $('#editModal').modal('hide');
                vm.loadList();
            })
        },
        deleteObj(){
            let vm = this;
            this.$root.confirm('确认吗?',function (){
                vm.$root.getData("upkeepset/delete", {id:vm.selectObj.id}, function (data) {
                    vm.selectObj={};
                    vm.loadList();
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
