<template>
  <div class="background-container">
    <div class="login-wrap">
      <div class="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          class="sign-in"
          checked
        /><label for="tab-1" class="tab">Đăng Nhập</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up" /><label
          for="tab-2"
          class="tab"
          >Đăng Ký</label
        >
        <div class="login-form">
          <form class="sign-in-htm" method="post" @submit.prevent="login()">
            <div class="group">
              <label for="user1" class="label">Email</label>
              <input
                id="user1"
                type="email"
                class="input"
                v-model="user1.email"
              />
            </div>
            <div class="group">
              <label for="pass1" class="label">Mật Khẩu</label>
              <input
                id="pass1"
                type="password"
                class="input"
                v-model="user1.password"
              />
            </div>
            <div class="group">
              <input
                id="check"
                type="checkbox"
                @click="showPassword()"
                class="check"
              />
              <label for="check"
                ><span class="icon"></span> Hiện mật khẩu</label
              >
            </div>
            <div class="group">
              <button class="button">Đăng Nhập</button>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a>Quên Mật Khẩu?</a>
            </div>
          </form>

          <form class="sign-up-htm" @submit.prevent="register()">
            <div class="group">
              <label for="user2" class="label">Họ và Tên</label>
              <input
                required="true"
                minlength="8"
                maxlength="30"
                id="user2"
                type="text"
                class="input"
                v-model="user.name"
              />
            </div>
            <div class="group">
              <label for="user2" class="label">Email</label>
              <input
                required="true"
                minlength="8"
                id="user2"
                type="email"
                class="input"
                v-model="user.email"
              />
            </div>
            <div class="group">
              <label for="pass" class="label">Mật Khẩu</label>
              <input
                required="true"
                minlength="6"
                id="pass"
                type="password"
                class="input"
                data-type="password"
                v-model="user.password"
              />
            </div>
            <div class="group">
              <label for="pass2" class="label">Lập Lại Mật Khẩu</label>
              <input
                required="true"
                id="pass2"
                type="password"
                class="input"
                data-type="password"
              />
            </div>
            <div class="group">
              <button class="button" onclick="checkPasscfm()" value="Sign Up">
                Đăng Ký
              </button>
            </div>
            <div class="hr"></div>
            <div class="foot-lnk"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import axios from "../services/axios";
import { setRegion } from "../services/region";
export default {
  data() {
    return {
      user: {},
      user1: {},
    };
  },
  methods: {
    login() {
      let phone = document.getElementById("user1").value;
      let password1 = document.getElementById("pass1").value;
      if (phone === "0832525679" && password1 === "thinhlatoi2") {
        document.location.href = "./admin";
        // const userId = "0832525679";
        // localStorage.setItem('userId', userId);
      } else {
        axios
          .post(`/ebook/login`, this.user1) // /login
          .then((res) => {
            const userId = phone; // Replace with the actual user ID
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("token", res.data.token);
            setRegion(res.data.user.region);
            document.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
            alert("Login failed");
            // console.log(token);
          });
      }
    },

    async getUserIpAndCountry() {
      try {
        const res = await fetch("https://api.db-ip.com/v2/free/self");
        const data = await res.json();

        return {
          ip: data.ipAddress,
          country: data.countryName,
          countryCode: data.countryCode,
        };
      } catch (error) {
        console.error("Failed to get IP info:", error);
        return { ip: "unknown", country: "unknown", countryCode: "XX" };
      }
    },

    async register() {
      let password = document.getElementById("pass").value;
      let passwordcfm = document.getElementById("pass2").value;
      let pass2 = document.getElementById("pass2");
      // let message = document.getElementById("message");
      // let { ip, country, countryCode } = await getUserIpAndCountry();

      const res = await fetch("https://api.db-ip.com/v2/free/self");
      const data = await res.json();
      console.log(data.countryName);
      this.user.region = data.countryName;
      setRegion(data.countryName.toLowerCase());

      if (password != passwordcfm) {
        alert("incorrect password");
        Event.preventDefault();
      } else {
        // auth/signup
        axios
          .post(`/ebook/createUser`, this.user)
          .then((res) => {
            this.user = "";
            alert("Sign up successful");
          })
          .catch((err) => {
            alert("Số Điện Thoại Không Hợp Lệ");
          });
        pass2.value = "";
      }
    },
    showPassword() {
      var x = document.getElementById("pass1");
      console.log(x);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    checkPasscfm() {
      let password = document.getElementById("pass").value;
      let passwordcfm = document.getElementById("pass2").value;
      let message = document.getElementById("message");

      if (password != passwordcfm) {
        message.textContent = "Nhập lại mật khẩu không khớp";
        Event.preventDefault();
      }
    },
  },
};
</script>
<style>
body {
  margin: 0;
  color: #6a6f8c;
  background: #c8c8c8;
  font: 600 16px/18px "Open Sans", sans-serif;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.login-wrap {
  width: 100%;
  margin: auto;
  max-width: 35%;
  min-height: 85%;
  position: relative;

  background: url("../assets/bookstore/loginPanel.png") no-repeat center;
  background-size: contain; /* ✅ Ensures the full image fits */
  background-repeat: no-repeat; /* Already in your shorthand */
  background-position: center; /* Already in your shorthand */
}

.background-container {
  background-image: url("../assets/bookstore/Ebook Store.png"); /* Replace with the path to your image */
  background-size: cover; /* Adjust as needed */
  background-repeat: no-repeat; /* Adjust as needed */
  /* Additional background styles */
  width: 100%;
  height: 100vh; /* Set the height as needed */
}

.login-html {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 150px 90px 50px 70px;
  border-color: black;
  /* background: rgba(40, 57, 101, .9); */
}

.login-html .sign-in-htm,
.login-html .sign-up-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 0.4s linear;
}

.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
  display: none;
}

.login-html .tab,
.login-form .group .label,
.login-form .group .button {
  text-transform: uppercase;
  color: black;
}

.login-html .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}

.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab {
  color: blue;
  /* border-color: #1161ee; */
}

.login-form {
  min-height: 345px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.login-form .group {
  margin-bottom: 15px;
}

.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: black;
  display: block;
}

.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.5);
}

.login-form .group input[data-type="password"] {
  -webkit-text-security: circle;
}

.login-form .group .label {
  color: black;
  font-size: 12px;
}

.login-form .group .button {
  background: #2fa427;
}

.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}

.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
}

.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  transform: scale(0) rotate(0);
}

.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  transform: scale(0) rotate(0);
}

.login-form .group .check:checked + label {
  color: #fff;
}

.login-form .group .check:checked + label .icon {
  background: #1161ee;
}

.login-form .group .check:checked + label .icon:before {
  transform: scale(1) rotate(45deg);
}

.login-form .group .check:checked + label .icon:after {
  transform: scale(1) rotate(-45deg);
}

.login-html
  .sign-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .sign-in-htm {
  transform: rotate(0);
}

.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
  transform: rotate(0);
}

.hr {
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
}

.foot-lnk {
  text-align: center;
}
</style>
