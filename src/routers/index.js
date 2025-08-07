import { createWebHistory, createRouter } from "vue-router";
import index1 from "../views/homepage.vue";
import index2 from "../views/login.vue";
import index3 from "../views/adminPage.vue";
import index4 from "../views/product.vue";
import index5 from "../views/users.vue";
import addProduct from "../views/addProduct.vue";
import editProduct from "../views/editProduct.vue";
import offerProduct from "../views/offerProduct.vue";
import CoffeeCollections from "../collections/MyCollection.vue";
import TeaCollections from "../collections/Tea.vue";
import MilkTeaCollections from "../collections/MilkTea.vue";
import FrostyCollections from "../collections/Frosty.vue";
import AllCollections from "../collections/AllCollections.vue";
import Cart from "../views/Cart.vue";
import offers from "../views/offers.vue";
import successfulOrders from "../views/successfulOrders.vue";

const routes = [
  {
    path: "/",
    component: index1,
    meta: { scrollToTop: true },
  },
  {
    path: "/login",
    component: index2,
    meta: { scrollToTop: true },
  },
  {
    path: "/admin",
    component: index3,
    meta: { scrollToTop: true },
  },
  {
    path: "/product",
    component: index4,
    meta: { scrollToTop: true },
  },
  {
    path: "/user",
    component: index5,
    meta: { scrollToTop: true },
  },
  {
    path: "/addProduct",
    component: addProduct,
    meta: { scrollToTop: true },
  },
  // {
  //     path: '/editProduct',
  //     component: editProduct,
  // },

  {
    path: "/product/:id",
    name: "editProduct",
    component: editProduct,
    meta: { scrollToTop: true },
  },
  // {
  //     path: '/product/:id',
  //     name: 'editProduct',
  //     component: editProduct,
  // },
  {
    path: "/offerProduct/:id",
    name: "offerProduct",
    component: offerProduct,
    meta: { scrollToTop: true },
    // props: true,
  },
  {
    path: "/collections/MyCollection",
    component: CoffeeCollections,
    meta: { scrollToTop: true },
  },
  {
    path: "/collections/Tea",
    component: TeaCollections,
    meta: { scrollToTop: true },
  },
  {
    path: "/collections/MilkTea",
    component: MilkTeaCollections,
    meta: { scrollToTop: true },
  },
  {
    path: "/collections/Frosty",
    component: FrostyCollections,
    meta: { scrollToTop: true },
  },
  {
    path: "/collections/AllCollections",
    component: AllCollections,
    meta: { scrollToTop: true },
  },
  {
    path: "/offerProduct/cart",
    component: Cart,
    meta: { scrollToTop: true },
  },
  {
    path: "/offers",
    component: offers,
    meta: { scrollToTop: true },
  },
  {
    path: "/successfulOrders",
    component: successfulOrders,
    meta: { scrollToTop: true },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // scrollBehavior(){
  //     return true;
  //   },
  // scrollBehavior(to, from, savedPosition) {
  // if (to.meta.scrollToTop) {
  //     return { x: 0, y: 0 };
  // } else {
  //     return savedPosition;
  // }
  // }
});

// module.exports = {
//     devServer: {
//         proxy: `http://localhost:3000`,
//     },
// }
router.beforeEach((to, from, next) => {
  if (to.meta.scrollToTop) {
    window.scrollTo(0, 0); // Scroll to the top
  }
  next(); // Don't forget to call next() to allow navigation
});
export default router;
