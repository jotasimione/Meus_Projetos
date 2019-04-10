document.querySelector(".titulo").textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");
for(var i = 0; i < pacientes.length; i++){
    var paciente = pacientes[i];
    var peso     = paciente.querySelector(".info-peso");
    var altura   = paciente.querySelector(".info-altura");
    var imc      = paciente.querySelector(".info-imc")

    if(!validaPeso(peso.textContent)){
        imc.textContent = "Peso Inválida!";
        paciente.classList.add("paciente-invalido");
        console.log(paciente.querySelector(".info-nome").textContent + imc.textContent);
    } else if(!validaAltura(altura.textContent)){
        imc.textContent = "Altura Inválida!";
        paciente.classList.add("paciente-invalido");
        console.log(paciente.querySelector(".info-nome").textContent + imc.textContent);
    } else {
        imc.textContent = calculaImc(peso.textContent, altura.textContent);
    }
}

function calculaImc(peso,altura){
    return (peso / (altura * altura)).toFixed(2);
}