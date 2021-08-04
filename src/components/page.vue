<template>
    <div>
        <div class="col-md-12 col-sm-12 text-right p-15">
            <a class="c-blue" @click="pageSet"><i class="glyphicon glyphicon-cog"></i></a> 第{{ pageNo + 1 }}页 | 共{{ pageCount }}页 | 每页{{ pageSize }}条 | 共{{ total }}条
            <div class="btn-group m-l-5">
                <button class="btn btn-sm btn-default" :disabled="pageNo===0" @click="changePage('first')"><i class="glyphicon glyphicon-fast-backward"></i></button>
                <button class="btn btn-sm btn-default" :disabled="pageNo===0" @click="changePage('previous')"><i class="glyphicon glyphicon-backward"></i></button>
                <button class="btn btn-sm btn-default" :disabled="pageNo===pageCount-1" @click="changePage('next')"><i class="glyphicon glyphicon-forward"></i></button>
                <button class="btn btn-sm btn-default" :disabled="pageNo===pageCount-1" @click="changePage('last')"><i class="glyphicon glyphicon-fast-forward"></i></button>
            </div>
        </div>
        <div class="modal fade" id="setPageModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" v-if="total>0">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">设置分页条件</h4>
                    </div>
                    <div class="modal-body text-center">
                        <span class="m-r-5">每页</span><span @click="changePageSize(p)" v-for="p in ps" class="ps" :class="{'bgm-teal':p===pageSize}">{{ p }}</span><span>条</span>
                        <div class="input-group m-t-15">
                            <label class="input-group-addon">
                                跳转页
                            </label>
                            <input type="number" class="form-control text-center" :min="1" :max="pageCount" v-model="goPageNo" onclick="select()">
                            <label class="input-group-btn">
                                <button class="btn btn-default" @click="goPage">确定</button>
                            </label>
                        </div>
                    </div>


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
            total: 0,
            pageCount: 0,
            pageNo: 0,
            pageSize: 15,
            ps: [1, 5, 10, 15, 20, 30, 50, 100],
            goPageNo: 0
        }
    },
    created() {
        if (sessionStorage.pageSize) {
            this.pageSize = parseInt(sessionStorage.pageSize);
        }
    },
    methods: {
        setTotal(total) {
            if (this.total !== total) {
                this.pageNo = 0;
            }
            this.total = total;
            this.setPage(total);
        },
        setPage() {
            this.pageCount = parseInt(this.total / this.pageSize);
            if (this.total % this.pageSize > 0 || this.total == 0) {
                this.pageCount++;
            }
        },
        changePageSize: function (v) {
            $('#setPageModal').modal('hide');
            this.pageSize = v;
            this.setPage(this.total);
            this.pageNo = 0;
            sessionStorage.pageSize = v;
            this.callback();
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
            this.callback();
        },
        goPage() {
            if (this.goPageNo - 1 > this.pageCount) {
                this.goPageNo = this.pageCount;
            }
            this.pageNo = this.goPageNo - 1;
            $('#setPageModal').modal('hide');
            this.callback();
        },
        pageSet() {
            this.goPageNo = this.pageNo + 1;
            $('#setPageModal').modal('show');
        },
        callback() {
            this.$emit("pager", "123");
        }

    }
}
</script>

<style scoped>
.ps {
    padding: 5px;
}
</style>
