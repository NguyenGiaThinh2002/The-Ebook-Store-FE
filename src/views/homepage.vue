<template lang="">
  <body class="body">
    <div class="loader_overlay loaded"></div>
    <theHeader />

    <!-- Banner -->
    <section class="banner-home">
      <div id="demo" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            class="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../assets/bookstore/1.jpg"
              height="700px"
              class="d-block w-100"
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/bookstore/2.jpg"
              height="700px"
              class="d-block w-100"
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/bookstore/3.jpg"
              height="700px"
              class="d-block w-100"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>

    <!-- Ebook List -->
    <section class="menu-home">
      <div style="display: block; z-index: 1; position: relative; width: 100%">
        <div
          class="menu_list_home flex_wrap display_flex"
          style="justify-content: center; align-items: center"
        >
          <h1>EBook List</h1>
        </div>
        <div
          style="
            width: 90%;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin: 2% 4%;
            align-content: flex-start;
          "
        >
          <div
            v-for="item in paginatedProducts"
            :key="item.id"
            class="container collections"
            style="
              flex: 1 1 calc(30% - 16px);
              width: 350px;
              max-width: 400px;
              height: 400px;
            "
          >
            <div class="card-products">
              <div class="card">
                <router-link
                  :to="`/offerProduct/${item.id}`"
                  style="text-decoration: none !important"
                >
                  <img class="card-thumb" :src="item.imgUrl" />
                  <div class="card-info">
                    <h6
                      style="font-size: 1.3rem; font-weight: 600; color: blue"
                    >
                      {{ item.title }}
                    </h6>
                    <p
                      v-if="region === 'japan'"
                      style="color: black; font-size: 1.5rem"
                    >
                      {{ item.point_price }} point
                    </p>
                    <p v-else style="color: black; font-size: 1.5rem">
                      $ {{ item.price }}
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div style="display: flex; justify-content: center; margin: 20px 0">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="btn btn-primary"
            style="margin-right: 10px"
          >
            Prev
          </button>
          <span>Page {{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="btn btn-primary"
            style="margin-left: 10px"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <!-- Book Samples -->
    <section>
      <div class="container" style="width: 100%">
        <h1 style="margin-left: 4%">Các Mẫu Sách</h1>
      </div>
      <div
        class="d-flex flex-wrap justify-content-around"
        style="margin-bottom: 40px"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/2081/8163/files/001_90f0323d-1f0a-4f1d-9584-062f868e5473.jpg"
          class="shop_space"
          style="width: 45%; height: 600px"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/2081/8163/files/010-CAPTAIN-FANTASTIC-th.jpg"
          class="shop_space"
          style="width: 45%; height: 600px"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/2081/8163/files/005-SUNNY-MEADOWS-WOODLAND-SCHOOL-th.jpg"
          class="shop_space"
          style="width: 45%; height: 600px"
        />
        <img
          src="https://raw.githubusercontent.com/redlogs1st/cnd_ebook/refs/heads/main/ebookSource/01/001-HIDE-AND-SEEK-free-childrens-books-1.avif"
          class="shop_space"
          style="width: 45%; height: 600px"
        />
      </div>
    </section>
  </body>
  <theFooter />
</template>

<script>
import theHeader from "../components/theHeader.vue";
import theFooter from "../components/theFooter.vue";
import axios from "../services/axios";
import { getRegion } from "../services/region";

export default {
  created() {
    this.userId = localStorage.getItem("userId");
    this.getOrder();
    this.region = getRegion();
    if (!this.userId) {
      localStorage.setItem("userRegion", "japan");
    }
  },
  data() {
    return {
      products: [],
      region: "",
      currentPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(start, start + this.pageSize);
    },
  },
  components: { theFooter, theHeader },
  methods: {
    getOrder() {
      axios.get(`/ebook/getEbooks`).then((res) => {
        this.products = res.data;
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style>
body .body {
  max-width: 100%;
  /* height: 4116px; */
  overflow: hidden;

  justify-content: center;
  align-items: center;

  margin: 0;
  font-family: var(--bs-font-sans-serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
}
.a:hover {
  color: antiquewhite;
}

.menu_banner > a > img {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.menu-home {
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  position: relative;
}

.loader_overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #fff;
  transition: all 0.1s ease;
}
.loader_overlay.loaded {
  opacity: 0;
  visibility: hidden;
  z-index: -2;
}

.banner-home {
  width: 100%;
  transform: translateY(-60px);
  position: relative;
}

div .card-products {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin: 0 4%; */
}
div .card {
  display: block;
  border-style: hidden;
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 13px 0px #00000040;
  width: 40%;
  height: 40%;
  margin-bottom: 30px;
  margin-left: 30px;
  border-radius: 10px;
}
.card .card-thumb {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
}

.products-container {
  /* display: inline-flex;
  justify-items: center;
  justify-content: center;
  max-width: 70%; */
}

.menu_list_home {
  display: flex;
  flex-direction: row;
}

a:any-link {
  color: -webkit-link;
  cursor: auto;
}
#p4 {
  /* margin-left: 100px; */

  border-radius: 10px;
  width: 600px;
  height: 371px;
  box-shadow: 0px 0px 13px 0px #00000040;
}
h6 {
  margin-top: 10px;
  margin-bottom: 4px;
  font-weight: 600;
  color: #191919;
  font-size: 16px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* line-height: 1.4;
  color: #000;
  font-weight: 600;
  font-family: 'SF Pro Display', sans-serif; */
}

p {
  font-size: 14px;
  color: #00000099;
  margin-bottom: 10px;
}

#menu-home-container {
  width: 100%;
  height: 789px;
}
div .card-info {
  padding: 12px 0 0;
}

.shop_space {
  border-radius: 20px;
  margin-top: 40px;
}

.shop_space:hover {
  transition: all 0.2s ease-in-out;
  border: 3px #fffffe solid;
}
</style>
