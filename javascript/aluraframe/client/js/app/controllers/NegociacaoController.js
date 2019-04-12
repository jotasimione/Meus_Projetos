class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData       = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor      = $("#valor");
    }

    adiciona(event){
        event.preventDefault();

        let negociacao = new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade,
            this._inputValor
        );

        console.log(DateHelper.dateToString(negociacao.data));
        
    }
}