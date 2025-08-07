<template>
  <div>
    <theHeader />

    <div class="main-wrapper">
      <div class="checkout-container">
        <h1 class="main-title">Buy Points</h1>
        <h2 class="conversion-info">1 USD = 20 Points</h2>

        <div class="input-section">
          <label for="amount-input">Enter the amount in USD:</label>
          <input
            id="amount-input"
            type="number"
            min="1"
            v-model.number="dollarAmount"
            placeholder="Example: 10"
          />
          <p class="points-display">
            You will receive <strong> {{ calculatedPoints }} </strong> points
          </p>
        </div>

        <div class="payment-section">
          <h2>Pay with PayPal or Visa</h2>
          <div ref="paypalContainer" class="paypal-button-wrapper"></div>
        </div>
      </div>
    </div>

    <theFooter />
  </div>
</template>

<script>
import theHeader from "../components/theHeader.vue";
import theFooter from "../components/theFooter.vue";
import axios from "../services/axios";

export default {
  name: "BuyPoint",
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      userId: "",
      dollarAmount: 5,
    };
  },
  computed: {
    calculatedPoints() {
      return this.dollarAmount * 20;
    },
  },
  created() {
    this.userId = localStorage.getItem("userId") || "";
  },
  mounted() {
    if (window.paypal) {
      this.renderPayPalButton();
    } else {
      const interval = setInterval(() => {
        if (window.paypal) {
          clearInterval(interval);
          this.renderPayPalButton();
        }
      }, 100);
    }
  },
  methods: {
    renderPayPalButton() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.dollarAmount.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              axios
                .put(`/ebook/updateUserBalance/${this.userId}`, {
                  point: this.calculatedPoints,
                })
                .then((response) => {
                  console.log("Balance updated:", response.data.balance);
                  alert(
                    `Payment successful! ${details.payer.name.given_name}, you've purchased ${this.calculatedPoints} points.`
                  );
                  location.reload();
                })
                .catch((error) => {
                  console.error("Error updating balance:", error);
                });
            });
          },
        })
        .render(this.$refs.paypalContainer);
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  margin-top: 100px;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
}

.checkout-container {
  background: #ffffff;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

.conversion-info {
  font-size: 24px;
  text-align: center;
  margin-bottom: 32px;
  color: #333;
}

.input-section {
  margin-bottom: 36px;
}

.input-section label {
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
}

.input-section input {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.points-display {
  margin-top: 12px;
  font-size: 18px;
  color: #555;
}

.payment-section {
  text-align: center;
}

.payment-section h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

.paypal-button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
