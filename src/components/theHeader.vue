<template>
  <!-- <head>
    <link rel="icon" href="../assets/banner_home/p1.png">
  </head> -->
  <!-- <div class="top-bar w-1200">
        <div class="container">
            <div class="row">
              <div class="header-meta-list">
                <div><a href="/">150 Cua hang khap ca nuoc</a></div>
              </div>
            </div>
        </div>
    </div> -->
  <!-- <link rel="icon" href="./src/assets/banner_home/logo.png"> -->

  <div class="header">
    <nav
      id="navbar"
      class="navbar fixed-top navbar-expand-lg navbar-light"
      style="display: flex; justify-content: space-evenly"
    >
      <div class="container" style="margin: 0">
        <a
          class="navbar-brand"
          href="#"
          style="padding-left: 10px; padding-top: 10px"
          ><h3>The eBooks Store</h3></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end align-center navbar-light"
          id="navbarNav"
        >
          <ul class="navbar-nav ml-auto">
            <router-link to="/" style="text-decoration: none !important">
              <li class="nav-item active">
                <a class="nav-link" href="" style="color: black">HomePage</a>
              </li>
            </router-link>

            <router-link
              to="/collections/MyCollection"
              style="text-decoration: none !important"
            >
              <li class="nav-item active">
                <a class="nav-link" href="" style="color: black"
                  >My collections</a
                >
              </li>
            </router-link>

            <!-- 
            <li
              class="nav-item dropdown"
              @mouseover="isMenuHovered = true"
              @mouseleave="isMenuHovered = false"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="color: black"
              >
                Sách của bạn
              </a>

              <ul
                class="dropdown-menu"
                :class="{ show: isMenuHovered }"
                style="background-color: rgba(255, 255, 255, 0.8)"
              >
                <router-link
                  to="/collections/AllCollections"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a class="dropdown-item" href="" style="color: black"
                      >Tất Cả</a
                    >
                  </li>
                </router-link>
                <router-link
                  to="/collections/MyCollection"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a class="dropdown-item" href="" style="color: black"
                      >Sách của bạn</a
                    >
                  </li>
                </router-link>
                <router-link
                  to="/collections/Tea"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a class="dropdown-item" href="" style="color: black"
                      >Trà</a
                    >
                  </li>
                </router-link>
                <router-link
                  to="/collections/MilkTea"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a class="dropdown-item" href="" style="color: black"
                      >Trà Sữa</a
                    >
                  </li>
                </router-link>
                <router-link
                  to="/collections/Frosty"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a class="dropdown-item" href="" style="color: black"
                      >Đá Xay</a
                    >
                  </li>
                </router-link>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#" style="color: black">Dịch Vụ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style="color: black">Cửa Hàng</a>
            </li>
-->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                v-if="this.userId"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="color: black"
              >
                Account Login
              </a>
              <a
                class="nav-link dropdown-toggle"
                href="#"
                v-if="!this.userId"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="color: black"
              >
                Account
              </a>
              <ul
                class="dropdown-menu"
                style="background-color: rgba(255, 255, 255, 0.8)"
              >
                <router-link
                  to="/login"
                  style="text-decoration: none !important"
                >
                  <li>
                    <a
                      class="dropdown-item"
                      v-if="!this.userId"
                      href="#"
                      style="color: black"
                      >Đăng Nhập</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      v-if="!this.userId"
                      href="#"
                      style="color: black"
                      >Đăng ký</a
                    >
                  </li>
                </router-link>
                <router-link to="/" style="text-decoration: none !important">
                  <li @click="loginpage()">
                    <a
                      class="dropdown-item"
                      v-if="this.userId"
                      style="color: black"
                      >Thoát</a
                    >
                  </li>
                </router-link>
              </ul>
            </li>
            <li></li>

            <li
              class="nav-item"
              v-if="region === 'japan' && this.isLogined === true"
            >
              <a class="nav-link" href="#" style="color: black"
                >User Point: {{ balance }}</a
              >
            </li>
          </ul>
        </div>
        <router-link
          to="/offerProduct/cart"
          style="text-decoration: none !important"
          v-if="region === 'japan' && this.isLogined === true"
        >
          <div class="cart-button" style="margin: 0 30px">
            <span class="cart-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
            <span class="cart-label">Buy Point</span>
            <!-- <span class="cart-items" @click="shoppingPage()">{{ cartQuantity }}</span> -->
          </div>
        </router-link>

        <div
          v-if="this.isLogined === false"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
        >
          <span
            v-if="region === 'japan'"
            @click="changeRegion('vietnam')"
            style="
              cursor: pointer;
              text-decoration: underline;
              color: inherit;
              font: bold;
              font-weight: bold;
              font-size: 1.3rem;
              margin-left: 10px;
            "
          >
            Vietnam
          </span>
          <span
            v-if="region === 'vietnam'"
            @click="changeRegion('japan')"
            style="
              cursor: pointer;
              text-decoration: underline;
              color: inherit;
              font-size: 1.3rem;
              margin-left: 10px;
              font-weight: bold;
            "
          >
            Japan
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { setRegion, getRegion } from "../services/region";

import axios from "../services/axios";
export default {
  props: ["cartQuantity"],
  name: "MyPage",
  data() {
    return {
      userId: "",
      user: {},
      isMenuHovered: false,
      balance: 0,
      region: "",
      isLogined: false,
    };
  },
  methods: {
    loginpage() {
      localStorage.removeItem("userId");
      // document.location.href = "/";
      this.userId = "";
      this.isLogined = false;
      location.reload();
    },
    changeRegion(region) {
      setRegion(region);
      location.reload(); // Reload to re-trigger all API calls with new region
    },
  },
  created() {
    // Fetch and set the token from localStorage
    this.userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (this.userId !== null && this.userId !== "") {
      this.isLogined = true;
    }
    this.region = getRegion();

    axios
      .get(`/ebook/getUserBalance/${this.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.balance = res.data.balance;
      });
  },
};
</script>

<style>
#header {
  background-color: rgba(255, 255, 255, 0.8);
}

#navbar {
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid #00000026;
}

.dropdown-menu {
  background-color: rgba(255, 255, 255, 0.8);
}

.nav-item .nav-link {
  color: rgba(0, 0, 0, 0.9);
}

.nav-item .dropdown {
  color: rgba(0, 0, 0, 0.9);
}

a .nav-link .dropdown-toggle {
  color: rgba(0, 0, 0, 0.9);
  background-color: rgba(255, 255, 255, 0.8);
}

#a {
  color: rgba(0, 0, 0, 0.9);
}

.container {
  width: 1440px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.cart-button {
  background-color: #ff5722;
  color: #fff;
  display: inline-block;
  padding: 7px 14px;
  border-radius: 50px;
  cursor: pointer;
}

.cart-button:hover {
  background-color: #e64a19; /* Slightly darker shade on hover */
}

.cart-icon {
  font-size: 24px;
  vertical-align: middle;
  margin-right: 10px;
}

.cart-label {
  font-weight: bold;
  font-size: 16px;
  vertical-align: middle;
  margin-right: 5px;
}

.cart-items {
  background-color: #e64a19;
  color: #fff;
  border-radius: 50%;
  padding: 5px 10px;
  font-weight: bold;
}

.nav-item {
  margin-left: 20px;
}
</style>
