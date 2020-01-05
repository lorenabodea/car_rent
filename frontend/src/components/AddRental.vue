<template>
  <div id="addRental">
    <h3>Add Rental</h3>
    <div class="row">
      <form @submit.prevent="add" class="col s12">
        <div style="margin-top: 30px" class="input-field col s12">
          <label class="active" for="numberOfDays">Number of days</label>
          <br />
          <input type="text" id="numberOfDays" v-model="numberOfDays" required />
        </div>
        <div style="display:flex; padding-left: 15px;">
          Pick a car:
          <div
            style="font-weight: bold; padding-left: 5px"
            v-bind="item"
          >{{item.brand}}&nbsp;{{item.vin}}</div>
        </div>
        <vue-suggestion
          :items="items"
          v-model="item"
          :setLabel="setLabel"
          :itemTemplate="itemTemplate"
          @changed="inputChange"
          @selected="itemSelected"
          style="padding: 15px 0px 15px 15px;"
        ></vue-suggestion>


         <div style="display:flex; padding-left: 15px;">
          Pick a client:
          <div
            style="font-weight: bold; padding-left: 5px"
            v-bind="client"
          >{{client.email}}&nbsp;{{client.lastname}}</div>
        </div>
        <vue-suggestion
          :items="clients"
          v-model="client"
          :setLabel="setLabelClient"
          :itemTemplate="itemTemplateClient"
          @changed="inputChangeClient"
          @selected="itemSelectedClient"
          style="padding: 15px 0px 15px 15px;"
        ></vue-suggestion>

        <button
          style="margin-left: 15px;"
          v-on:click="calculatePrice"
          type="button"
          class="btn btn-info"
        >Calculate price</button>
        <div style="padding: 15px 0px 15px 15px; font-weight: bold;" v-bind="price">{{price}}</div>
        <button style="margin-left: 15px;" class="btn btn-danger" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueSuggestion from "vue-suggestion";
import itemTemplate from "./ItemTemplate.vue";
import itemTemplateClient from "./ItemTemplateClient.vue";

Vue.use(VueSuggestion);
export default {
  data() {
    return {
      item: {},
      items: [],
      client: {},
      clients: [],
      itemTemplate,
      itemTemplateClient,
      price: "",
      insuranceAmount: ""
    };
  },
  created() {
    this.axios.get("http://localhost:3000/cars").then(response => {
      for (var number in response.data) {
        if (response.data.hasOwnProperty(number)) {
          this.items.push(response.data[number]);
        }
      }
    });

    this.axios.get("http://localhost:3000/clients").then(response => {
      for (var number in response.data) {
        if (response.data.hasOwnProperty(number)) {
          this.clients.push(response.data[number]);
        }
      }
    });
  },
  methods: {
    itemSelected(item) {
      this.item = item;
    },
    setLabel(item) {
      return item.name;
    },
    inputChange(text) {
      this.items = this.items.filter(item => item.brand.contains(text));
    },
      itemSelectedClient(item) {
      this.client = item;
    },
    setLabelClient(item) {
      return item.email;
    },
    inputChangeClient(text) {
      this.items = this.items.filter(item => item.email.contains(text));
    },
    calculatePrice: function() {
      this.price =
        parseInt(this.numberOfDays) * parseInt(this.item.costPerDay) +
        parseInt(this.item.insuranceAmount);
    },
    add: function() {
        this.axios.post('http://localhost:3000/rentals/add', {
            carKey: this.item.brand,
            clientKey: this.client.email,
            numberOfDays: this.numberOfDays,
            price: this.price
        })
    }
  }
};
</script>