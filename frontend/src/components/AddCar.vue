<template>
  <div id="addClient">
    <h3>Register Car</h3>
    <div class="row">
    <form @submit.prevent="add" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="brand">Car Brand</label><br>
          <input type="text" id="brand" v-model="brand" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="cp">HP</label><br>
          <input type="text" id="cp" v-model="cp" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="insuranceAmount">Insurance</label><br>
          <input type="text" id="insuranceAmount" v-model="insuranceAmount" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="costPerDay">Cost per day</label><br>
          <input type="text" id="costPerDay" v-model="costPerDay" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="manufactureYear">Manufacture year</label><br>
          <input type="text" id="manufactureYear" v-model="manufactureYear" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="vin">VIN</label><br>
          <input type="text" id="vin" v-model="vin" required>
        </div>
      </div>
      <button type="submit" class="btn red darken-4">Submit</button>
    </form>
  </div>
  </div>
</template>

<script> 
export default {
       props: ['items'],
        mounted() {
        },
        data() {
            return {
            brand: this.$route.params.object.brand,
            cp: this.$route.params.object.cp,
            insuranceAmount: this.$route.params.object.insuranceAmount,
            costPerDay: this.$route.params.object.costPerDay,
            manufactureYear: this.$route.params.object.manufactureYear,
            vin: this.$route.params.object.vin	
            };
        },
        methods: {
            add: function () {
            //  let currentObj;
              if(Object.keys(this.$route.params).length === 0 &&
    Object.getOwnPropertySymbols(this.$route.params).length === 0 &&
    this.$route.params.constructor === Object) {
      this.axios.post('http://localhost:3000/cars/add', {
            brand: this.brand,
            cp: this.cp,
            insuranceAmount: this.insuranceAmount,
            costPerDay: this.costPerDay,
            manufactureYear: this.manufactureYear,
            vin: this.vin	
                }).then( ()=> {
                    alert("The car has been added");
                })
                this.$router.replace({ name: "Home"});
              } else {
                this.axios.put('http://localhost:3000/cars/' + this.$route.params.id, {
                  brand: this.brand,
                  cp: this.cp,
                  insuranceAmount: this.insuranceAmount,
                  costPerDay: this.costPerDay,
                  manufactureYear: this.manufactureYear,
                  vin: this.vin		
                }).then(function(){ 
                }).catch(function(error){
                    alert(error);
                })
                this.$router.replace({ name: "ViewCars"});
              }
          
            }
        }
    }
</script>

