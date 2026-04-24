import express from "express";  // npm i express
import cors    from "cors";     // npm i cors
import {sumar, restar, dividir, multiplicar} from "./modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js";
import { findAlumno, alumnosArray, newAlumno} from './models/alumno.js'


const app  = express();
const port = 3000;               // http://localhost:3000

// === Middlewares ===
app.use(cors());                 // Habilita CORS (permite llamadas cross-origin)
app.use(express.json());         // Parsea bodies en formato JSON

// === Endpoints ===
app.get('/', (req, res) => {
  res.status(200).send('¡Ya estoy respondiendo!');
});

app.get('/saludar', (req, res) => {
  res.send('Hello World!');
});

app.get('/saludar/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {

const {ano, mes, dia} = req.params;
const fechaStr = `${ano}-${mes}-${dia}`;
const timestamp = Date.parse(fechaStr);
if (isNaN(timestamp)) {
  return res.status(400).send('Fecha inválida');
}
return res.status(200).send('Fecha válida');
});

app.get('/matematica/sumar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  res.status(200).send(String(sumar(n1, n2)));
});
app.get('/matematica/restar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  res.status(200).send(String(restar(n1, n2)));
});

app.get('/matematica/dividir', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (n2 === 0) {
    return res.status(400).send('El divisor no puede ser cero');
  } 

  return res.status(200).send(String(dividir(n1, n2)));
});
app.get('/matematica/multiplicar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  res.status(200).send(String(multiplicar(n1, n2)));
});

app.get('/matematica/dividir', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  res.status(200).send(String(dividir(n1, n2)));
});

app.get('/omdb/searchbypage', async (req, res) => {
  const search = req.query.search;
  const p      = req.query.p;

  try {
    const resultado = await OMDBSearchByPage(search, p);
    res.status(200).send(resultado);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
  }
});

app.get('/omdb/searchcomplete', async (req, res) => {
  const search = req.query.search;

  try {
    const resultado = await OMDBSearchComplete(search);
    res.status(200).send(resultado);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
  }
});

app.get('/omdb/getbyomdbid', async (req, res) => {
  const imdbID = req.query.imdbID;

  try {
    const resultado = await OMDBGetByImdbID(imdbID);
    res.status(200).send(resultado);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
  }
});

app.get('/alumnos', (req, res) => {
     res.status(200).send(alumnosArray)
});

app.get('/alumnos/:dni', (req, res) => {
    const dniBuscado = req.params.dni
    const alumno = findAlumno(dniBuscado)
     res.status(200).send(alumno)
});

app.get('/alumnos', (req, res) => {
     res.status(200).send(alumnosArray)
});

app.get('/alumnos/:dni', (req, res) => {
    const dniBuscado = req.params.dni
    const alumno = findAlumno(dniBuscado)
     res.status(200).send(alumno)
});

app.post('/alumnos', (req, res) => {
  const { username, dni, edad } = req.body;

  if (!username || !dni || !edad) {
    return res.status(400).send('Faltan datos');
  }

  newAlumno(username, dni, edad);
  return res.status(201).send('Alumno creado');
});

app.delete('/alumnos', (req, res) => {
  const { dni } = req.body;

  const index = alumnosArray.findIndex(a => a.dni === dni);

  if (index < 0) {
    return res.status(404).send('Alumno no encontrado');
  }

  alumnosArray.splice(index, 1);
  return res.status(200).send('Alumno eliminado');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});