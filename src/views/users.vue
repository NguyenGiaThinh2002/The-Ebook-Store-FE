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
          <th width="20%">Tên</th>
          <th width="20%">Số Điện Thoại</th>
          <th width="40%">Địa Chỉ</th>
          <th width="20%">Đã mua</th>
          <!-- <th width="1">#</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in user" :key="item.id">
          <td>{{ index + 1 }}</td>
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
            <span v-if="editIndex !== index">{{ item.phone }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.phone"
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
            <span v-if="editIndex !== index">{{ getUserOrder(item) }} sản phẩm</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                v-model="item.address"
              />
            </span>
          </td>

          <!-- <td>
            <span v-if="editIndex !== index">
              <button
                @click="edit(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Sửa
              </button>
              <button
                @click="deleteUser(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Xoá
              </button>
            </span>
            <span v-else>
              <button
                @click="cancel(item)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Huỷ
              </button>
              <button
                @click="save(item)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >
                Lưu
              </button>
            </span>
          </td> -->
        </tr>
        <!-- <tr>
          <td colspan="6" class="add-user">
            <button
              v-show="!editIndex"
              @click="add()"
              class="btn btn-sm btn-secondary"
            >
              Thêm User
            </button>
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import headerAdmin from "../components/headerAdmin.vue";
import footerAdmin from "../components/footerAdmin.vue";
import axios from "../services/axios";

import ComponentA from "./product.vue";
export default {
  name: "MyPage",
  components: {
    headerAdmin,
    footerAdmin,
    ComponentA,
  },
  data() {
    return {
      editIndex: null,
      originalData: null,
      user: [],
      user1: {},
      quantity: 0,
      Orders: [],

    };
  },

  created() {
    axios.get(`/admin`).then((res) => {
      console.log(res.data);
      this.user = res.data;
    });

    axios.get(`/order/getOrder`).then((res) => {
      this.Orders = res.data;
      // this.Coffee = res.data.filter((products) => products.type === "Ca Phe");
    });
    // this.coffee = 1;
    // axios.get(`/product/getAllProduct`).then((res) => {
    //   for (const i in this.Orders) {
    //     if (this.Orders[i].isShipped) {
    //       this.quantity = this.Orders[i].quantity;
    //       this.products = res.data.find(
    //         (product) => product._id === this.Orders[i].orderId
    //       );
    //       if (this.products.type === "Ca Phe") {
    //         this.coffee += this.quantity;
    //       }
    //       if (this.products.type === "Tra") {
    //         this.tea += this.quantity;
    //       }
    //       if (this.products.type === "Tra Sua") {
    //         this.milkTea += this.quantity;
    //       }
    //       if (this.products.type === "Da Xay") {
    //         this.frosty += this.quantity;
    //       }
    //     }
    //   }
    // });
  },
  computed:{
  },

  methods: {
    getUserOrder(item){
        return this.Orders.reduce((total, product) => {
          if(product.isShipped && product.phone == item.phone){
            return total + product.quantity;
          }
          return total;
        }, 0);
      // for (const i in this.Orders) {
      //   if (this.Orders[i].isShipped && this.Orders[i].phone == item.phone) {
      //     console.log(item.phone);
      //     this.quantity += this.Orders.quantity;
      //   }
      // // return this.quantity;
      // }
      // return this.quantity;
    },   
    // deleteUser(item, user) {
    //     console.log(item);
    //     axios.post(`/admin/deleteUser`, item)
    //         .then(res => {
    //             document.location.href = './user'

    //         })
    //         .catch(err => {
    //             console.log(err);
    //             alert('delete failed')
    //         }
    //         )
    // },

    add() {
      this.originalData = null;
      this.user.push({ username: "", phone: "", address: "" });
      this.editIndex = this.user.length - 1;
    },

    // add(){
    //     this.$refs.ComponentAInstance.add();
    // },

    // edit(item, index) {
    //     this.originalData = Object.assign({}, item)
    //     this.editIndex = index
    // },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.user.splice(this.user.indexOf(item), 1);
        return;
      }

      Object.assign(item, this.originalData);
      this.originalData = null;
    },

    remove(item, index) {
      this.user.splice(index, 1);
    },

    save(item) {
      this.originalData = null;
      this.editIndex = null;
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
}

.add-user {
  text-align: end;
}
</style>
