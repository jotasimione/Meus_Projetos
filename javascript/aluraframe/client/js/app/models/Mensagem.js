class Mensagem {
    constructor(titulo="",texto="") {
        this._titulo = titulo;
        this._texto = texto;
    }

    montaMensagem(titulo,texto){
        this._titulo = titulo
        this._texto = texto;
    }

    get titulo(){
        return this._titulo;
    }

    get texto (){
        return this._texto;
    }

    set titulo(titulo){
        this._titulo = titulo;
    }

    set texto (texto){
        this._texto = texto;
    }
}