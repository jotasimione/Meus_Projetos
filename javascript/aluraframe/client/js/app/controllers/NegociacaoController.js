class NegociacaoController {
    constructor(){
        this._ordemAtual = '';

        let $ = document.querySelector.bind(document);
        this._inputData        = $("#data");
        this._inputQuantidade  = $("#quantidade");
        this._inputValor       = $("#valor");
        this._formNegociacao   = $(".form");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacoesView($("#negociacaoView")), "adiciona","limpa","ordena","inverteOrdem");

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($("#mensagemView")), "montaMensagem", "titulo", "texto");
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

    importaNegociacoes(event){
        event.preventDefault();

        let service = new NegociacaoService();
        Promise.all(service.obterNegociacoes())
            .then(negociacoes => { 
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));                
                this._mensagem.montaMensagem("Sucesso","As Negociações foram importadas com sucesso.");
            })
            .catch(erro => this._mensagem.montaMensagem("Erro", erro));
    }

    ordena(coluna){
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;       
        
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }


}