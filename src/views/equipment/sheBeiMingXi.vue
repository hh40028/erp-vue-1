<template>
    <div class="row">
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">设备信息</h3>
                </div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="text-right" style="width: 15%">设备编码</td>
                        <td class="text-left" style="width: 35%">{{obj.number}}</td>
                        <td class="text-right" style="width: 15%">设备名称</td>
                        <td class="text-left" style="width: 35%">{{obj.name}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备型号</td>
                        <td class="text-left">{{obj.model}}</td>
                        <td class="text-right">设备规格</td>
                        <td class="text-left">{{obj.norm}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">使用部门</td>
                        <td class="text-left">{{obj.usedeptname}}</td>
                        <td class="text-right">外形尺寸</td>
                        <td class="text-left">{{obj.size}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备用途</td>
                        <td class="text-left">{{obj.use}}</td>
                        <td class="text-right">设备重量</td>
                        <td class="text-left">{{obj.weight}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">设备类型</td>
                        <td class="text-left">{{obj.typename}}</td>
                        <td class="text-right">存放地点</td>
                        <td class="text-left">{{obj.storagelocation}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">归属公司</td>
                        <td class="text-left">{{obj.attributionname}}</td>
                        <td class="text-right">设备原值</td>
                        <td class="text-left">{{obj.originalvalue}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">制造公司</td>
                        <td class="text-left">{{obj.manufacturer}}</td>
                        <td class="text-right">设备负责人</td>
                        <td class="text-left">{{obj.principalname}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">制造日期</td>
                        <td class="text-left">{{obj.manufacturedate}}</td>
                        <td class="text-right">设备状态</td>
                        <td class="text-left">{{obj.statusname}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">出厂编号</td>
                        <td class="text-left">{{obj.serialnumber}}</td>
                        <td class="text-right">启用日期</td>
                        <td class="text-left">{{obj.enabledate}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">采购日期</td>
                        <td class="text-left">{{obj.purchasedate}}</td>
                        <td class="text-right">合同号</td>
                        <td class="text-left">{{obj.contractnumber}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-md-3">
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
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">附件文档</h3>
                </div>
                <div class="list-group">
                    <a class="list-group-item" v-for="file in files" :key="file.id" v-if="file.type==='attachment'" @click="download(file.filename)">
                        <h5 class="list-group-item-heading c-blue" style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{file.sourcename}}</h5>
                        <p class="list-group-item-text">{{file.publishtime}}</p>
                    </a>
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
            obj: {},
            files:[]
        }
    },
    created: function () {
        if (sessionStorage.equipmentObj) {
            this.obj = JSON.parse(sessionStorage.equipmentObj);
            this.loadFiles();
        }
    },
    methods: {
        loadFiles: function () {
            let vm = this;
            this.$root.getData("attachment/getAllList", {rid:this.obj.id}, function (data) {
                vm.files=data;
            })
        },
        download(filename){
            let vm = this;
            this.$root.getData("common/downloadFile", {filename:filename}, function (data) {

            })
        }
    }
}
</script>

<style scoped>

</style>
