<template>
  <headerAdmin />

  <div
    class="container p-0"
    id="container"
    style="max-width: 1441px !important"
  >
    <footerAdmin />
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th width="1">#</th>
          <th width="20%">Tên Sản Phẩm</th>
          <th width="80%">Miêu Tả</th>
          <th width="20%">Giá</th>
          <th width="20%">Loại</th>
          <th width="20%">Ảnh</th>
          <th width="1">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>
            <!-- item.name === 'Cà Phê Đen Đá'  -->
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.name" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.description }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.description"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.price }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.price"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.type }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.type" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index"></span>
            <span>
              <img class="card-thumb" v-bind:src="item.image" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">
              <router-link
                :to="{
                  name: 'editProduct',
                  params: { id: item._id },
                  components: item,
                }"
              >
                <button
                  @click="edit(item, index)"
                  class="btn btn-sm btn-outline-secondary mr-2"
                >
                  Edit
                </button>
              </router-link>
              <button
                @click="deleteProduct(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Remove
              </button>
            </span>
            <span v-else>
              <button
                @click="cancel(item)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Cancel
              </button>
              <button
                @click="save(item)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Save
              </button>
            </span>
          </td>
        </tr>
        <tr>
          <div style="display: flex">
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
          </div>
          <div>

          </div>

          <td colspan="6" class="add-user">
            <button
              v-show="!editIndex"
              @click="add()"
              class="btn btn-sm btn-secondary"
            >
              Thêm Sản Phẩm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import headerAdmin from "../components/headerAdmin.vue";
import footerAdmin from "../components/footerAdmin.vue";

// import image1 from "../assets/images/p1.png"
// import image2 from "../assets/images/p2.png"
// import image3 from "../assets/images/p3.png"

// import axios from 'axios';
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
      products: [],
      currentPage: 1, 
      itemsPerPage: 10, 
      totalPages: 1,
    };
  },
  created() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
    //   try {
    //     const response = await axios.get("/product/getProduct", {
    //       params: {
    //         page: this.currentPage,
    //         limit: this.itemsPerPage,
    //       },
    //     });
    //     this.products = response.data;
    //     // Update the total number of pages based on the response.
    //     this.totalPages = response.headers['x-total-count']
    //     console.log(this.totalPages);
    //   } catch (error) {
    //     console.error(error);
    //   }
    try {
        const response = await axios.get('/product/getProduct', {
            params: {
                page: this.currentPage,
                limit: this.itemsPerPage
            }
        });
        this.products = response.data.items;
        this.totalPages = Math.ceil(response.data.totalCount / this.itemsPerPage);
    } catch (error) {
        console.error(error);
    }
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

    deleteProduct(item, products) {
      console.log(item);
      axios
        .post(`/product/deleteProduct`, item)
        .then((res) => {
          document.location.href = "./product";
        })
        .catch((err) => {
          console.log(err);
          alert("delete failed");
        });
    },

    add() {
      document.location.href = "./addProduct";
    },

    edit(item, index) {
      console.log(item._id);
      // const id = this.products.indexOf(item)+1;
      // this.$route.params.id
    },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.user.splice(this.user.indexOf(item), 1);
        return;
      }
      Object.assign(item, this.originalData);
      this.originalData = null;
    },
    save(item) {
      this.originalData = null;
      this.editIndex = null;
      axios.post(`/product`, item);
    },
    remove(item, index) {
      this.product.splice(index, 1);
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
  width: 1440px;
}
.add-user {
  text-align: end;
}
.card-thumb {
  height: 100px;
}
.btn-increment{
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
</style>
