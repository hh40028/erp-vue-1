<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">待办任务</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
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
                <v-table
                    error-content="暂无任务"
                    even-bg-color="rgba(0,0,0,0.02)"
                    :columns="columns"
                    :table-data="list"
                    :multiple-sort="false"
                    row-hover-color="#efefef"
                    row-click-color="#dff0d8"
                    sort-always
                    is-horizontal-resize
                    style="width:100%"
                    column-width-drag
                    :row-dblclick="dblClickRow"
                    is-vertical-resize
                    :row-click="selectItem"></v-table>
                <page ref="page" @pager="load"></page>
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
            columns: [
                {field: 'serial', title: '序号', width: 50, titleAlign: 'center', columnAlign: 'center', isFrozen: true},
                {field: 'pdname', title: '流程名称', width: 150, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: true},
                {field: 'nodename', title: '节点名称', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, orderBy: 'asc'},
                {field: 'sendusername', title: '发送用户', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, orderBy: 'asc'},
                {field: 'arrivaltime', title: '发送时间', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, orderBy: 'asc'},
                {field: 'message', title: '处理意见', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, orderBy: 'asc'},
            ],
            list: [],
            filterString: '',
            obj: {}
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
            this.$root.getData('api/getProcesstaskQueryList', {
                tablename: 'processtaskview',
                limit: limit,
                offset: offset,
                sort: "id",
                direction: "desc",
                filterString: this.filterString,
                warehouseid: this.warehouseid
            }, function (data) {
                vm.$refs.page.setTotal(data.total);
                vm.list = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    vm.list.push(e);
                })

            })
        },
        selectItem(rowIndex, rowData, column) {
            this.obj = rowData;
            console.log(this.obj);
        },
        dblClickRow() {
            sessionStorage.taskObj = JSON.stringify(this.obj);
            this.$router.push(this.obj.form);
        },

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
