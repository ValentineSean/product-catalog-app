import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// STORE MODULES
// import auth from './modules/auth/auth';
import product from './modules/product/product';
import supplier from './modules/supplier/supplier';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

const store = new Vuex.Store({
    modules: {
        // auth,
        product,
        supplier,
    },

    plugins: [vuexLocal.plugin],
})

export default store;