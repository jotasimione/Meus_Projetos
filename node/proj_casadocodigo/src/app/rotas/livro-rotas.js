const Livro = require('../models/livro')
const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController();
const rotasLivro = LivroController.rotas();
const BaseController = require('../controllers/base-controller')

module.exports = (app) => {
    app.use(rotasLivro.autenticadas, function(req, resp, next){
        if (req.isAuthenticated()){
            next()
        } else {
            resp.redirect(BaseController.rotas().login)
        }
    });

    app.get(rotasLivro.lista, livroController.lista());       
    app.get(rotasLivro.edicao, livroController.formEdicao());
    app.delete(rotasLivro.delecao, livroController.remove());

    app.route(rotasLivro.cadastro)
        .get(livroController.formCadastro())
        .post(Livro.validacoes(), livroController.cadastra())
        .put(livroController.edita());
}