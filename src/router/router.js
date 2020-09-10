import Vue from "vue";
import Router from "vue-router";

import Contacts from "../views/Contacts.vue";
import Info from "../views/Info.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: "/",
        name: "Contacts",
        component: Contacts
    }, {
        path: "/info/:id",
        name: "Info",
        component: Info
    }]
})