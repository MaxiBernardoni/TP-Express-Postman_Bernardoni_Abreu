const PI = 3.14;


function sumar(x, y) {

  return x+y

}

function restar(x, y) {
    return x - y
}


const multiplicar = (a, b) => { 

  return a*b 

};

function dividir(x,y){

    if(y === 0){
        return "El divisor no puede ser cero"
    }
    else{
        return x/y
    }

}



export {PI, sumar, multiplicar, dividir, restar};