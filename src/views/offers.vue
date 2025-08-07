<template>
  <headerAdmin />

  <div
    class="container p-0"
    id="container"
    style="max-width: 1441px !important"
  >
    <footerAdmin />
    <table class="table table-bordered">
      <thead class="thead-light" style="width: 1441px !important">
        <tr>
          <th width="2%">#</th>

          <th width="11%">Tên Sản Phẩm</th>
          <th width="5%">Số Lượng</th>
          <th width="5%">Size</th>
          <th width="11%">Giá</th>
          <th width="15%">Toppings</th>

          <!-- <th width="11%">Tổng Giá</th> -->
          <th width="11%">SĐT Khách Hàng</th>
          <th width="11%">Tên Khách Hàng</th>
          <th width="40%">Địa Chỉ</th>
          <th width="11%">Ngày</th>
          <!-- Hàm isShipped -->
          <th width="1">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in visibleOrders" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>
            <!-- item.name === 'Cà Phê Đen Đá'  -->
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.name" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.quantity }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.quantity"
              />
            </span>
          </td>
          <td>
            <div v-for="size in item.size" :key="size._id">
              <p style="margin-top: 0; margin-bottom: 0px" v-if="!size">Nhỏ</p>
              <p style="margin-top: 0; margin-bottom: 0px" v-if="size">
                {{ size.name }}
              </p>
            </div>
            <!-- <span v-if="editIndex !== index">{{ item.size }}</span>
                        <span v-if="editIndex === index">
                            <input class="form-control form-control-sm" v-model="item.size">
                        </span> -->
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.totalPrice }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.totalPrice"
              />
            </span>
          </td>
          <td>
            <div
              v-for="(topping, index) in item.toppings"
              :key="index"
              class="topping-item"
            >
              <p style="margin-left: 15px">
                {{ topping.name }}
                <span v-if="index < item.toppings.length - 1"> +&nbsp </span>
              </p>
            </div>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.phone }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.phone"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.username }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.username"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.address }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.address"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.orderDate }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.orderDate"
              />
            </span>
          </td>

          <td>
            <span v-if="!item.isShipped">
              <button
                @click="isShipped(item)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Hoàn Thành Đơn Hàng
              </button>
            </span>
            <span v-if="item.isShipped">
              <h6>Đã Giao</h6>
            </span>
          </td>
        </tr>
        <tr>
          <div style="display: flex">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary mr-2"
              @click="prevPage()"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <button
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              class="btn btn-sm btn-outline-secondary mr-2"
              @click="currentPage = pageNumber"
              :class="{ active: currentPage === pageNumber }"
            >
              {{ pageNumber }}
            </button>
            <button
              class="btn btn-sm btn-outline-secondary mr-2"
              type="button"
              @click="nextPage()"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </tr>
        <!-- <div style="display: flex">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary mr-2"
            @click="previousPage()"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="btn btn-sm btn-outline-secondary mr-2"
            @click="
              currentPage = pageNumber;
              loadProducts();
            "
            :class="{ active: currentPage === pageNumber }"
          >
            {{ pageNumber }}
          </button>
          <button
            class="btn btn-sm btn-outline-secondary mr-2"
            type="button"
            @click="nextPage()"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div> -->
        <!-- <tr>
                    <td colspan="11" class="add-user"> <button v-show="!editIndex" @click="add()"
                            class="btn btn-sm btn-secondary">Thêm Sản Phẩm</button></td>
                </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import headerAdmin from "../components/headerAdmin.vue";
import footerAdmin from "../components/footerAdmin.vue";
import axios from "../services/axios";
export default {
  name: "MyPage",
  components: {
    headerAdmin,
    footerAdmin,
  },
  data() {
    return {
      editIndex: null,
      originalData: null,
      Orders: [],
      currentPage: 1,
      currentPage: 1,
      itemsPerPage: 10, // Number of items per page
    };
  },
  created() {
    this.getOrder();
  },
  computed: {
    filteredOrders() {
      return this.Orders.filter((order) => !order.isShipped);
    },
    visibleOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredOrders.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },
  },

  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.filteredOrders.length) {
        this.currentPage++;
      }
    },
    getOrder() {
      axios.get(`/order/getOrder`).then((res) => {
        console.log(res.data);
        // this.Orders = res.data;
        this.Orders = res.data.filter((orders) => orders.isShipped === false);
      });
    },

    isShipped(item) {
      item.isShipped = true;
      axios
        .post(`/order/updateOrder`, item)
        .then((res) => {
          alert("da giao hang");
        })
        .catch((err) => {
          console.log(err);
        });
      this.getOrder();
    },
    nextPage() {
      // if (this.currentPage <= this.totalPages) {
      this.currentPage++; // Increment current page
      this.loadProducts(); // Fetch the next set of products
      // }
      console.log(this.totalPages);
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // Decrement current page
        this.loadProducts(); // Fetch the previous set of products
      }
    },
  },
};
</script>
<style>
input[type="number"] {
  text-align: right;
}

.container {
  display: inline-flex;
  width: 100%;
}

.add-user {
  text-align: end;
}

.card-thumb {
  height: 100px;
}
</style>
