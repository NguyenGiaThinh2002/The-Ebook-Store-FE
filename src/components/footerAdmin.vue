<template>
  <head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>

  </head>

  <body>

    <div id="container">
      <div id="sidebar">
        <router-link
          to="/admin"
          style="text-decoration: none !important"
          active-class="active-link"
    exact-active-class="exact-active-link"
        >
          <div class="admin-sidebar">
            <a class="dropdown-item" href="" style="color: black; margin-top: 10px;">Thống Kê</a>
          </div>

        </router-link>
        <router-link
          to="/user"
          style="text-decoration: none !important"
          active-class="active-link"
    exact-active-class="exact-active-link"
        >
          <div class="admin-sidebar">
          <a class="dropdown-item" href="" style="color: black; margin-top: 10px;">Khách Hàng</a>
          </div>
        </router-link>
        <router-link
          to="/product"
          style="text-decoration: none !important"
          active-class="active-link"
    exact-active-class="exact-active-link"
        >
        <div class="admin-sidebar">
          <a class="dropdown-item" href="" style="color: black; margin-top: 10px;">Sản Phẩm</a>
        </div>
        </router-link>
        <router-link
          to="/offers"
          style="text-decoration: none !important"
          active-class="active-link"
    exact-active-class="exact-active-link"
        >
        <div class="admin-sidebar">
          <a class="dropdown-item" href="" style="color: black; margin-top: 10px;">Đơn Hàng Hiện Tại</a>
        </div>
        </router-link>

        <router-link
          to="/successfulOrders"
          style="text-decoration: none !important"
          active-class="active-link"
          exact-active-class="exact-active-link"
        >
        <div class="admin-sidebar">
          <a class="dropdown-item" href="" style="color: black; margin-top: 10px;">Đơn Hàng Thành Công</a>
        </div>
        </router-link>

      </div>
      
    </div>
  </body>
</template>
  
<script>
export default {
  // name: "footerAdmin",
  data() {
      return {
      };
    },
  method: {

  }
}
</script>
  
<style>
       body {
        /* display: inline-flex; */
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
    }

    #container {
        display: inline-flex;
        /* margin-top: -25px ;
        margin-left: -6px; */
    }
    #sidebar {
        color: #fff;
        width: 250px;
        padding: 20px;
    }
    #content {
        flex: 1;
        padding: 20px;
    }
    .menu-item {
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 10px 0;
        transition: background-color 0.3s ease;
    }
    .menu-item:hover {
        background-color: #555;
    }
    /* div .admin-sidebar{
      border-bottom: black solid 1px;
    } */
    .active-link {
      color: red; /* Set your desired color for active links */
    }

    .exact-active-link {
      color: yellow; /* Set your desired color for exact active links */
    }
</style>