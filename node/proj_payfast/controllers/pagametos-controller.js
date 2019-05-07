module.exports = (app) => {
    app.get('/pagamentos', (req, res) => {
        res.send('deu certo!');
    });

    app.post('/pagamentos/pagamento', (req, res) => {
        console.log(req.body);
        res.send('Post executado!');
    });
}