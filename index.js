var firebaseConfig = {
  apiKey: "AIzaSyDsjlabpvWDosC026z8j5zZTbBBi5jY-n4",
  authDomain: "supreme-6d0b5.firebaseapp.com",
  databaseURL: "https://supreme-6d0b5-default-rtdb.firebaseio.com",
  projectId: "supreme-6d0b5",
  storageBucket: "supreme-6d0b5.appspot.com",
  messagingSenderId: "876061627168",
  appId: "1:876061627168:web:f8564f6409ff380359bd45",
  measurementId: "G-K84BZ0C1MV"
};

// Initialize Firebase
let firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// referências
//let ref = firebase.database().ref("Cliente");
var cliente = firebase.database().ref("Cliente");
var estoqueMateria = firebase.database().ref("Estoque").child("MateriaPrima");
var estoqueProdutos = firebase.database().ref("Estoque").child("produtos");
var pedido = firebase.database().ref("Pedido");
let express = require("express");
let handlebars = require("express-handlebars"); // usar templates html
let bodyParser = require("body-parser"); // pegar dados de forms em chamadas POST

let app = express(); // instancia servidor

// config geral
app.listen(8007, () => {
  console.log("ouvindo a porta 8007");
});

// config template engine
app.engine('handlebars', handlebars({default: 'main'}));
app.set('view engine', 'handlebars');

// config body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// rota raiz Novo Cliente
app.get('/', (req, res) => {
  res.render('form');
});

// rota novo pedido
app.get('/novoPedido', (req, res) => {
  res.render('novoPedido');
});

// rota clientes
app.get('/clientes', (req, res) => {
  res.render('clientes');
});

// rota pedidos
app.get('/pedidos', (req, res) => {
  res.render('pedidos');
});

//  Pasta CSS, Skins, Imagens
app.use("/bootstrap",express.static(__dirname+"/node_modules/bootstrap/dist"))

//CADASTRANDO UM NOVO CLIENTE
app.post('/cadastrarCliente', (req, res) => {
  let pf = req.body.pf;
  let pj = req.body.pj;
  let cpfCnpj = req.body.cpfCnpj;
  let emailCliente = req.body.emailCliente;
  let enderecoCliente = req.body.enderecoCliente;
  let nomeCliente = req.body.nomeCliente;
  let telefoneCliente = req.body.telefoneCliente;
  
  refCliente = cliente.push(); // cria surrogate key
  refCliente.set({
    clientePf: pf,
    clientePj: pj,
    cpfcnpj: cpfCnpj,
    email: emailCliente,
    endereco: enderecoCliente,
    nome: nomeCliente,
    telefone: telefoneCliente
  });

  res.render('formresposta', {clientePf: pf, clientePj: pj, cpfcnpj: cpfCnpj, email: emailCliente,
      endereco: enderecoCliente, nome: nomeCliente, telefone: telefoneCliente})
});

//CADASTRANDO UM NOVO PEDIDO
app.post('/cadastrarPedido', (req, res) => {
  let nomeCliente = req.body.nomeCliente;
  let dtEntrega = req.body.dtEntrega;
  let enderecoCliente = req.body.enderecoCliente;
  let formaPgt = req.body.formaPgt;
  
  let canudinho = req.body.canudinho;
  let qtdCanudinho = req.body.qtdCanudinho;
  let precoCanudinho = req.body.precoCanudinho;
  let totalCanudinho = req.body.totalCanudinho; 
  
  let pastelzinho = req.body.pastelzinho;
  let qtdPastelzinho = req.body.qtdPastelzinho;
  let precoPastelzinho = req.body.precoPastelzinho;
  let totalPastelzinho = req.body.totalPastelzinho; 

  let massaLasanha = req.body.massaLasanha;
  let qtdMassaDeLasanha = req.body.qtdMassaDeLasanha;
  let precoLasanha = req.body.precoLasanha;
  let totalMassaDeLasanha = req.body.totalMassaDeLasanha;  

  refPedido = pedido.push(); // cria surrogate key
  refPedido.set({
      clientenome: nomeCliente,
      dataEntrega: dtEntrega,
      endereco: enderecoCliente,
      formaPagamento: formaPgt,
      total: total, 
      produto:({
        produto: canudinho,
        qtd: qtdCanudinho,
        punit: precoCanudinho,
        totalItem: totalCanudinho 
        },
        
        {
        produto: pastelzinho,
        qtd: qtdPastelzinho,
        punit: precoPastelzinho,
        totalItem: totalPastelzinho 
        },

        {
        produto: massaLasanha,
        qtd: qtdMassaDeLasanha,
        punit: precoLasanha,
        totalItem: totalMassaDeLasanha 
      })
      
      //produtosPedido como cadastrar mais de um produto no pedido?
    });

    res.render('formresposta', {clientenome: nomeCliente, dataEntrega: dtEntrega, endereco: enderecoCliente, formaPagamento: formaPgt, 
      produto: canudinho, qtd: qtdCanudinho, punit: precoCanudinho, totalItem: totalCanudinho, produto: pastelzinho, qtd: qtdPastelzinho,
      punit: precoPastelzinho, totalItem: totalPastelzinho, produto: massaLasanha, qtd: qtdMassaDeLasanha, punit: precoLasanha,
      totalItem: totalMassaDeLasanha,  total: total})
  
});

//CADASTRANDO UM NOVO PRODUTO NO ESTOQUE
app.post('/cadastrarProduto', (req, res) => {
  let codProdutoEstoque = req.body.codProdutoEstoque;
  let nomeProdutoEstoque = req.body.nomeProdutoEstoque;
  let precoUnitarioAtual = req.body.precoUnitarioAtual;
  let qtdEstoque = req.body.qtdEstoque;
  let unidadeMedidaProduto = req.body.unidadeMedidaProduto;
  
  refPedido = estoqueProdutos.push(); // cria surrogate key
  refPedido.set({
      codProduto: codProdutoEstoque,
      nomeProduto: nomeProdutoEstoque,
      precoUnitario: precoUnitarioAtual,
      qtd: qtdEstoque,
      unidadeMedida: unidadeMedidaProduto 
    });

    res.render('formresposta', {codProduto: codProdutoEstoque, nomeProduto: nomeProdutoEstoque,
      precoUnitario: precoUnitarioAtual, qtd: qtdEstoque, unidadeMedida: unidadeMedidaProduto })
});

//CADASTRANDO UMA NOVA MATÉRIA PRIMA NO ESTOQUE
app.post('/cadastrarMercadoria', (req, res) => {
  let nomeMateriaMercadoria = req.body.nomeMateriaMercadoria;
  let qtdMercadoria = req.body.qtdMercadoria;
  let unidadeMedidaMercadoria = req.body.unidadeMedidaMercadoria;

  refPedido = estoqueMateria.push(); // cria surrogate key
  refPedido.set({
      nomeMateria: nomeMateriaMercadoria,
      qtd: qtdMercadoria,
      unidadeMedida: unidadeMedidaMercadoria,
    });
  res.render('formresposta', {nomeMateria: nomeMateriaMercadoria, qtd: qtdMercadoria,
      unidadeMedida: unidadeMedidaMercadoria,})  
});

//CONSULTANDO DADOS DE CLIENTE FILTRANDO PELO NOME
app.post('/consultarCliente', (req, res) => {
  let nomeCliente = req.body.nomeCliente;

  cliente.orderByChild('nome').equalTo(nomeCliente).once("value", function(snapshot) {
      console.log(snapshot.val());
      res.send(snapshot.val());
     
  });
});

//CONSULTANDO PEDIDOS REALIZADOS A PARTIR DO NOME DO CLIENTE
app.post('/consultarPedido', (req, res) => {
  let nomeCliente = req.body.nomeCliente;

  pedido.orderByChild('clienteNome').equalTo(nomeCliente).once("value", function(snapshot) {
      console.log(snapshot.val());
      res.send(snapshot.val());
      
  });
});

//CONSULTANDO TODAS AS ENTREGAS PARA O DIA CONSULTADO
app.post('/consultarEntrega', (req, res) => {
  let data = req.body.data;

  pedido.orderByChild('dataEntrega').equalTo(data).once("value", function(snapshot) {
      console.log(snapshot.val());
      res.send(snapshot.val());
      
  });
});

//CONSULTANDO TUDO O QUE HÁ NO ESTOQUE DE MATÉRIA PRIMA
app.post('/consultarEstoqueMateria', (req, res) => {    
  estoqueMateria.once("value", function(snapshot) {
  console.log(snapshot.val());
  res.send(snapshot.val());
      
  });
});

//CONSULTANDO TUDO O QUE HÁ NO ESTOQUE DE PRODUTOS
app.post('/consultarEstoqueProdutos', (req, res) => {
  estoqueProdutos.once("value", function(snapshot) {
  console.log(snapshot.val());
  res.send(snapshot.val());
      
  });
});