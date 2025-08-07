<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar</title>
  </head>

  <body>
    <div id="container" class="sidebar-container">
      <div id="this-sidebar">
        <router-link
          to="/collections/AllCollections"
          style="text-decoration: none !important"
        >
          <a
            class="dropdown-item"
            href=""
            style="color: black; margin-top: 10px"
            >Tất Cả</a
          >
        </router-link>
        <router-link
          to="/collections/MyCollection"
          style="text-decoration: none !important"
        >
          <a
            class="dropdown-item"
            href=""
            style="color: black; margin-top: 10px"
            >Cà Phê</a
          >
        </router-link>
        <router-link
          to="/collections/Tea"
          style="text-decoration: none !important"
        >
          <a
            class="dropdown-item"
            href=""
            style="color: black; margin-top: 10px"
            >Trà</a
          >
        </router-link>
        <router-link
          to="/collections/MilkTea"
          style="text-decoration: none !important"
        >
          <a
            class="dropdown-item"
            href=""
            style="color: black; margin-top: 10px"
            >Trà Sữa</a
          >
        </router-link>
        <router-link
          to="/collections/Frosty"
          style="text-decoration: none !important"
        >
          <a
            class="dropdown-item"
            href=""
            style="color: black; margin-top: 10px"
            >Đá Xay</a
          >
        </router-link>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  // name: "footerAdmin",
  data() {
    return {};
  },
  method: {},
};
</script>

<style>
body {
  /* display: inline-flex; */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.sidebar-container {
  /* position: fixed; */
  display: block;
  width: 250px;
  height: 3450px;
  /* border-right: 1px solid #00000026; */
  /* padding: 10px;  */
}
#this-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  /* background-color: #333;  */
  color: #fff;
  padding: 20px;
  margin-top: 73px;

  /* background-color: #444; */
  color: #fff;
  width: 250px;
  padding: 20px;
  border-right: 1px solid #00000026;
  padding-left: 100px;
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
</style>
