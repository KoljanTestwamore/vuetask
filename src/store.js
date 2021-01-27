import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        contacts: {}
    },
    mutations: {
        createContact(state, name) {
            if (!state.contacts[name]) {
                state.contacts[name] = {};
                return state.contacts[name];
            } else {
                return -1;
            }
        },
        deleteContact(state, name) {
            Vue.delete(state.contacts, name);
        },
        addItemToContact(state, {id, item, value}) {
            state.contacts[id][item] = value;
        },
        deleteItemFromContact(state, {id, item}) {
            Vue.delete(state.contacts[id], item)
        }
    },
    getters: {
        contacts: s => s.contacts,
        contact: s => id => s.contacts[id] || 0
    },
});
