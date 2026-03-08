import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // fetch para Node

const app = express();
app.use(cors());

const estaciones = [
  { nombre: "Villar del Arzobispo - Iglesia", lat: 39.73, lon: -0.82, station_id: "IVILLA1255" },
  { nombre: "Benaguasil", lat: 39.59, lon: -0.58, station_id: "IBENAG2" }
];

async function obtenerDatosWU(stationId) {
  const apiKey = "1f9bd01136fa4e5e9bd01136faee5ea5"; // pon tu API Key de WU
  const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.observations && json.observations.length > 0) {
      const obs = json.observations[0];
      return {
        station_id: stationId,
        temp: obs.metric.temp,
        hum: obs.humidity,
        wind_speed: obs.metric.windSpeed,
        wind_dir: obs.winddirCompass
      };
    }
    return null;
  } catch (err) {
    console.error("Error consultando WU:", err);
    return null;
  }
}

app.get("/estaciones.json", async (req, res) => {
  const resultados = [];

  for (const est of estaciones) {
    const datos = await obtenerDatosWU(est.station_id);
    if (datos) {
      resultados.push({
        nombre: est.nombre,
        lat: est.lat,
        lon: est.lon,
        temp: datos.temp,
        hum: datos.hum,
        wind_speed: datos.wind_speed,
        wind_dir: datos.wind_dir,
        link: `https://www.wunderground.com/dashboard/pws/${est.station_id}`
      });
    }
  }

  res.json(resultados);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor funcionando!");
});
