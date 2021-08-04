<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">流程信息</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <p>发送人员：{{taskobj.sendusername}}</p>
                            <p>发送时间：{{taskobj.arrivaltime}}</p>
                            <p>发送意见：{{taskobj.message}}</p>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <textarea rows="3" v-model="message" class="form-control" placeholder="请输入处理意见"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button v-for="c in operations" class="btn btn-default m-r-10" @click="process(c.name)">{{c.name}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        taskobj:{
            type:Object,
            default:{}
        }
    },
    name: "app",
    data() {
        return {
            message:'',
            operations:[]
        }
    },
    created: function () {
        this.loadOperation();
    },
    methods: {
        loadOperation(){
            let vm = this;
            this.$root.getData("sys/getOperationList", {taskid:this.taskobj.id}, function (data) {
                vm.operations=data;
            })
        },
        process(operationname) {
            let vm = this;
            this.$root.confirm('确认吗？', function () {
                vm.$root.getData("sys/nextTask", {
                    taskid: vm.taskobj.id,
                    operationname: operationname,
                    organizationid: '0',
                    message: vm.message,
                    processVariables: '{}'
                }, function (data) {
                    vm.loadTaskCount();
                    vm.$router.push('todoList');
                })
            });
        },
    }
}
</script>

<style scoped>

</style>
