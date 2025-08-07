<template lang="">
  <theHeader />
  <div class="container menu-wrap" style=" max-height: 3500px!important; ">
    <sidebar />
    <div class="container collections" style="display: block;">
      <div class="product-title">
        <h3>Cà Phê</h3>
      </div>
      <div class="card-products">
        <div class="menu-list-collectiions">
          <div class="card" v-for="product in Coffee" :key="product.id">
            <router-link
              :to="{
                name: 'offerProduct',
                params: { id: product._id },
                components: product,
              }"
              style="text-decoration: none !important"
            >
              <!-- <router-link to="/offerProduct">  -->
              <img class="card-thumb" v-bind:src="product.image" />

              <div class="card-info">
                <h6>{{ product.name }}</h6>
                <p>
                  {{
                    new Intl.NumberFormat()
                      .format(product.price)
                      .replaceAll(",", ".")
                  }}
                  đ
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="product-title">
          <h3 style="padding: 40px 0 20px 0">Trà</h3>
        </div>
        <div class="menu-list-collectiions">
          <div class="card" v-for="product in Tea" :key="product.id">
            <router-link
              :to="{
                name: 'offerProduct',
                params: { id: product._id },
                components: product,
              }"
              style="text-decoration: none !important"
            >
              <img class="card-thumb" v-bind:src="product.image" />
              <div class="card-info">
                <h6>{{ product.name }}</h6>
                <p>
                  {{
                    new Intl.NumberFormat()
                      .format(product.price)
                      .replaceAll(",", ".")
                  }}
                  đ
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="product-title">
          <h3 style="padding: 40px 0 20px 0">Trà Sữa</h3>
        </div>
        <div class="menu-list-collectiions">
          <div class="card" v-for="product in MilkTea" :key="product.id">
            <router-link
              :to="{
                name: 'offerProduct',
                params: { id: product._id },
                components: product,
              }"
              style="text-decoration: none !important"
            >
              <img class="card-thumb" v-bind:src="product.image" />
              <div class="card-info">
                <h6>{{ product.name }}</h6>
                <p>
                  {{
                    new Intl.NumberFormat()
                      .format(product.price)
                      .replaceAll(",", ".")
                  }}
                  đ
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="product-title">
          <h3 style="padding: 40px 0 20px 0">Đá Xay</h3>
        </div>
        <div class="menu-list-collectiions">
          <div class="card" v-for="product in Frosty" :key="product.id">
            <router-link
              :to="{
                name: 'offerProduct',
                params: { id: product._id },
                components: product,
              }"
              style="text-decoration: none !important"
            >
              <img class="card-thumb" v-bind:src="product.image" />
              <div class="card-info">
                <h6>{{ product.name }}</h6>
                <p>
                  {{
                    new Intl.NumberFormat()
                      .format(product.price)
                      .replaceAll(",", ".")
                  }}
                  đ
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <theFooter />
</template>
<script>
import theHeader from "../components/theHeader.vue";
import theFooter from "../components/theFooter.vue";
import sidebar from "./sidebar.vue";
import axios from "../services/axios";
export default {
  components: {
    theHeader,
    theFooter,
    sidebar,
  },
  data() {
    return {
      Coffee: [],
      Tea: [],
      MilkTea: [],
      Frosty: [],
    };
  },
  created() {
    axios.get(`/product/getAllProduct`).then((res) => {
      console.log(res.data);
      // this.products = res.data;
      this.Coffee = res.data.filter((products) => products.type === "Ca Phe");
      this.Tea = res.data.filter((products) => products.type === "Tra");
      this.MilkTea = res.data.filter((products) => products.type === "Tra Sua");
      this.Frosty = res.data.filter((products) => products.type === "Da Xay");
    });
  },

  methods: {},
};
</script>

<style>
.menu-wrap {
  /* max-width: 1440px;
    height: 4116px; */
  margin-top: 56px;
  padding: 40px 0 50px;
}

body .menu-bar {
  transform: translateY(-60px);
  position: relative;
}

#sidebar {
  background-color: #fff;
}
.container .collections {
  min-width: 100%;
  padding-left: 72px;
}
div .card-products {
  width: 100%;
  display: block;
  flex-direction: row;
}
div .card {
  display: block;
  border-style: hidden;
  text-align: center;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0px 0px 13px 0px #00000040;
  width: 270px;
  height: 270px;
  /* margin-bottom: 30px;
    margin-left: 30px; */
  margin: 0px 15px 100px;
  border-radius: 10px;
}
.card .card-thumb {
  width: 270px;
  height: 270px;
  border-radius: 10px;

  box-sizing: border-box;
}
div .product-title {
  float: none;
  display: inline-block;
  margin-bottom: 24px;
  position: relative;
  margin-bottom: 30px;
  margin-top: 0;
  font-size: 24px;
  font-family: "SF Pro Display", sans-serif;
}

div .menu-list-collectiions {
  display: flex;
  flex-wrap: wrap;
}
</style>
