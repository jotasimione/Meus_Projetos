const templates = require('../views/templates');

class BaseController {
    static rotas(){
        return {
            home: '/',
            login: '/login'
        }
    }
    
    home(){
        return (req, resp) => resp.marko(templates.base.home);
    }
    
    login(){
        return (req, resp) => resp.marko(templates.base.login);
    }
}

module.exports = BaseController;