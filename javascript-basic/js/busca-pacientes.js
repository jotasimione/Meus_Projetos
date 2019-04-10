document.querySelector("#busca-pacientes").addEventListener("click",function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            erroAjax.classList.add("invisivel");

            var pacientes = JSON.parse(xhr.responseText);
            pacientes.forEach(function(paciente){
                adicionaPaciente(paciente);
            });
        } else {
            console.log(xhr.status +" - "+ xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send();
});