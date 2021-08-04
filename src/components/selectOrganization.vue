<template>
    <div class="row">
        <div class="col-md-12">
            <input type="text" class="form-control" readonly v-model="orgname" @click="openModal">
            <div class="modal fade" id="selectOrganizationModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">选择机构</h4>
                        </div>
                        <div class="modal-body p-0">
                            <div id="treeview"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/js/bootstrap-treeview';
export default {
    props:['orgname'],
    name: "app",
    data() {
        return {}
    },
    created: function () {
    },
    methods: {
        openModal: function () {
            $('#selectOrganizationModal').modal('show');
            this.loadTree();
        },
        loadTree: function () {
            let vm = this;
            this.$root.getData("api/getOrgTree", {}, function (data) {
                $('#treeview').treeview({
                    color: "#000000",
                    levels: 2,
                    data: data,
                    onNodeSelected: function (event, node) {
                        vm.selectObj(node);
                        $('#selectOrganizationModal').modal('hide');
                    }
                });
            })
        },
        selectObj(obj){
            this.$emit('selectOrg',obj);
        }
    }
}
</script>

<style scoped>

</style>
