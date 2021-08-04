<template>
    <div class="row">
        <div class="col-md-12">
            <process :taskobj="taskObj"></process>
        </div>
        <div class="col-md-12">
            <purchaseview :process="true"></purchaseview>
        </div>
    </div>
</template>

<script>
import process from '@/components/process.vue';
import purchaseview from '@/views/purchase/purchaseview.vue';

export default {
    name: "app",
    data() {
        return {
            taskObj: {}
        }
    },
    created: function () {
        this.taskObj = JSON.parse(sessionStorage.taskObj);
        this.load();
    },
    components: {
        process, purchaseview
    },
    methods: {
        load: function () {
            let vm = this;
            this.$root.getData("inboundorder/getObj", {id: this.taskObj.relationid}, function (data) {
                sessionStorage.purchaseId=data.relevanceid;
            })
        }
    }
}
</script>

<style scoped>

</style>
