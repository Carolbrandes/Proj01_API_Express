// vai ser nosso servidor web que vai servir para criarmos nossos webservices
//porta é um processo dentro do pc. A porta seleciona qual processo que vai atender a requisição.
// ql requisicao feita no browser utiliza o http e a porta padrao é 8080

//1) definindo a porta que vai atender a requisição
const porta = 3003

//2) importando o express e o body parser
const express = require('express')
const bodyParser = require('body-parser')


// 6) importar o arquivo banco de dados:
const bd = require('./bancoDeDados')

//3) instanciando o express. Em cima dessa variavel app que vamos colocar nossos serviços.
const app = express()

// qlq requisicao q vc faca, vai obrigatoriamente passar por esse middleware, se o padrao for urlenconded ele vai transformar em objeto para que nas linhas 40 e 41 consegui acessar o atributo name e preco.
app.use(bodyParser.urlencoded({ extended: true }))





//4) fazendo requisição get e enviando uma resposta que contem  um objeto notebook com preco
// Ou seja qd recebermos uma requisicao get em cima de produtos, a resposta sera o objeto Notebook. 
// passamos por parametro um requisicao middleware que possui tres parametros (requisicao, resposta e next)
// alem do get, temos o use que atende qlq ulr. 
app.get('/produtos', (req, res, next) => {
        res.send(bd.getProdutos()) /* vai ser convertido para json*/
})

// os parametros vem na requisicao e para ter acesso a eles usamos o req.params e seguido .parametrodesejado, podemos ter mais de um parametro.
// mais de um parametro: app.get('/produtos/:id/:nome', ...)
app.get('/produtos/:id', (req, res, next) => {
        res.send(bd.getProduto(req.params.id))
})


app.post('/produtos', (req, res, next) => {
        const produto = bd.salvarProduto({
                nome: req.body.nome,
                preco: req.body.preco
        })

        res.send(produto)
})


app.put('/produtos/:id', (req, res, next) => {
        const produto = bd.salvarProduto({
                id: req.params.id,
                nome: req.body.nome,
                preco: req.body.preco
        })

        res.send(produto)
})


app.delete('/produtos/:id', (req, res, next) => {
        const produto = bd.excluirProduto(req.params.id)
        res.send(produto)
})

// 5) vamos informar ql a porta que vai ficar escutando as requisicoes
app.listen(porta, () => {
        console.log(`Servidor executando na porta ${porta}.`)
})