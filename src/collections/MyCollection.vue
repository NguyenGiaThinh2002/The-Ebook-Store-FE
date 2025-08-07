<template>
  <theHeader v-if="!selectedItem" />
  <div class="container menu-wrap">
    <div
      class="container collections"
      style="
        display: block;
        min-width: 500px;
        max-width: 500px;
        margin-left: 200px;
      "
    >
      <div class="product-title">
        <h3>My Collections</h3>
      </div>
      <div class="card-products">
        <div class="product-list" style="display: flex">
          <div
            v-for="(item, index) in products"
            :key="item.id"
            class="container collections"
          >
            <div class="card" @click="openIframe(item)">
              <img class="card-thumb" :src="item.imgUrl" />
              <div class="card-info">
                <h6 style="font-size: 1.3rem; font-weight: 600; color: blue">
                  {{ item.title }}
                </h6>
                <p style="color: black; font-size: 1.5rem">
                  $ {{ item.price }}
                </p>
              </div>
            </div>
          </div>

          <!-- Iframe Modal -->
          <div
            v-if="selectedItem"
            class="iframe-overlay"
            @click.self="closeIframe"
            @contextmenu.prevent
          >
            <div class="iframe-container">
              <iframe
                :src="selectedItem.file_url"
                width="100%"
                height="100%"
                frameborder="0"
                sandbox="allow-same-origin allow-scripts"
                scrolling="no"
                @contextmenu.prevent
              ></iframe>
              <button class="close-btn" @click="closeIframe">×</button>
            </div>
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
      products: [],
      selectedItem: null,
    };
  },
  created() {
    const userId = localStorage.getItem("userId");
    axios.get(`/ebook/getPurchasedBooks/${userId}`).then((res) => {
      this.products = res.data;
    });
  },
  methods: {
    openIframe(item) {
      this.selectedItem = {
        ...item,
        file_url: `${item.file_url}#toolbar=0&navpanes=0&scrollbar=0`,
      };
    },
    closeIframe() {
      this.selectedItem = null;
    },
  },
};
</script>

<style>
.iframe-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.iframe-container {
  position: relative;
  width: 80%;
  max-width: 800px;
  height: 80%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

iframe {
  pointer-events: none; /* Prevents direct interaction with iframe content */
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: red;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 50%;
}

.menu-wrap {
  max-width: 1440px;
  height: 4116px;
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
  padding-left: 72px;
}
div .card-products {
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
  margin: 0 15px 40px;
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
