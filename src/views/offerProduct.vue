<template>
  <theHeader />
  <BookPurchaseModal
    :purchaseInfo="product"
    :visible="showModal"
    @close="showModal = false"
  />

  <div class="container thisProduct">
    <div class="thisproduct-container">
      <div>
        <img
          class="card-thumb"
          v-bind:src="product.imgUrl"
          style="width: 570px; height: 570px"
        />
      </div>
      <div class="container card-info-thisProduct" style="width: 900px">
        <h1>{{ product.title }}</h1>
        <p
          v-if="region === 'japan'"
          style="
            display: flex;
            justify-content: flex-start;
            color: black;
            font-size: 1.5rem;
          "
        >
          Point: {{ product.point_price }}
        </p>
        <p
          v-else
          style="
            display: flex;
            justify-content: flex-start;
            color: black;
            font-size: 1.5rem;
          "
        >
          Price: $ {{ product.price }}
        </p>
        <div class="Order-product" style="display: flex">
          <!--
          <router-link
            to="/offerProduct/cart"
            style="text-decoration: none !important"
          >
           
          </router-link>
          -->
          <button type="button" class="btn-order" @click="cartPage(product)">
            <h5>Mua Sách</h5>
          </button>
          <!--

          <button type="button" class="btn-order" @click="AddToBasket()">
            <h5>Thêm vào vỏ</h5>
          </button>
          -->
        </div>
      </div>
    </div>
  </div>

  <div class="product-related-info">
    <!--
    <div>
      <h4>Mô tả sản phẩm</h4>
      <h6>{{ product.description }}</h6>
      <h4>Sản phẩm liên quan</h4>

    </div>
   -->
    <div>
      <h4>Related Books</h4>
    </div>
    <div class="container collections" style="display: block">
      <div class="product-title"></div>
      <div class="card-products">
        <div
          class="menu-list-collectiions"
          style="display: flex; justify-content: space-evenly"
        >
          <div
            class="card"
            v-for="item in relatedProducts"
            :key="item.id"
            style="width: 200px; height: 200px"
            @click="changePage()"
          >
            <router-link
              :to="{
                name: 'offerProduct',
                params: { id: item.id },
                components: item,
              }"
              style="text-decoration: none"
            >
              <img
                class="card-thumb"
                v-bind:src="item.imgUrl"
                style="width: 200px; height: 200px"
              />
              <div class="card-info">
                <h6>{{ item.title }}</h6>
                <p v-if="region === 'japan'" style="font-size: 1.2rem">
                  Point: {{ product.point_price }}
                </p>
                <p v-else style="font-size: 1.2rem">
                  Price: $ {{ product.price }}
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
import { getRegion } from "../services/region";
import BookPurchaseModal from "../components/BookPurchaseModal.vue";
// import axios from 'axios';
import axios from "../services/axios";
export default {
  name: "thinh",
  components: {
    theHeader,
    theFooter,
    BookPurchaseModal,
  },
  data() {
    return {
      product: {},
      relatedProducts: [],
      // selectedSizes: [],
      selectedSizes: "",
      selectedToppings: [],
      quantity: 1,
      userId: "",
      totalPrice: 0,
      orderDetails: {},
      region: "",
      showModal: false,
    };
  },
  created() {
    this.userId = localStorage.getItem("userId");
    this.getProduct();
    this.region = getRegion();
  },

  methods: {
    getProduct() {
      axios.get(`/ebook/getEbooks`).then((res) => {
        this.product = res.data.find(
          (product) => product.id == this.$route.params.id
        );
        this.relatedProducts = res.data
          .filter(
            (product) =>
              product.type === this.product.type &&
              product.id !== this.product.id
          )
          .slice(0, 5); // ✅ take only the first 5
      });
    },
    changePage() {
      // location.reload();
      this.getProduct();
      this.selectedSizes = "option1";
      this.selectedToppings = [];
      this.quantity = 1;
    },
    async cartPage(product) {
      // this.AddToBasket();
      if (!this.userId) {
        alert("Vui Long Dang Nhap");
      } else {
        if (this.region == "japan") {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          const res = await axios.get(`/ebook/getUserBalance/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (product.point_price > res.data.balance) {
            alert("Account's Balance is not enough to buy");
          } else {
            const response = await axios
              .post(
                "/ebook/makePurchase",
                {
                  user_id: Number(userId),
                  ebook_id: product.id,
                  paid_with_point: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                alert("Buy book successfully");
                location.reload();
              });
          }
        } else {
          this.showModal = true;
        }
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    AddToBasket() {
      if (!this.userId) {
        alert("Vui Long Dang Nhap");
      } else {
        this.orderDetails.orderId = this.product._id;
        this.orderDetails.userId = this.userId;
        this.orderDetails.quantity = this.quantity;
        this.orderDetails.totalPrice = this.totalPrice;
        this.orderDetails.size = this.selectedSizes;
        this.orderDetails.toppings = this.selectedToppings;
        this.orderDetails.name = this.product.name;
        axios
          .post(`/orderDetail`, this.orderDetails)
          .then((res) => {
            // this.orderDetails = "";
            // location.reload();
            this.getProduct();
            this.selectedSizes = "option1";
            this.selectedToppings = [];
            this.quantity = 1;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {},
  computed: {
    calculateTotal() {
      let basePrice = this.product.price;
      if (this.selectedSizes === "option1") {
        basePrice = this.product.price;
      } else if (this.selectedSizes !== "option1") {
        basePrice = this.selectedSizes.price + this.product.price;
      }
      if (!this.selectedSizes) {
        basePrice = this.product.price;
      }
      const toppingPrice = this.selectedToppings.reduce(
        (total, topping) => total + topping.price,
        0
      );
      this.totalPrice = (basePrice + toppingPrice) * this.quantity;
      return (basePrice + toppingPrice) * this.quantity;
    },
  },
};
</script>

<style>
div .thisproduct-container {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 50px;
}

div .thisProduct {
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
}

div .product-related-info {
  margin: 0 4%;
  height: 400px;
}

div .card-info-thisProduct {
  width: 570px;
  height: 570px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
}

.btn-secondary:hover {
  border-color: #e57905 !important;
  background: #e57905 !important;
  color: #fff !important;
}

.btn-check:checked + .btn-secondary {
  border-color: #e57905 !important;
  background: #e57905 !important;
  color: #fff !important;
}

label.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  height: 40px;
  line-height: 1;
  font-weight: 400;
  margin-right: 16px;
  font-size: 14px;
  background-color: #fff;
  color: #666666;
}

label.btn {
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  color: #666666;
  height: 40px;
  padding: 0 15px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  position: relative;
  margin: 10px 20px 10px 0;
}

div .button-decrease {
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  height: 20px;
  line-height: 1;
  font-weight: 400;
  margin-right: 16px;
  font-size: 14px;
  background-color: #fff;
  color: #666666;
}

div .button-increase {
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  height: 20px;
  line-height: 1;
  font-weight: 400;
  margin-right: 16px;
  margin-left: 16px;
  font-size: 14px;
  background-color: #fff;
  color: #666666;
}

div .btn-order {
  background: #e57905;
  margin-top: 15px;
  border-radius: 8px;
  padding: 12px 0;
  text-align: center;
  width: 285px;
  height: 50px;
}

h5 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}
</style>
