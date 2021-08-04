<template>
    <a class="c-blue" @click="up">{{ title }}{{ type }}
        <input type="file" :id="'file'+type" style="display: none" @change="uploadFile">
    </a>
</template>

<script>
export default {
    props: ['rid', 'type', 'title'],
    name: "app",
    data() {
        return {}
    },
    created: function () {
    },
    methods: {
        uploadFile() {
            let vm = this;
            let formData = new FormData();
            let name = $("file").val();
            formData.append("file", $("#file"+this.type)[0].files[0]);
            formData.append("name", name);
            $.ajax({
                url: vm.$root.basePath + "/common/uploadFile?rid=" + this.rid + '&type=' + this.type,
                type: "POST",
                data: formData,
                headers: {
                    token: sessionStorage.token
                },
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                beforeSend: function () {
                    vm.upend = true;
                },
                success: function (data) {
                    if (data.success) {
                        vm.$root.msg('上传成功');
                        vm.callback(data.children);
                    } else {
                        vm.$root.handleErrInfo(data);
                    }
                },
            });
        },
        up() {
            $("#file").val("");
            $("#file").click();
        },
        callback(obj) {
            this.$emit("getFileInfo", obj);
        }
    }
}
</script>

<style scoped>

</style>
