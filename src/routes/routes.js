import Vue from "vue";
import VueRouter from "vue-router";

// Layouts
import SystemLayout from "../components/layouts/SystemLayout"
import BlankLayout from "../components/layouts/BlankLayout"

// Pages
import Login from "../components/auth/Login.vue"
import Products from "../components/products/Products.vue"
import ProductDetails from "../components/products/ProductDetails.vue"
import Stock from "../components/stock/Stock.vue"
import Favorites from "../components/favorites/Favorites.vue"

// Vuex Store
// import store from '../store/store';

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: {
        layout: BlankLayout,
        }
    },
  
    {
        path: "/products",
        name: "Products",
        component: Products,
        meta: {
        layout: SystemLayout,
        }
    },

    {
        path: "/product-details",
        name: "Product Details",
        component: ProductDetails,
        meta: {
            layout: SystemLayout,
        }
    },

    {
        path: "/stock",
        name: "Stock",
        component: Stock,
        meta: {
        layout: SystemLayout,
        }
    },

    {
        path: "/favorites",
        name: "Favorites",
        component: Favorites,
        meta: {
        layout: SystemLayout,
        }
    },
]

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  linkExactActiveClass: "nav-item active"
});

// router.beforeEach((to, from, next) => {
//   let getLoggedIn = store.getters.getIsLoggedIn;

//   if (to.name !== 'Login') {
//     if (getLoggedIn) {
//       next();
//     } else {
//       next({ name: 'Login' });
//       // next(false)
//     }
//   } else {
//     next();
//   }
// });

export default router;