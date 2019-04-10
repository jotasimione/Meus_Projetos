document.querySelector("#adicionar-paciente").addEventListener("click", function(event){
    event.preventDefault();
    
    var form     = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);
    
    document.querySelector("#mensagens-erros").innerHTML = "";
    var erros = validaPaciente(paciente);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }
    
    adicionaPaciente(paciente);    
    form.reset();
});

function adicionaPaciente(paciente){
    document.querySelector("#tabela-pacientes").appendChild(montaTr(paciente));
}

function obtemPacienteDoFormulario(form){
    return {
        nome:    form.nome.value,
        peso:    form.peso.value,
        altura:  form.altura.value,
        gordura: form.gordura.value,
        imc:     calculaImc(form.peso.value, form.altura.value)
    }
}

function montaTr(paciente){
    var tr = document.createElement("tr");

    tr.classList.add("paciente");
    tr.appendChild(montaTd(paciente.nome,"info-nome"));
    tr.appendChild(montaTd(paciente.peso,"info-peso"));
    tr.appendChild(montaTd(paciente.altura,"info-altura"));
    tr.appendChild(montaTd(paciente.gordura,"info-gordura"));
    tr.appendChild(montaTd(paciente.imc,"info-imc"));

    return tr;
}

function montaTd(value, className){
    var td = document.createElement("td");

    td.classList.add(className);
    td.textContent = value;

    return td;
}


