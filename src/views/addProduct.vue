<template>
  <headerAdmin />
  <div class="container">
    <footerAdmin />
    <div class="body-container">
      <form class="sign-in-htm" method="post" @submit.prevent="AddProduct()">
        <div>
          <h1>Thêm Sản Phẩm</h1>
        </div>
        <h6 class="mt-3">Tên sản phẩm</h6>
        <div class="input-group mb-3">
          <input
            required="true"
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="product.name"
          />
        </div>
        <h6>Mô tả</h6>
        <div id="myTextarea" rows="4" cols="50" class="input-group mb-3 mt-3">
          <textarea
            required="true"
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="product.description"
          ></textarea>
        </div>
        <h6>Giá sản phẩm</h6>
        <div class="input-group mb-3 mt-3">
          <input
            required="true"
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="product.price"
          />
        </div>

        <!-- <h6>Loại sản phẩm</h6>
        <div class="input-group mb-3">
          <select
            required="true"
            class="form-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            v-model="product.type"
            ref="select"
          >
            <option value="Ca Phe">Cà phê</option>
            <option value="Tra">Trà</option>
            <option value="Tra Sua">Trà Sữa</option>
            <option value="Da Xay">Đá Xay</option>
            <option value="Other">Tùy chọn khác</option>
          </select>
        </div>
        <div v-if="product.type === 'Other'">
          <input type="text" class="form-control" v-model="newType" placeholder="Nhập loại sản phẩm mới" />
          <button type="button" @click="addNewType">Thêm</button>
        </div> -->

        <h6>Loại sản phẩm</h6>
        <div class="input-group mb-3">
          <select
            required="true"
            class="form-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            v-model="selectedType"
            ref="select"
          >
            <option value="Ca Phe">Cà phê</option>
            <option value="Tra">Trà</option>
            <option value="Tra Sua">Trà Sữa</option>
            <option value="Da Xay">Đá Xay</option>
            <option value="Other">Tùy chọn khác</option>
          </select>
        </div>
        <div v-if="selectedType === 'Other'">
          <input
            type="text"
            class="form-control"
            v-model="newType"
            placeholder="Nhập loại sản phẩm mới"
          />
          <button type="button" @click="addNewType">Thêm</button>
        </div>

        <div class="input-group mb-3 mt-3">
          <input
            required="true"
            type="file"
            multiple
            class="form-control"
            id="product-images"
            aria-describedby="inputGroupFileAddon03"
            aria-label="Upload"
          />
        </div>

        <div class="input-group mb-3 mt-3">
          <!-- product Sizes edition -->
          <input v-model="newSize.name" placeholder="Enter Size Name" />
          <input
            v-model.number="newSize.price"
            placeholder="Enter Size Price"
          />
          <button type="button" @click="addSize()">Add Size</button>
          <ul>
            <li v-for="(size, index) in selectedSizes" :key="index">
              {{ size.name }} - ${{ size.price }}
              <button type="button" @click="removeSize(index)">Remove</button>
            </li>
          </ul>
        </div>

        <div class="input-group mb-3 mt-3">
          <!-- product Toppings edition -->
          <input v-model="newTopping.name" placeholder="Enter Topping Name" />
          <input
            v-model.number="newTopping.price"
            placeholder="Enter Topping Price"
          />
          <button type="button" @click="addTopping()">Add Toppings</button>

          <ul>
            <li v-for="(topping, index) in selectedToppings" :key="index">
              {{ topping.name }} - ${{ topping.price }}
              <button type="button" @click="removeTopping(index)">
                Remove
              </button>
            </li>
          </ul>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary" value="Sign Up">
            Thêm sản phẩm
          </button>
        </div>

        <div class="hr"></div>
        <div class="foot-lnk"></div>
      </form>
    </div>
  </div>
</template>
<script>
import headerAdmin from "../components/headerAdmin.vue";
import footerAdmin from "../components/footerAdmin.vue";

// import footerAdmin from "./footerAdmin.vue";
// import headerAdmin from "./headerAdmin.vue";
// import axios from 'axios';
import axios from "../services/axios";
export default {
  name: "thinh",
  components: {
    headerAdmin,
    footerAdmin,
  },
  data() {
    return {
      selectedFile: null,
      product: {},
      newType: "",
      selectedType: "Ca Phe",

      selectedSizes: [],
      selectedToppings: [],
      newSize: {
        name: "",
        price: 0,
      },
      newTopping: {
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    addSize() {
      if (this.newSize.name && this.newSize.price > 0) {
        this.selectedSizes.push({ ...this.newSize });
        this.newSize.name = ""; // Clear the input fields after adding a size
        this.newSize.price = 0;

        this.product.sizes = this.selectedSizes;
        console.log(this.product.sizes);
      }
    },
    removeSize(index) {
      this.product.sizes.splice(index, 1);
    },

    addTopping() {
      if (this.newTopping.name && this.newTopping.price > 0) {
        this.selectedToppings.push({ ...this.newTopping });
        this.newTopping.name = ""; // Clear the input fields after adding a size
        this.newTopping.price = 0;
        this.product.toppings = this.selectedToppings;
      }
    },
    removeTopping(index) {
      this.product.toppings.splice(index, 1);
    },
    addNewType() {
      if (this.newType.trim() !== "") {
        // Use this.$refs.select to access the DOM element
        const selectElement = this.$refs.select;

        // Create a new option element and add it to the select
        const option = document.createElement("option");
        option.text = this.newType;
        option.value = this.newType;

        selectElement.appendChild(option);
        this.selectedType = this.newType;
        this.newType = "";
      }
    },
    async uploadFiles(files) {
      if (files) {
        const cloud_name = "dlbfiyzfq";
        const preset_name = "ml_default";
        const folder_name = "ECMA";
        const urls = [];
        const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

        const formData = new FormData(); // key: value

        formData.append("upload_preset", preset_name);
        formData.append("folder", folder_name);

        for (const file of files) {
          formData.append("file", file);

          var res = await axios.post(api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          urls.push(res.data.secure_url);
        }
        console.log(urls);
        this.product.image = urls;
      }
    },
    async AddProduct() {
      let id = document.getElementById("product-images");
      const urls = await this.uploadFiles(id.files);
      console.log(this.product.image);
      this.product.type = this.selectedType;
      axios.post(`/product`, this.product).then((res) => {
        document.location.href = "./addProduct";
      });
    },
  },
};
</script>

<style>
/* .img{
  height: 100px;
  width: 100px;
} */
.body-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
