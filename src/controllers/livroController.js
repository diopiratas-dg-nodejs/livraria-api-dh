const db = require('../database/models');
const Livro = db.Livro;

const livroController = {
    list: (req, res) => {
        Livro.findAll()
            .then(livros => {
                res.status(200).json(livros)
            })
            .catch(err => {
                res.status(500).json(err); // 500 = Internal Error
            })
    },
    findById: (req, res) => {
        Livro.findByPk(req.params.id)
        .then(livros => {
            if (!livros){
                res.status(404).json(livros) // 404 = Not Found    
            }else{
                res.status(200).json(livros)
            }
            
        })
        .catch(err => {
            res.status(404).json(err)
        })
    },
    create: async (req, res) => {
        const livro = req.body
        try {
          await Livro.create(livro)
          res.status(201).json({ msg: 'Livro criado com sucesso!' })
        } catch (err) {
          res.status(400).json({ error: [...err] }) // 400 = Bad Request
        }
    }, 

    update: async (req, res) => {
      const id = req.params.id
      const livro = req.body
      try {
        await Livro.update(livro, { where: { id } })
        res.status(201).json({ msg: 'Livro alterado com sucesso!' })
      } catch (err) {
        res.status(304).json({ error: [...err] }) // 304 = Not Modified
      }
    },
    
    partialUpdate: async (req, res) => {
        const id = req.params.id
        const livro = req.body
        try {
            let livroRecuperado = Livro.findByPk(id);

            if (!livroRecuperado){
                res.status(404).json({ msg: 'Não encontrado' }) // 404 = Not Found    
            }else{
                if (livro.titulo && livro.titulo != livroRecuperado.titulo){
                    livroRecuperado.titulo = livro.titulo;
                }
                
                if (livro.quantidadePaginas && livro.quantidadePaginas != livroRecuperado.quantidadePaginas){
                    livroRecuperado.quantidadePaginas = livro.quantidadePaginas;
                }
                if (livro.autor && livro.autor != livroRecuperado.autor){
                    livroRecuperado.autor = livro.autor;
                }
                
                if (livro.anoLancamento && livro.anoLancamento != livroRecuperado.anoLancamento){
                    livroRecuperado.anoLancamento = livro.anoLancamento;
                }
                
                if (livro.estoque != livroRecuperado.estoque){                        
                    livroRecuperado.estoque = livro.estoque;
                } 
            }          
            await Livro.update(livroRecuperado, { where: { id } })
            res.status(201).json({ msg: 'Livro alterado com sucesso!' })
          
        } catch (err) {
          res.status(304).json({ error: [...err] }) // 304 = Not Modified
        }
    },

    delete: async (req, res) => {
      const id = req.params.id
      try {
        await Livro.destroy({ where: { id } })
        res.status(200).json({ msg: 'Livro excluído com sucesso!' })
      } catch (err) {
        res.status(400).json({ error: [...err] })
      }
    }
}

module.exports = livroController;