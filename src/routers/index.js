import { createWebHistory, createRouter } from "vue-router";
import index1 from "../views/homepage.vue";
import index2 from "../views/login.vue";
import offerProduct from "../views/offerProduct.vue";
import MyCollection from "../collections/MyCollection.vue";
import Cart from "../views/Cart.vue";

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
    path: "/offerProduct/:id",
    name: "offerProduct",
    component: offerProduct,
    meta: { scrollToTop: true },
  },
  {
    path: "/collections/MyCollection",
    component: MyCollection,
    meta: { scrollToTop: true },
  },
  {
    path: "/offerProduct/cart",
    component: Cart,
    meta: { scrollToTop: true },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.scrollToTop) {
    window.scrollTo(0, 0); // Scroll to the top
  }
  next(); // Don't forget to call next() to allow navigation
});
export default router;
