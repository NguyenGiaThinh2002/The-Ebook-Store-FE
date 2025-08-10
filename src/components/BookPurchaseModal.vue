<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="main-wrapper">
        <div class="checkout-container">
          <h1 class="main-title">You want to buy {{ purchaseInfo.title }}</h1>
          <h2>Price: $ {{ purchaseInfo.price }}</h2>
          <div class="payment-section">
            <h2>Pay with PayPal or Visa</h2>
            <div ref="paypalContainer" class="paypal-button-wrapper"></div>
          </div>
        </div>
        <button
          class="close-button"
          @click="close"
          style="display: flex; justify-self: end"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios";

export default {
  name: "BookPurchaseModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    purchaseInfo: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ["close"],

  data() {
    return {
      userId: "",
      dollarAmount: 5,
    };
  },
  mounted() {
    const oldScript = document.querySelector(
      `script[src*="paypal.com/sdk/js"]`
    );
    if (oldScript) oldScript.remove();

    // Load PayPal SDK with JPY
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AYBCfZjWyVpK3rBsBOZ9XHSEb7AAyPvrmYaT7J-JzFD8SwX-QDzyY8qRv9PrxJSi42dJ-clcL884z7ai&currency=USD`;
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: "500" } }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Paid by ${details.payer.name.given_name}`);
            });
          },
        })
        .render("#paypal-button-container");
    };
    document.body.appendChild(script);
  },
  computed: {
    calculatedPoints() {
      return this.dollarAmount * 20;
    },
  },
  created() {
    this.userId = localStorage.getItem("userId") || "";
    if (this.purchaseInfo && this.purchaseInfo.amount) {
      this.dollarAmount = this.purchaseInfo.amount;
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (
            window.paypal &&
            this.$refs.paypalContainer.children.length === 0
          ) {
            this.renderPayPalButton();
          }
        });
      }
    },
  },
  methods: {
    renderPayPalButton() {
      const token = localStorage.getItem("token");
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.purchaseInfo.price,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              axios
                .post(
                  "/ebook/makePurchase",
                  {
                    user_id: Number(this.userId),
                    ebook_id: this.purchaseInfo.id,
                    paid_with_point: false,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then(() => {
                  alert("Buy book successfully");
                  close();
                  // location.reload();
                });
            });
          },
        })
        .render(this.$refs.paypalContainer);
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<!--
-->

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.input-section {
  margin-bottom: 1.5rem;
}

.input-section label {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.input-section input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border 0.3s;
}

.input-section input:focus {
  border-color: #0070ba;
  outline: none;
}

.payment-section {
  margin-top: 2rem;
  text-align: center;
}

.payment-section h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.paypal-button-wrapper {
  margin-top: 1rem;
}

.price-display {
  margin-top: 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
}

.close-button {
  margin-top: 2rem;
  background: #0070ba;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;

  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #005c99;
}
</style>
