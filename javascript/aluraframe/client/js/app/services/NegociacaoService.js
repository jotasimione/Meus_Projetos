// Cada status é representado através de um inteiro. Os estados possíveis são:

// 0: requisição ainda não iniciada.
// 1: conexão com o servidor estabelecida.
// 2: requisição recebida.
// 3: processando requisição.
// 4: requisição concluída e a resposta esta pronta.

class NegociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoes(){
        return [
            this.obterNegociacoesDaSemana(),    
            this.obterNegociacoesDaSemanaAnterior(),    
            this.obterNegociacoesDaSemanaRetrasada()    
        ]
    }
    
    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject) => { 
            this._http
                .get("negociacoes/semana")
                .then(objetos => resolve(objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possível obter as negociações desta semana.");
                });
        });
    }

    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            this._http
                .get("negociacoes/anterior")
                .then(objetos => resolve(objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possível obter as negociações da semana passada.");
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            this._http
                .get("negociacoes/retrasada")
                .then(objetos => resolve(objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possível obter as negociações da semana retrasada.");
                });
        });
    }

    enviaNegociacaoParaServidor(negociacao){
        return new Promise((resolve, reject) => {
            this._http
                .post("/negociacoes", negociacao)
                .then(status => {
                    if(status == 200) {
                        resolve("Negociação enviada com sucesso");
                    }
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possível enviar a negociação.");
                });
        });
    }
}