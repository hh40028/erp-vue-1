import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import empty from '../views/empty.vue';
import orgSet from '../views/system/orgSet.vue';
import userSet from '../views/system/userSet.vue';
import projectSet from '../views/system/projectSet.vue';
import menuSet from '../views/system/menuSet.vue';
import noPower from '../views/noPower.vue';
import nav from '../views/nav.vue';
import supplier from '../views/system/supplier.vue';
import gongXuHuanLi from '../views/product/gongXuHuanLi.vue';
import gongXuHuanLiMingXi from '../views/product/gongXuHuanLiMingXi.vue';
import chanPinJieGouQingDan from '../views/product/chanPinJieGouQingDan.vue';
import chanPinJieGouQingDanXiangXi from '../views/product/chanPinJieGouQingDanXiangXi.vue';
import shangPinGuanLi from '../views/jinxiaocun/shangPinGuanLi.vue';
import bianJiShangPin from '../views/jinxiaocun/bianJiShangPin.vue';
import customer from '../views/system/customer.vue';
import warehouseSet from '../views/system/warehouseSet.vue';
import cargolocation from '../views/system/cargolocation.vue';
import sheBeiGuanLi from '../views/equipment/sheBeiGuanLi.vue';
import bianJiSheBei from '../views/equipment/bianJiSheBei.vue';
import sheBeiMingXi from '../views/equipment/sheBeiMingXi.vue';
import sheBeiYangHu from '../views/equipment/sheBeiYangHu.vue';
import purchaseList from '../views/purchase/purchaseList.vue';
import purchaseEdit from '../views/purchase/purchaseEdit.vue';
import purchaseview from '../views/purchase/purchaseview.vue';
import ruKuDan from '../views/stock/ruKuDan.vue';
import ruKuDanMingXi from '../views/stock/ruKuDanMingXi.vue';
import stockQuery from '../views/stock/stockQuery.vue';
import zhiJieRuKuDan from '../views/stock/zhiJieRuKuDan.vue';
import zhiJieRuKuDanBianJi from '../views/stock/zhiJieRuKuDanBianJi.vue';
import zhiJieRuKuDanMingXi from '../views/stock/zhiJieRuKuDanMingXi.vue';
import panDianDanBianJi from '../views/stock/panDianDanBianJi.vue';
import panDianDan from '../views/stock/panDianDan.vue';
import todoList from '../views/process/todoList.vue';
import inboundOrderConfirmation from '../views/process/inboundOrderConfirmation.vue';
import inboundOrderRejected from '../views/process/inboundOrderRejected.vue';
import xiaoShouDan from '../views/sale/xiaoShouDan.vue';
import xiaoShouDanBanJi from '../views/sale/xiaoShouDanBanJi.vue';
import xiaoShouDanMingXi from '../views/sale/xiaoShouDanMingXi.vue';
import hetong from '../views/hetong/hetong.vue';
import hetongmingxi from '../views/hetong/hetongmingxi.vue';
import heTongShenPi from '../views/process/heTongShenPi.vue';
import chongXinBianJi from '../views/process/chongXinBianJi.vue';
import saleorder from '../views/saleorder/saleorder.vue';
import saleorderView from '../views/saleorder/saleorderView.vue';


Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'index', component: index},
    {path: '/index', name: 'index', component: index},
    {path: '/login', name: 'login', component: login},
    {path: '/empty', name: 'empty', component: empty},
    {path: '/nav', name: 'nav', component: nav},
    {path: '/orgSet', name: 'orgSet', component: orgSet},
    {path: '/userSet', name: 'userSet', component: userSet},
    {path: '/noPower', name: 'noPower', component: noPower},
    {path: '/projectSet', name: 'projectSet', component: projectSet},
    {path: '/menuSet', name: 'menuSet', component: menuSet},
    {path: '/supplier', name: 'supplier', component: supplier},
    {path: '/chanPinJieGouQingDan', name: 'chanPinJieGouQingDan', component: chanPinJieGouQingDan},
    {path: '/chanPinJieGouQingDanXiangXi', name: 'chanPinJieGouQingDanXiangXi', component: chanPinJieGouQingDanXiangXi},
    {path: '/shangPinGuanLi', name: 'shangPinGuanLi', component: shangPinGuanLi},
    {path: '/bianJiShangPin', name: 'bianJiShangPin', component: bianJiShangPin},
    {path: '/customer', name: 'customer', component: customer},
    {path: '/warehouseSet', name: 'warehouseSet', component: warehouseSet},
    {path: '/sheBeiGuanLi', name: 'sheBeiGuanLi', component: sheBeiGuanLi},
    {path: '/bianJiSheBei', name: 'bianJiSheBei', component: bianJiSheBei},
    {path: '/sheBeiMingXi', name: 'sheBeiMingXi', component: sheBeiMingXi},
    {path: '/sheBeiYangHu', name: 'sheBeiYangHu', component: sheBeiYangHu},
    {path: '/gongXuHuanLi', name: 'gongXuHuanLi', component: gongXuHuanLi},
    {path: '/gongXuHuanLiMingXi', name: 'gongXuHuanLiMingXi', component: gongXuHuanLiMingXi},
    {path: '/cargolocation', name: 'cargolocation', component: cargolocation},
    {path: '/purchaseList', name: 'purchaseList', component: purchaseList},
    {path: '/purchaseEdit', name: 'purchaseEdit', component: purchaseEdit},
    {path: '/purchaseview', name: 'purchaseview', component: purchaseview},
    {path: '/ruKuDan', name: 'ruKuDan', component: ruKuDan},
    {path: '/ruKuDanMingXi', name: 'ruKuDanMingXi', component: ruKuDanMingXi},
    {path: '/stockQuery', name: 'stockQuery', component: stockQuery},
    {path: '/zhiJieRuKuDan', name: 'zhiJieRuKuDan', component: zhiJieRuKuDan},
    {path: '/zhiJieRuKuDanBianJi', name: 'zhiJieRuKuDanBianJi', component: zhiJieRuKuDanBianJi},
    {path: '/zhiJieRuKuDanMingXi', name: 'zhiJieRuKuDanMingXi', component: zhiJieRuKuDanMingXi},
    {path: '/todoList', name: 'todoList', component: todoList},
    {path: '/inboundOrderConfirmation', name: 'inboundOrderConfirmation', component: inboundOrderConfirmation},
    {path: '/inboundOrderRejected', name: 'inboundOrderRejected', component: inboundOrderRejected},
    {path: '/panDianDan', name: 'panDianDan', component: panDianDan},
    {path: '/panDianDanBianJi', name: 'panDianDanBianJi', component: panDianDanBianJi},
    {path: '/xiaoShouDan', name: 'xiaoShouDan', component: xiaoShouDan},
    {path: '/xiaoShouDanBanJi', name: 'xiaoShouDanBanJi', component: xiaoShouDanBanJi},
    {path: '/xiaoShouDanMingXi', name: 'xiaoShouDanMingXi', component: xiaoShouDanMingXi},
    {path: '/hetong', name: 'hetong', component: hetong},
    {path: '/hetongmingxi', name: 'hetongmingxi', component: hetongmingxi},
    {path: '/heTongShenPi', name: 'heTongShenPi', component: heTongShenPi},
    {path: '/chongXinBianJi', name: 'chongXinBianJi', component: chongXinBianJi},
    {path: '/saleorder', name: 'saleorder', component: saleorder},
    {path: '/saleorderView', name: 'saleorderView', component: saleorderView},
];

const router = new VueRouter({
    routes,
    //跳转时到页面顶部
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

export default router
