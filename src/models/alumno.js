class Alumno {
    
  constructor(username, dni, edad) {
    this.username = username;
    this.dni = dni
    this.edad = edad;
  }
  toString(){
    console.log(" Nombre: " + this.username + " DNI: "+ this.dni + " Edad: "+ this.edad);
  }

}


const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido",   "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao",     "32623391", 18));

function buscarAlumno(dni) {
   return Alumno.find(item => item.dni === dni);
}

export default {Alumno, alumnosArray, buscarAlumno};

