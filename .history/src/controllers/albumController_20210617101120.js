const eventosController = {};
const eventos = require('../models/eventos');

eventosController.index = async(req, res) => {
    const eventoses = await eventos.find({ user_id: req.userId });

    return res.json(eventoses);
}

eventosController.create = async(req, res) => {
    const { nombre, description } = req.body;

    const eventos = new eventos({
        nombre,
        description,
        user_id: req.userId
    });

    await eventos.save();

    return res.json({ message: 'successfully saved eventos', eventos });
}

eventosController.delete = async(req, res) => {
    const { id } = req.params;
    const eventos = await eventos.findByIdAndDelete(id);

    return res.json({ message: 'successfull', eventos })
}

eventosController.show = async(req, res) => {
    const { id } = req.params;
    const eventos = await eventos.findById(id);

    return res.json(eventos);
}

eventosController.update = async(req, res) => {
    const { id } = req.params;
    const eventos = await eventos.findByIdAndUpdate(id, req.body);

    res.json({ message: 'successfull', eventos });
}

module.exports = eventosController;