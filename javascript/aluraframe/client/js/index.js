var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
];

var tbody = document.querySelector("table tbody");

document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    
    var tr = document.createElement("tr");
    campos.forEach(function(campo){
        var td = document.createElement("td");
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    var td = document.createElement("td");
    td.textContent = campos[1].value * campos[2].value;
    tr.appendChild(td);

    tbody.appendChild(tr);

    this.reset();
})