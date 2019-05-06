const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();
const rotasBase = BaseController.rotas();

module.exports = (app) => {
    app.get(rotasBase.home, baseController.home());  
    app.get(rotasBase.login, baseController.login());  
}