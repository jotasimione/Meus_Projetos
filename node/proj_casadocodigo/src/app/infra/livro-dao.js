class LivroDao {
    constructor(db){
        this._db = db;
    }

    lista(){
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros',(erro, resultados) => {
                if (erro) return reject("Não foi possível listar os Livros!");

                return  resolve(resultados);
            })
        });
    }

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM livros WHERE id = ?`,[id],(erro, livro) => {
                    if (erro) {
                        return reject(`Não foi possível buscar o Livro do ID: ${id}!`)
                    }
                    return resolve(livro);
                }
            )
        });     
    }

    edita(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
                [   
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (erro) => {
                    if (erro) {
                        return reject(`Não foi possível editar o Livro do ID: ${livro.id}!`)
                    }
                    resolve();
                }
            )
        });       
    }

    remove(id){
        return new Promise((resolve, reject) => {
            this._db.get(`DELETE FROM livros WHERE id = ?`,[id],
                (erro) => {
                    if (erro) {
                        return reject(`Não foi possível remover o Livro do ID: ${id}!`)
                    }
                    resolve();
                }
            )
        });         
    }

    cadastra(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (titulo, preco, descricao)
                VALUES (?,?,?)
                `,
                [
                   livro.titulo,
                   livro.preco,
                   livro.descricao
                ], 
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível cadastrar o Livro!')
                    }
                    resolve();
                }
            )
        });
    }
}

module.exports = LivroDao;