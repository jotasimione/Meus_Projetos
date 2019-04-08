document.querySelector(".titulo").textContent = "Aparecida Nutricionista";
var paciente = document.querySelector("#primeiro-paciente");
var peso     = paciente.querySelector(".info-peso");
var altura   = paciente.querySelector(".info-altura");
var imc      = paciente.querySelector(".info-imc")

if (!(peso.textContent > 0 && peso.textContent < 1000)){
    imc.textContent = "Peso Inválida!"
} else if(!(altura.textContent > 0 && altura.textContent < 1000)){
    imc.textContent = "Altura Inválida!"
} else {
    imc.textContent =  peso.textContent / ( altura.textContent * altura.textContent)
}
console.log(imc.textContent);