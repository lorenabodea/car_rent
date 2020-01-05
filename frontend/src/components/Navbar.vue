<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Car rental</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-if="loggedIn"><router-link  to="/"><span class=" white-text">Home</span></router-link></b-nav-item>
         <b-nav-item li v-if="!user.loggedIn"><router-link to="/login">Login</router-link></b-nav-item>
         <b-nav-item v-if="!user.loggedIn"><router-link to="/register">Register</router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><router-link  to="/addClient"><span class=" white-text">Register client</span></router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><router-link  to="/viewClients"><span class=" white-text">View cars</span></router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><router-link  to="/addCar"><span class=" white-text">Register car</span></router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><router-link  to="/ViewCars"><span class=" white-text">View cars</span></router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><router-link  to="/AddRental"><span class=" white-text">Add Rental</span></router-link></b-nav-item>
         <b-nav-item v-if="user.loggedIn"  href="#" ><router-link  to="/ViewRentals"><span class=" white-text">ViewRentals</span></router-link></b-nav-item>
        <b-nav-item v-if="user.loggedIn" href="#" ><button v-on:click="logout" class="btn black">Logout</button></b-nav-item>

      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  </template>
  <style >
  span {
    color : white;
  }
  </style>
<script>
import firebase from 'firebase';
import { mapGetters } from "vuex";

export default {
  name: 'navbar',
   computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  data() {
    return {
      LoggedIn: false,
      currentUser: false
    };
  },
  created() {
     // verificam daca suntem autentificati pentru a putea permite anumite operatii
    if (firebase.auth().currentUser) {
      this.LoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
     // metoda de logout ce deconecteaza utilizatorul si face redirect catre pagina principala
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ path: '/login' });
        });
    }
  }
};
</script>
<style scoped>
.email {
  padding-right: 10px;
}
</style>