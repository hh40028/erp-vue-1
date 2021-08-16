<template>
    <div class="row">
        <div class="col-md-12">
            <process :taskobj="taskObj"></process>
        </div>
        <div class="col-md-12">
            <hetongbianji :id="taskObj.relationid"></hetongbianji>
        </div>
    </div>
</template>

<script>
import hetongbianji from '@/views/hetong/hetongbianji';
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
        hetongbianji,process
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
