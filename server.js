const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/estaciones.json', (req,res)=>{

const estaciones = [
{
nombre:"Villar del Arzobispo - Iglesia",
lat:39.73,
lon:-0.82,
temp:12,
link:"https://www.wunderground.com/dashboard/pws/IVILLA1255"
},
{
nombre:"Benaguasil",
lat:39.59,
lon:-0.58,
temp:14,
link:"https://www.wunderground.com/dashboard/pws/IBENAG2"
}
];

res.json(estaciones);

});

app.listen(PORT,()=>{
console.log("Servidor funcionando");
});
