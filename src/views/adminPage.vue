<template>
  <headerAdmin />
  <div id="container">
    <footerAdmin />
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th width="10%">Doanh Thu</th>
          <th width="10%">Số Lượng Người Dùng</th>
          <th width="10%">Số Lượng Sản Phẩm Bán Ra</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <td>{{ index + 1 }}</td> -->
          <td>
            <span>
              {{
                new Intl.NumberFormat()
                  .format(getTotalPrice)
                  .replaceAll(",", ".")
              }}
              đ</span
            >
          </td>
          <td>
            <span> {{ getUser }}</span>
          </td>
          <td>
            <span>{{ getQuantity }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Bar
      style="width: 50%; height: 50%"
      id="my-chart-id"
      :options="chartOptions"
      :data="dynamicChartData"
    />
  </div>
</template>

<script>
import headerAdmin from "../components/headerAdmin.vue";
import footerAdmin from "../components/footerAdmin.vue";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
// import Chart from 'chart.js';
import axios from "../services/axios";

export default {
  name: "MyPage",
  components: {
    headerAdmin,
    footerAdmin,
    Bar,
  },
  data() {
    return {
      user: [],
      Orders: [],
      products: [],
      quantity: 0,
      coffee: 0,
      tea: 0,
      milkTea: 0,
      frosty: 0,
      i: {},
      // index: 0,
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          { label: "Data One", backgroundColor: "#f87979", data: [40, 20, 12] },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  created() {
    axios.get(`/order/getOrder`).then((res) => {
      this.Orders = res.data;
      // this.Coffee = res.data.filter((products) => products.type === "Ca Phe");
    });
    axios.get(`/admin`).then((res) => {
      this.user = res.data;
    });
    // this.coffee = 1;
    axios.get(`/product/getAllProduct`).then((res) => {
      for (const i in this.Orders) {
        if (this.Orders[i].isShipped) {
          this.quantity = this.Orders[i].quantity;
          this.products = res.data.find(
            (product) => product._id === this.Orders[i].orderId
          );
          if (this.products.type === "Ca Phe") {
            this.coffee += this.quantity;
          }
          if (this.products.type === "Tra") {
            this.tea += this.quantity;
          }
          if (this.products.type === "Tra Sua") {
            this.milkTea += this.quantity;
          }
          if (this.products.type === "Da Xay") {
            this.frosty += this.quantity;
          }
        }
      }
    });
  },
  computed: {
    dynamicChartData() {
      return {
        labels: ["Cà Phê", "Trà", "Trà Sữa", "Đá Xay"],
        datasets: [
          {
            label: "Số Lượng",
            backgroundColor: "#f87979",
            data: [this.coffee, this.tea, this.milkTea, this.frosty], // Update the first value with this.quantity
          },
        ],
      };
    },
    getTotalPrice() {
      return this.Orders.reduce((total, product) => {
        if (product.isShipped) {
          return total + product.totalPrice;
        }
        return total;
      }, 0);
    },
    getQuantity() {
      // return this.Orders.reduce(
      //   (total, product) => total + product.quantity,
      //   0
      // );
      return this.Orders.reduce((total, product) => {
        if (product.isShipped) {
          return total + product.quantity;
        }
        return total;
      }, 0);
    },

    getUser() {
      return this.user.length;
    },
    // getCoffee() {
    //   return this.Coffee.length;
    // },
  },
  methods: {
    admin() {
      axios.post(`/user`, this.user);
    },
  },
};
</script>
<style></style>

db.Product.updateOne({ _id: ObjectId("650adfda3131b7dfed308d01") },{$set:
{sizes: [{name: 'vừa', price: 6000}, { name: 'lớn', price: 10000}]}})
