const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const eventos = new Schema({
    nombre: { required: true, type: String },
    description: String,
    user_id: ObjectId,
});

module.exports = mongoose.model('eventos', eventos);