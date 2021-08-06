<template>
    <div id="app">
        <div class="container-fluid">
            <nav class="navbar navbar-default navbar-fixed-top bgm-white" v-if="$root.userObj">
                <div class="navbar-header">
                    <div class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </div>
                    <a class="navbar-brand" href="#">ERP管理</a>
                </div>

                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav m-l-30">
                        <li v-for="menu in menus" :key="menu.id" :class="{'active':$root.tag===menu.url}"><a @click="selectMenu(menu)">{{ menu.name }} <span class="sr-only">(current)</span></a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right m-r-10">
                        <li><router-link to="menuSet">菜单</router-link></li>
                        <li><a @click="logout" v-if="$root.userObj">注销</a></li>
                    </ul>
                </div>
            </nav>
            <div class="row">
                <div class="col-md-2" style="margin-top: 70px;margin-bottom: 50px">
                    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default" v-for="m in menu.children" :key="m.id">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+m.id" aria-expanded="true" :aria-controls="'collapse'+m.id">
                                        {{ m.name }}
                                    </a>
                                </h4>
                            </div>
                            <div :id="'collapse'+m.id" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                <ul class="list-group">
                                    <li class="list-group-item" :class="{'list-group-item-success':c.id===twoMenu.id}" v-for="c in m.children" :key="c.id" @click="selectTwoMenu(c)">{{ c.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10" style="margin-top: 70px;margin-bottom: 50px">
                    <router-view></router-view>
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
            menus: [],
            menu: {},
            twoMenu:{}
        }
    },
    created: function () {
            this.loadMenu();
        // if(sessionStorage.menus){
        //     this.menus=JSON.parse(sessionStorage.menus);
        // }else{
        //     this.loadMenu();
        // }
        // if(sessionStorage.menu){
        //     this.menu=JSON.parse(sessionStorage.menu);
        // }
        // if(sessionStorage.twoMenu){
        //     this.twoMenu=JSON.parse(sessionStorage.twoMenu);
        // }
    },
    methods: {
        loadMenu: function () {
            let vm = this;
            this.$root.getData("menu/getAllList", {pid: 0}, function (data) {
                vm.menus = data;
                sessionStorage.menus=JSON.stringify(data);
                vm.menu = vm.menus[0];
                sessionStorage.menu=JSON.stringify(vm.menu);
                console.log(vm.menus);
            })
        },
        logout() {
            this.$root.userObj = undefined;
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push('login');
        },
        selectMenu(menu) {
            this.menu = menu;
            sessionStorage.menu=JSON.stringify(menu);
            this.$root.tag = menu.url;
        },
        selectTwoMenu(menu){
            this.twoMenu=menu;
            sessionStorage.tag = menu.url;
            sessionStorage.twoMenu=JSON.stringify(menu);
            this.$router.push(menu.url);
        }
    }
}
</script>

<style>
</style>
