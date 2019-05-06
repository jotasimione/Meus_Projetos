const templates = require('../views/templates');
const { validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const livroDao = new LivroDao(db);

class LivroController {

    static rotas(){
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    formCadastro(){
        return (req, resp) => resp.marko(templates.livros.form,{ livro: {titulo:'', preco:''} });
    }

    formEdicao(){
        return (req, resp) => {
            livroDao.buscaPorId(req.params.id)
                    .then(livro => resp.marko(templates.livros.form,{ livro: livro }))
                    .catch(erro => {
                        console.log(erro);
                        resp.marko(templates.livros.form,{ livro: {titulo:'', preco:''} });
                    });
        }
    }
    
    lista(){
        return (req, resp) => {
            livroDao.lista()
                    .then(livros => {
                        resp.marko(templates.livros.lista,
                            {
                                livros: livros
                            }
                        )
                    })
                    .catch(erro => console.log(erro));
        }        
    }

    cadastra(){
        return (req, resp) => {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.marko(templates.livros.form,
                { 
                    livro: req.body,
                    errosValidacao: errors.array() 
                });
            }
            
            livroDao.cadastra(req.body)
                    .then(resp.redirect(LivroController.rotas().cadastro))
                    .catch(erro => console.log(erro));
        }
    }

    edita(){
        return (req, resp) => {
            console.log(req.body);
            livroDao.edita(req.body)
                    .then(resp.redirect(LivroController.rotas().cadastro))
                    .catch(erro => console.log(erro));
        }
    }

    remove(){
        return (req, resp) => {
            livroDao.remove(req.params.id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroController;