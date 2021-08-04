<template>
    <div>
        <div class="row" v-for="main in menu.nodes">
            <div class="col-md-3" v-for="menu in main.nodes">


                <a class="thumbnail">
                    <img :src="'../assets/images/'+menu.icon">
                </a>
                {{menu.text}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            menu: {}
        }
    },
    created: function () {
        if (sessionStorage.menu) {
            this.menu = JSON.parse(sessionStorage.menu);
        }
    },
    methods: {
        load: function () {
        }
    }
}
</script>

<style scoped>

</style>
