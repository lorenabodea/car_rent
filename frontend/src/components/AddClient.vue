<template>
  <div id="addClient">
    <h3>Add Client</h3>
    <div class="row">
    <form @submit.prevent="add" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="firstName">First Name</label><br>
          <input type="text" id="firstName" v-model="firstName" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="lastName">Last Name</label><br>
          <input type="text" id="lastName" v-model="lastName" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="age">Age</label><br>
          <input type="text" id="age" v-model="age" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="email">Email</label><br>
          <input type="text" id="email" v-model="email" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="city">City</label><br>
          <input type="text" id="city" v-model="city" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label class="active" for="phone">Phone number</label><br>
          <input type="text" id="phone" v-model="phone" required>
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
            firstName: this.$route.params.object.firstName,
            lastName: this.$route.params.object.lastName,
            age: this.$route.params.object.age,
            email: this.$route.params.object.email,
            city: this.$route.params.object.city,
            phone: this.$route.params.object.phone	
            };
        },
        methods: {
            add: function () {
            //  let currentObj;
              if(Object.keys(this.$route.params).length === 0 &&
    Object.getOwnPropertySymbols(this.$route.params).length === 0 &&
    this.$route.params.constructor === Object) {
      this.axios.post('http://localhost:3000/clients/add', {
                     firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            email: this.email,
            city: this.city,
            phone: this.phone	
                })
                // .then(function (response) {
                //     currentObj.output = response.data;
                // })
                // .catch(function (error) {
                //     currentObj.output = error;
                // });
              } else {
                this.axios.put('http://localhost:3000/clients/' + this.$route.params.id, {
                  firstName: this.firstName,
                  lastName: this.lastName,
                  age: this.age,
                  email: this.email,
                  city: this.city,
                  phone: this.phone	
                }).then(function(){ 
                    alert("The client has been updated!");
                }).catch(function(error){
                    alert(error);
                })
              }
          
            }
        }
    }
</script>

