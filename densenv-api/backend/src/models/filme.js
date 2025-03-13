const mongoose = require('mongoose')

const FilmeSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
        default: () => require('crypto').randomUUID()
    },
    title: {
        type: String,
        require: true,
        default: "Sem Título"
    },
    description: {
        type: String,
        required: true,
        default: "Descrição não disponível."
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,

    }
})

const Filme = mongoose.model('Filmes', FilmeSchema);

module.exports = Filme;
