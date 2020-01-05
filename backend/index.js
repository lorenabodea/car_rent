let express = require("express");
let app = express();
var faker = require('faker');
let path = require("path"); 
let firebase = require("firebase");
let cors = require ("cors"); 
let bodyPasrser = require("body-parser");
const PORT = 3000; 

app.use(bodyPasrser.json()); 
app.use(bodyPasrser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());

// set database info
let admin = require('firebase-admin'); 
let serviceAccount = require("./tic-project-b2ca4-firebase-adminsdk-5ah4d-ce6622ea8b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tic-project-b2ca4.firebaseio.com/"
});

let db = admin.database();
let clientsTable = db.ref("clients");
let carsTable = db.ref("cars");
let rentalsTable = db.ref("rentals");

let carsCounter = 0;
let total = carsCounter;

app.post('/addData/:number', function(req, res) {
    total = total + parseInt(req.params.number);
    for(carsCounter; carsCounter < total; carsCounter++) {
        let randBrand = faker.lorem.word();
        let randCP = faker.random.number();
        let randInsuranceAmount = faker.random.number();
        let randCostPerDay = faker.commerce.price();
        let randManufactureYear = faker.random.number({min:2000, max:2019});
        let randVin = faker.lorem.word() + "123";

        let car = carsTable.push({
            brand: randBrand,
            cp: randCP,
            insuranceAmount: randInsuranceAmount,
            manufactureYear: randManufactureYear,
            costPerDay: randCostPerDay,
            vin: randVin
        });

        let randfirstName = faker.name.firstName();
        let randLastName = faker.name.lastName();
        let randAge = 18 + Math.floor(Math.random() * 20);
        let randCity = faker.address.city();
        let randEmail = faker.internet.email(randfirstName, randLastName);
        let randPhone = faker.phone.phoneNumber();

        let client = clientsTable.push({
            firstName: randfirstName,
            lastName: randLastName,
            age: randAge,
            email: randEmail,
            city: randCity,
            phone: randPhone
        });

        let randNumberOfDays = 1 + Math.floor(Math.random()*total);
        let randomPrice = randNumberOfDays * randCostPerDay + randInsuranceAmount;
        let rental = rentalsTable.push({
            carKey : randBrand,
            clientKey: randEmail,
            numberOfDays: randNumberOfDays,
            price: randomPrice,
        })

    };
    res.send("fake data added");
})

//clients CRUD operations
app.get("/clients",  function(req, res){
	clientsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
});

app.post("/clients/add", function(req, res) {
	var data = req.body;
	clientsTable.push(data); 
	res.send("The client has been added.")
});

app.delete("/clients/:id", function(req, res) {
    var id = req.params.id; 
    var id = req.params.id; 
    clientsTable.child(id).remove();
    res.status(200).send("deleted");
});

app.put("/clients/:idClient", function(req, res) {
	var key = req.params.idClient; 
    var data = req.body;
	admin.database().ref('clients/' + key).set(data);
	res.send('The client with the id ' + key + ' has been updated.');
});

//cars CRUD operations
app.post("/cars/add", function(req, res) {
	var data = req.body;
    carsTable.push(data); 
    console.log(data);
	res.send("The car has been added." + data)
});

app.get("/cars",  function(req, res){
	carsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
});

app.delete("/cars/:id", function(req, res) {
     var id = req.params.id; 
    carsTable.child(id).remove();
    res.status(200).send("deleted");
});

app.put("/cars/:idCar", function(req, res) {
	var key = req.params.idCar; 
	var data = req.body;
	admin.database().ref('cars/' + key).set(data);
	res.send('The car with the id ' + key + ' has been updated.');
});

//rentals CRUD operations
app.post("/rentals/add", function(req, res) {
	var data = req.body;
	rentalsTable.push(data); 
	res.send("The rental has been added.")
});  

app.get("/rentals",  function(req, res){
	rentalsTable.once('value', (snapshot)=>{
		res.status(200).send(snapshot.val());
	})
	.catch(()=>{
		res.status(500).send();
	})
});

app.delete("/rentals/:idRental", function(req, res) {
	var key = req.params.idRental; 
	rentalsTable.child(key).remove(); 
	res.send('The rental with the id ' + key + ' has been deleted.');
});

app.put("/rentals/:idRental", function(req, res) {
	var key = req.params.idRental; 
	var data = req.body;	 

	admin.database().ref('rentals/' + key).set(data);
	res.send('The rental with the id ' + key + ' has been updated.');
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });

