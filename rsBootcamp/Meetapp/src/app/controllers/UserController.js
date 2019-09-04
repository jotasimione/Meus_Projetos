import User from '../models/User';

class UserController {
  async store(req, res) {
    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'E-mail already was used' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
