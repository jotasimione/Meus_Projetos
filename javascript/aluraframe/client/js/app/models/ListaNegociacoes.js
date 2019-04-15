class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacoes){
        this._negociacoes.push(negociacoes);
    }

    limpa(){
        this._negociacoes = [];
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

}