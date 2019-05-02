const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const livroDao = new LivroDao(db);

module.exports = (app) => {
    app.get('/',(req, resp) => {
        resp.marko(require('../views/base/home/home.marko'));
    });

    app.get('/livros',(req, resp) => {
        livroDao.lista()
                .then(livros => {
                    resp.marko(require('../views/livros/lista/lista.marko'),
                        {
                            livros: livros
                        }
                    )
                })
                .catch(erro => console.log(erro));
    });

    app.get('/livros/form',(req, resp) => {
        resp.marko(require('../views/livros/form/form.marko'),{ livro: {titulo:'', preco:''} });
    });

    app.get('/livros/form/:id', (req, resp) => {
        livroDao.buscaPorId(req.params.id)
                .then(livro => resp.marko(require('../views/livros/form/form.marko'),{ livro: livro }))
                .catch(erro => {
                    console.log(erro);
                    resp.marko(require('../views/livros/form/form.marko'),{ livro: {titulo:'', preco:''} });
                });
    })

    app.post('/livros', [
            check('titulo').isLength({ min: 5 }),
            check('preco').isCurrency()
        ],
        (req, resp) => {
            console.log(req.body);

            if (!validationResult(req).isEmpty()) {
                return resp.marko(require('../views/livros/form/form.marko'),{ livro: {titulo:'', preco:''} });
            }
            
            livroDao.adiciona(req.body)
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
    });

    app.put('/livros',(req, resp) => {
        console.log(req.body);
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        livroDao.remove(req.params.id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
    
    
}