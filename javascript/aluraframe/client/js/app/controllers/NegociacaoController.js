class NegociacaoController {
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData        = $("#data");
        this._inputQuantidade  = $("#quantidade");
        this._inputValor       = $("#valor");
        this._formNegociacao   = $(".form");
        
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{
            get(target, prop, receiver){
                if(["adiciona","limpa"].includes(prop) && typeof(target[prop]) == typeof(Function)){

                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacaoView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });




        this._negociacaoView   = new NegociacoesView($("#negociacaoView"));
        this._negociacaoView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
    }

    adiciona(event){
        event.preventDefault();
       
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._formNegociacao.reset();     

        this._mensagem.montaMensagem("Sucesso!","A negociação foi adicionada com sucesso.");
        this._mensagemView.update(this._mensagem);
    }

    limpa(event){
        event.preventDefault();
        
        this._listaNegociacoes.limpa();
        this._formNegociacao.reset();     

        this._mensagem.montaMensagem("Sucesso!","As negociações foram apagadas.");
        this._mensagemView.update(this._mensagem); 
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }


}