<template>
    <div class="row">
        <div class="col-md-12">
            <process :taskobj="taskObj"></process>
        </div>
        <div class="col-md-12">
            <ruKuDanMingXi></ruKuDanMingXi>
        </div>
    </div>
</template>

<script>
import ruKuDanMingXi from '@/views/stock/ruKuDanMingXi.vue';
import process from '@/components/process.vue';
export default {
    name: "app",
    data() {
        return {
            taskObj: {},
            message: ''
        }
    },
    components: {
        ruKuDanMingXi,process
    },
    created: function () {
        this.taskObj = JSON.parse(sessionStorage.taskObj);
        sessionStorage.inboundorderId = this.taskObj.relationid;
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
