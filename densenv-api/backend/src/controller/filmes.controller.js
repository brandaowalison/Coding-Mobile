const Filme = require('../models/filme')

const CreateFilme = async (req, res) => {
    try {
        const PostFilme = new Filme({
            // id: req.body.id || undefined,
            title: req.body.title,
            description: req.body.description,
            releaseDate: req.body.releaseDate || new Date(),
            genre: req.body.genre,
            director: req.body.director,
            posterUrl: req.body.posterUrl,
        })


        await PostFilme.save()
        res.status(201).send("Filme adicionado com sucesso!")
    } catch (err) {
        console.error("Erro ao adicionar filme:", err)
        res.status(500).send("Erro ao adicionar filme.")
    }
}

const GetAllFilmes = async (req, res) => {
    try {
        const filmes = await Filme.find()
        res.status(200).json(filmes)
    } catch (err) {
        console.error("Erro ao buscar filmes:", err)
        res.status(500).send("Erro ao buscar filmes.")
    }
}

const GetIdFilmes = async (req, res) => {
    const id = req.body.id

    if (!id) {
        return res.status(400).json({ message: "ID não fornecido no corpo da requisição." });
    }
    try {
        const filmes = await Filme.findById(id)
        if (filmes) {
            res.status(200).json(filmes)
        } else {
            res.status(404).json({message: `Não foi encontrado nenhum filmes com esse id=${id}.`})
        } 
    } catch (err) {
        res.status(500).json({message: "Erro ao buscar o filme."})
    }
}

const GetNameFilmes = async (req, res) => {
    const name = req.body.name

    try {
        const filmes = await Filme.findOne({title: name})
        if (filmes) {
            res.status(200).json(filmes)
        } else {
            res.status(404).json({message: `Não foi encontrado nenhum filme com esse nome=${name}`})
        }
    } catch (err) {
        res.status(500).json({message: "Erro ao buscar o nome do filme."})
    }
}

const PutIdFilmes = async (req, res) => {
    const id = req.params.id;

    try {
        const filme = await Filme.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        if (!filme) {
            return res.status(404).json({ message: `Não foi encontrado nenhum filme com id=${id}` });
        }

        res.status(200).json({
            message: "Filme atualizado com sucesso!",
            filme
        });
    } catch (err) {
        console.error("Erro ao atualizar filme:", err);
        res.status(500).json({ message: "Erro ao atualizar o filme." });
    }
};

const DeleteAllFilmes = async (req, res) => {
    try {
        const resultado = await Filme.deleteMany()
        res.status(200).json({
            message: "Todos os Filmes foram deletados com sucesso!",
            deletedCount: resultado.deletedCount
        })
    } catch (err) {
        console.error("Erro ao deletar filmes:", err)
        res.status(500).json({message: "Erro ao deletar filmes."})
    }
}

const DeleteIdFilmes = async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await Filme.deleteOne({ _id: id })

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhum filme encontrado com id=${id}.` })
        }

        res.status(200).json({
            message: `O filme com id=${id} foi deletado com sucesso!`
        })
    } catch (err) {
        console.error("Erro ao deletar filme:", err)
        res.status(500).json({ message: "Erro ao deletar filme." })
    }
}


module.exports = {
    CreateFilme,
    GetAllFilmes,
    GetIdFilmes,
    GetNameFilmes,
    PutIdFilmes,
    DeleteAllFilmes,
    DeleteIdFilmes,
}