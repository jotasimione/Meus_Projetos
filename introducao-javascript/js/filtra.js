document.querySelector("#filtro").addEventListener("input", function(event){
    var pacientesNomes = document.querySelectorAll(".paciente .info-nome");

    if(this.value.length > 0){
        var expressao = new RegExp(this.value,"i")
       
        pacientesNomes.forEach(function(pacienteNome){   
            if(!expressao.test(pacienteNome.textContent)){
                pacienteNome.parentNode.classList.add("invisivel");   
            } else {
                pacienteNome.parentNode.classList.remove("invisivel");
            }
        });
    } else {
        pacientesNomes.forEach(function(pacienteNome){
            pacienteNome.parentNode.classList.remove("invisivel");
        })
    }
});

