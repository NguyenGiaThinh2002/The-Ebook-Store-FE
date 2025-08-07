<template>
  <headerAdmin />
  <!-- {{ product.name }} -->

  <div class="container">
    <footerAdmin />
    <div class="body-container">
      <form class="sign-in-htm" method="POST" @submit.prevent="editProduct()">
        <div>
          <h1>Sửa Sản Phẩm</h1>
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
        <!-- class="input-group mb-3 mt-3 " -->
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
        <h6>Loại sản phẩm</h6>
        <div class="input-group mb-3">
          <select
            required="true"
            class="form-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            v-model="product.type"
          >
            <option value="Ca Phe">Cà phê</option>
            <option value="Tra">Trà</option>
            <option value="Tra Sua">Trà Sữa</option>
            <option value="Da Xay">Đá Xay</option>
          </select>
        </div>
        <div>
          <img class="card-thumb" v-bind:src="product.image" />
        </div>
        <div class="input-group mb-3 mt-3">
          <input
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
          <button @click="addSize">Add Size</button>

          <ul>
            <li v-for="(size, index) in product.sizes" :key="index">
              {{ size.name }} - ${{ size.price }}
              <button @click="removeSize(index)">Remove</button>
            </li>
          </ul>
        </div>
        <div class="input-group mb-3 mt-3">
          <!-- product Toppings edition -->
          <input v-model="newTopping.name" placeholder="Enter Size Name" />
          <input
            v-model.number="newTopping.price"
            placeholder="Enter Size Price"
          />
          <button @click="addTopping">Add Toppings</button>

          <ul>
            <li v-for="(topping, index) in product.toppings" :key="index">
              {{ topping.name }} - ${{ topping.price }}
              <button @click="removeTopping(index)">Remove</button>
            </li>
          </ul>
        </div>
        <!-- <label>Select Size:</label>
                <select v-model="selectedSize">
                    <option v-for="size in product.sizes" :key="size.id" :value="size">
                    {{ size.name }} - ${{ size.price }}
                    </option>
                </select> -->

        <!-- <div class="input-group flex-wrap">
                    <div v-for="size in product.sizes" :key="size._id">
                        <input type="text" v-model="size.name">
                        <input type="text" v-model="size.price">
                    </div>
                </div> -->

        <div class="col-12">
          <button type="submit" class="btn btn-primary" value="Sign Up">
            Sửa sản phẩm
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
      selectedSize: null,
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
  created() {
    this.getProduct();
  },

  methods: {
    getProduct(){
      axios.get(`/product/getAllProduct`).then((res) => {
      console.log(res.data);
      this.product = res.data.find(
        (product) => product._id == this.$route.params.id
      );
    });
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
        // console.log(this.product.image);
        // console.log(urls);
        if (urls.length !== 0) {
          this.product.image = urls;
        }
      }
    },
    async editProduct() {
      let id = document.getElementById("product-images");
      const urls = await this.uploadFiles(id.files);

      axios.post(`/product/updateProduct`, this.product).then((res) => {
        this.getProduct();
      });
    },
    addSize() {
      if (this.newSize.name && this.newSize.price > 0) {
        this.product.sizes.push({ ...this.newSize });
        this.newSize.name = ""; // Clear the input fields after adding a size
        this.newSize.price = 0;
      }
    },
    removeSize(index) {
      this.product.sizes.splice(index, 1);
    },

    addTopping() {
      if (this.newTopping.name && this.newTopping.price > 0) {
        this.product.toppings.push({ ...this.newTopping });
        this.newTopping.name = ""; // Clear the input fields after adding a size
        this.newTopping.price = 0;
      }
    },
    removeTopping(index) {
      this.product.toppings.splice(index, 1);
    },
  },
  mounted() {
    const myTextarea = document.getElementById("myTextarea");
    myTextarea.addEventListener("input", () => {
      console.log("Nội dung đã thay đổi:", myTextarea.value);
    });
  },
};
</script>

<style>
.body-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#myTextarea {
  width: 100%; /* Độ rộng 100% của phần tử chứa */
  height: 100px; /* Chiều cao ban đầu, có thể thay đổi theo ý muốn */
}
</style>

<!-- <textarea id="prompt-textarea" tabindex="0" data-id="request-:R36pdm:-18" rows="1" placeholder="Send a message" class="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 pl-3 md:pl-4" style="max-height: 200px; height: 104px; overflow-y: hidden;"></textarea> -->
