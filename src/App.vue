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
                        <li v-for="menu in $root.menus" :key="menu.id" :class="{'active':$root.tag===menu.id}"><a @click="selectMenu(menu)">{{ menu.text }} <span class="sr-only">(current)</span></a></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right m-r-10">
                        <li>
                            <router-link to="todoList">待办
                                <span class="badge" v-show="$root.taskCount>0">{{ $root.taskCount }}</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="menuSet">菜单</router-link>
                        </li>
                        <li><a @click="logout" v-if="$root.userObj">注销</a></li>
                    </ul>
                </div>
            </nav>
            <div class="row">
                <div class="col-md-2" style="margin-top: 70px;margin-bottom: 50px">
                    <div id="treeviewMenu"></div>
                </div>
                <div class="col-md-10" style="margin-top: 70px;margin-bottom: 50px">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './assets/js/bootstrap-treeview';

export default {
    name: "app",
    data() {
        return {
            menu: {},
            taskCount:0
        }
    },
    created: function () {
        if (sessionStorage.menu) {
            this.menu = JSON.parse(sessionStorage.menu);
            this.loadTree();
        }
        this.loadTaskCount();
        setInterval(this.loadTaskCount, 300000);
    },
    methods: {
        loadTree() {
            let vm = this;
            $('#treeviewMenu').treeview({
                color: "#000000",
                levels: 1,
                data: this.menu.nodes,
                onNodeSelected: function (event, node) {
                    vm.$router.push(node.url);
                }
            });
        },
        logout() {
            this.$root.userObj = undefined;
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push('login');
        },
        selectMenu(menu) {
            this.menu = menu;
            sessionStorage.menu = JSON.stringify(menu);
            this.$root.tag = menu.id;
            if (!!menu.url) {
                this.$router.push(menu.url);
            }
            this.loadTree();
        },

    }
}
</script>

<style>
</style>
