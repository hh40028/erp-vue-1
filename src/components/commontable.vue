<!--通用表格组件，用于加载普通表格数据-->
<!--父组件引用时需要在mounted中调用init方法，并给参数赋值-->
<!--url是后台调用地址-->
<!--tablename是要查询的表名或试图名-->
<!--columns是需要配置的列对象数组-->
<!--filterString是要过滤的字符-->
<!--后台控制器需要调用databaseService.getTableList()返回数据-->

<template>
    <div class="row">
        <div class="col-md-12">
            <v-table
                error-content="暂无数据"
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
                is-vertical-resize
                :row-click="selectItem"
                :row-dblclick="dblClickRow"
                @sort-change="sortChange"
                :vertical-resize-offset="verticalResizeOffset"></v-table>
        </div>
        <div class="col-md-12 col-sm-12 text-right p-15" v-show="total>0">
            <a class="c-blue" @click="pageSet"><i class="glyphicon glyphicon-cog"></i></a> 第{{ pageNo + 1 }}页 | 共{{ pageCount }}页 | 每页{{ pageSize }}条 | 共{{ total }}条
            <div class="btn-group m-l-5">
                <button class="btn btn-sm btn-default" :disabled="pageNo===0" @click="changePage('first')"><i class="glyphicon glyphicon-fast-backward"></i></button>
                <button class="btn btn-sm btn-default" :disabled="pageNo===0" @click="changePage('previous')"><i class="glyphicon glyphicon-backward"></i></button>
                <button class="btn btn-sm btn-default" :disabled="pageNo===pageCount-1 || pageCount===0" @click="changePage('next')"><i class="glyphicon glyphicon-forward"></i></button>
                <button class="btn btn-sm btn-default m-r-15" :disabled="pageNo===pageCount-1 || pageCount===0" @click="changePage('last')"><i class="glyphicon glyphicon-fast-forward"></i></button>
            </div>
        </div>
        <div class="modal fade" id="setPageModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" v-if="total>0">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">设置分页条件</h4>
                    </div>
                    <div class="modal-body text-left">
                        <label>每页记录数</label><br>
                        <button class="btn btn-sm f-14" @click="changePageSize(p)" v-for="p in ps" :class="{'btn-primary':p===pageSize,'btn-default':p!==pageSize}">{{ p }}</button>
                    </div>

                    <div class="input-group">
                        <label class="input-group-addon">
                            页码
                        </label>
                        <input type="number" class="form-control text-center f-14" :min="1" :max="pageCount" v-model="goPageNo" onclick="select()">
                        <label class="input-group-btn">
                            <button class="btn btn-default" @click="goPage">跳转</button>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        url:String,
        tablename:String,
        columns:Array,
        filterString:String
    },
    name: "app",
    data() {
        return {
            verticalResizeOffset: 80,
            list: [],
            total: 0,
            pageCount: 0,
            pageNo: 0,
            pageSize: 15,
            ps: [5, 10, 15, 20, 30, 50, 100],
            sort: 'id',
            direction: 'desc',
            isLoading: false,
            goPageNo: 0
        }
    },
    computed: {},
    mounted() {
        this.pageNo=0;
        this.load();
    },
    methods: {
        load() {
            let vm = this;
            this.isLoading = true;
            if (sessionStorage.pageSize) {
                this.pageSize = parseInt(sessionStorage.pageSize);
            }
            let offset = this.pageNo * this.pageSize;
            let limit = this.pageSize;
            this.$root.getData(this.url, {
                offset: offset,
                limit: limit,
                tablename: this.tablename,
                sort: this.sort,
                direction: this.direction,
                filterString: this.filterString
            }, function (data) {
                vm.setTotal(data.total);
                vm.list = [];
                data.children.forEach(function (e) {
                    e.serial = ++offset;
                    vm.list.push(e);
                })
                vm.isLoading = false;
            })
        },
        selectItem(rowIndex, rowData, column) {
            this.$emit("selectObj", rowData);
        },
        dblClickRow() {
            this.$emit("dblClickRow");
            $('#editPowerModal').modal("show");
        },
        sortChange(params) {
            for (let p in params) {
                if (params[p]) {
                    this.sort = p;
                    this.direction = params[p];
                }
            }
            this.pageNo = 0;
            this.load();
        },
        pageSet() {
            this.goPageNo = this.pageNo + 1;
            $('#setPageModal').modal('show');
        },
        setTotal(total) {
            if (this.total !== total) {
                this.pageNo = 0;
            }
            this.total = total;
            this.setPage(total);
        },
        setPage() {
            this.pageCount = parseInt(this.total / this.pageSize);
            if (this.total % this.pageSize > 0 || this.total === 0) {
                this.pageCount++;
            }
        },
        changePageSize: function (v) {
            this.pageSize = v;
            this.setPage(this.total);
            this.pageNo = 0;
            sessionStorage.pageSize = v;
            this.load();
        },
        changePage: function (val) {
            if (val === "first") {
                this.pageNo = 0;
            }
            if (val === "previous") {
                this.pageNo--;
            }
            if (val === "next") {
                this.pageNo++;
            }
            if (val === "last") {
                this.pageNo = this.pageCount - 1;
            }
            this.load();
        },
        goPage() {
            if (this.goPageNo - 1 > this.pageCount) {
                this.goPageNo = this.pageCount;
            }
            this.pageNo = this.goPageNo - 1;
            this.load();
        }
    }
}
</script>
