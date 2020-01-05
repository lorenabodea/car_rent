import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import AddClient from '../components/AddClient'
import ViewClients from '../components/ViewClients'
import AddCar from '../components/AddCar'
import ViewCars from '../components/ViewCars'
import AddRental from '../components/AddRental'
import ViewRentals from '../components/ViewRentals'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/addClient',
        name: 'AddClient',
        component: AddClient,
    },
    {
        path: '/viewClients',
        name: 'ViewClients',
        component: ViewClients
    },
    {
        path: '/addCar',
        name: 'AddCar',
        component: AddCar
    },
    {
        path: '/viewCars',
        name: 'ViewCars',
        component: ViewCars
    },
    {
        path: '/addRental',
        name: 'AddRental',
        component: AddRental
    },
    {
        path: '/viewRentals',
        name: 'ViewRentals',
        component: ViewRentals
    }
]
});

export default router