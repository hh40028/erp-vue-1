<template>
    <div class="row">
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备信息编辑</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label>设备编码<span class="c-red">＊</span></label>
                            <input type="text" v-model="obj.number" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备名称<span class="c-red">＊</span></label>
                            <input type="text" v-model="obj.name" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备型号<span class="c-red">＊</span></label>
                            <input type="text" v-model="obj.model" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备规格</label>
                            <input type="text" v-model="obj.norm" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>使用部门</label>
                            <input type="text" v-model="obj.usedeptname" readonly class="form-control" @click="selectDept">
                        </div>
                        <div class="form-group col-md-4">
                            <label>外形尺寸</label>
                            <input type="text" v-model="obj.size" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备用途</label>
                            <input type="text" v-model="obj.use" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备重量</label>
                            <input type="number" v-model="obj.weight" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备类型</label>
                            <select v-model="obj.typeid" class="form-control">
                                <option v-for="dict in dicts" :key="dict.id" v-show="dict.key==='shebeileixing'" :value="dict.id">{{dict.name}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label>存放地点</label>
                            <input type="text" v-model="obj.storagelocation" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>归属公司</label>
                            <selectSupplier :name="obj.attributionname" @selectObj="selectSupplierValue"></selectSupplier>
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备原值</label>
                            <input type="number" v-model="obj.originalvalue" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>制造公司</label>
                            <input type="text" v-model="obj.manufacturer" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备负责人</label>
                            <selectUser :name="obj.principalname" @selectObj="selectUser"></selectUser>
                        </div>
                        <div class="form-group col-md-4">
                            <label>制造日期</label>
                            <input type="text" v-model="obj.manufacturedate" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>设备状态</label>
                            <select v-model="obj.status" class="form-control">
                                <option v-for="dict in dicts" :key="dict.id" v-show="dict.key==='shebeizhuangtai'" :value="dict.id">{{dict.name}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label>出厂编号</label>
                            <input type="text" v-model="obj.serialnumber" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>启用日期</label>
                            <input type="date" v-model="obj.enabledate" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>采购日期</label>
                            <input type="date" v-model="obj.purchasedate" class="form-control">
                        </div>
                        <div class="form-group col-md-4">
                            <label>合同号</label>
                            <input type="text" v-model="obj.contractnumber" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-primary m-r-10" @click="save">保存</button>
                <button class="btn btn-default" onclick="history.back()">返回</button>
            </div>
        </div>

        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="pull-right"><a class="c-blue" @click="up('photo')">上传</a></div>
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
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="pull-right"><a class="c-blue" @click="up('attachment')">上传</a></div>
                    <h3 class="panel-title">附件文档</h3>
                </div>
                <div class="panel-body" v-if="!obj.id">
                    <span class="c-red">保存设备信息后才可上传附件</span>
                </div>
                <div class="list-group">
                    <a class="list-group-item" v-for="file in files" :key="file.id" v-if="file.type==='attachment'" @click="download(file.filename)">
                        <h5 class="list-group-item-heading c-blue" style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{file.sourcename}}</h5>
                        <p class="list-group-item-text">{{file.publishtime}}</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="modal fade" id="selectDeptModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">选择部门</h4>
                    </div>
                        <div id="treeview"></div>
                </div>
            </div>
        </div>
        <input type="file" :id="'file'" style="display: none" @change="uploadFile">
    </div>
</template>

<script>
import selectSupplier from "@/components/selectSupplier";
import selectUser from "@/components/selectUser.vue";
export default {
    name: "app",
    data() {
        return {
            obj: {},
            dicts:[],
            files:[],
            type:''
        }
    },
    created: function () {
        if (sessionStorage.equipmentObj) {
            this.obj = JSON.parse(sessionStorage.equipmentObj);
            this.loadFiles();
        }
        this.loadDicts();
    },
    components: {
        selectSupplier,selectUser
    },
    methods: {
        loadFiles: function () {
            let vm = this;
            this.$root.getData("attachment/getAllList", {rid:this.obj.id}, function (data) {
                vm.files=data;
            })
        },
        loadDicts(){
            let vm = this;
            this.$root.getData("api/getDictList", {}, function (data) {
                vm.dicts=data;
            })
        },
        loadTree(){
            let vm = this;
            this.$root.getData("api/getOrgTree", {}, function (data) {
                $('#treeview').treeview({
                    color: "#000000",
                    levels: 2,
                    data: data,
                    onNodeSelected: function (event, node) {
                        vm.$set(vm.obj,'usedeptid',node.id);
                        vm.$set(vm.obj,'usedeptname',node.text);
                        $('#selectDeptModal').modal('hide');
                    }
                });
            })
        },
        selectSupplierValue(obj){
            this.$set(this.obj,'attribution',obj.id);
            this.$set(this.obj,'attributionname',obj.name);
        },
        selectDept(){
            $('#selectDeptModal').modal('show');
            this.loadTree();
        },
        selectUser(obj){
            this.$set(this.obj,'principal',obj.id);
            this.$set(this.obj,'principalname',obj.username);
        },
        save(){
            let vm = this;
            this.$root.getData("equipment/save", this.obj, function (data) {
                history.back();
            })
        },
        getFileInfo(obj){
            console.log(obj);
            this.loadFiles();
        },
        getPhoto(obj){
            console.log(obj);
        },
        download(filename){
            let vm = this;
            this.$root.getData("common/downloadFile", {filename:filename}, function (data) {

            })
        },
        uploadFile() {
            let vm = this;
            let formData = new FormData();
            let name = $("file").val();
            formData.append("file", $("#file")[0].files[0]);
            formData.append("name", name);
            $.ajax({
                url: vm.$root.basePath + "/common/uploadFile?rid=" + this.obj.id + '&type=' + this.type,
                type: "POST",
                data: formData,
                headers: {
                    token: sessionStorage.token
                },
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                beforeSend: function () {
                    vm.upend = true;
                },
                success: function (data) {
                    if (data.success) {
                        vm.$root.msg('上传成功');
                        vm.loadFiles();
                    } else {
                        vm.$root.handleErrInfo(data);
                    }
                },
            });
        },
        up(type) {
            this.type=type;
            $("#file").val("");
            $("#file").click();
        },
    }
}
</script>

<style scoped>

</style>
