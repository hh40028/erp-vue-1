<template>
    <div class="markbox" v-show="loading" style="background-color: rgba(0, 0, 0, 0.5);">
        <div class="sun-loading"></div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {
            loading: false
        }
    },
    created() {
        var that = this;
        this.bus.$on('loading', function(data) {
            that.loading = !!data;
        })
    }
}
</script>
