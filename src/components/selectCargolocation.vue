<template>
    <div>
        <input type="text" v-model="name" readonly class="w-100 text-center" style="height: 20px" @click="openModal" placeholder="点击选择">
        <div class="modal fade" id="selectCargolocationModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div id="treeview2"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/js/bootstrap-treeview';

export default {
    props: ['name', 'warehouseid'],
    name: "app",
    data() {
        return {
            tree: []
        }
    },
    created: function () {
    },
    methods: {
        openModal() {
            $('#selectCargolocationModal').modal('show');
            if (this.tree.length === 0) {
                let vm = this;
                this.$root.getData("cargolocation/getTreeNotWarehouse", {warehouseId: this.warehouseid}, function (data) {
                    vm.tree = data;
                    $('#treeview2').treeview({
                        color: "#000000",
                        levels: 2,
                        data: vm.tree,
                        onNodeSelected: function (event, node) {
                            if(!!node.nodes){
                                vm.$root.alert('请选择末梢节点');
                            }else{
                                vm.$emit('selectObj', node);
                                $('#selectCargolocationModal').modal('hide');
                            }
                        }
                    });
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
