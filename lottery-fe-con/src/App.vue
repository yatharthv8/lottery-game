<template>
  <section>
    <h1>Lottery Contract</h1>
    <p>
      This contract is managed by <span>{{ managerC }}</span
      >. Total number of players currently participating is
      <span>{{ playersC }}</span
      >. Total amount of ether stored in the contract is :
      <span>{{ balance }}</span
      >.
    </p>
    <hr />
    <form @submit.prevent="submitData">
      <h4>Wanna try your luck ??</h4>
      <div>
        <label>Amount of ether to enter</label>
        <input type="text" v-model="lotteryAmt" />
        <button @click="amountEntered">Enter</button>
      </div>
    </form>
    <h1 class="alertMessage">{{ message }}</h1>
    <div v-if="balance > 0">
      <h4>Wanna pick a winner?</h4>
      <button @click="pickTheWinner">Pick Winner</button>
    </div>
  </section>
</template>

<script>
import lottery from "./lottery.js";
import web3 from "./web3";
export default {
  name: "App",
  components: {},
  data() {
    return {
      managerC: "",
      playersC: "",
      balance: 0,
      lotteryAmt: 0,
      lotteryAmount: 0,
      message: "Start transaction",
    };
  },
  methods: {
    async submitData() {
      const accounts = await web3.eth.getAccounts();

      this.message = "Waiting for transaction success...";

      await lottery.methods.enterIntoLottery().send({
        from: accounts[0],
        value: web3.utils.toWei(this.lotteryAmount, "ether"),
      });

      this.message =
        "Transaction successful !! You have been entered in the lottery";

      this.updateProperties();

      setTimeout(() => (this.message = "Start a new transaction"), 6000);
    },

    async pickTheWinner() {
      const accounts = await web3.eth.getAccounts();

      this.message = "Picking a winner....ちょっと待ってください";

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      this.updateProperties();

      this.message = "A winner has been picked!";
      setTimeout(() => (this.message = "Start a new transaction"), 6000);
    },

    amountEntered() {
      this.lotteryAmount = this.lotteryAmt;

      console.log("Amount entered ->", this.lotteryAmount, this.lotteryAmt);
    },

    async updateProperties() {
      this.managerC = await lottery.methods.manager().call();
      this.playersC = await lottery.methods.getPlayers().call();
      this.balance = await web3.eth.getBalance(lottery.options.address);

      this.balance = web3.utils.fromWei(this.balance, "ether");
      this.playersC = this.playersC.length;
    },
  },
  created() {
    this.updateProperties();

    console.log("This is the managerC ->", this.managerC);
    console.log("This is the number of players ->", this.playersC);
    console.log("This is the balance ->", this.balance);
  },
};
</script>
