<template>
    <div class="row">
        <div class="col-md-12">
            <process :taskobj="taskObj"></process>
        </div>
        <div class="col-md-12">
            <hetongmingxi :id="taskObj.relationid"></hetongmingxi>
        </div>
    </div>
</template>

<script>
import hetongmingxi from '@/views/hetong/hetongmingxi.vue';
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
        hetongmingxi,process
    },
    created: function () {
        this.taskObj = JSON.parse(sessionStorage.taskObj);
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
