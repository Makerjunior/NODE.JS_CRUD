//Pacotes a instalar 
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser = bodyParser.urlencoded({ extended: false }) // Trata o envio de dados do formulario


//Conexão com base de dados
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
})
sql.query('use nodejs')  // Base de dadados usada 


//Template egine [Trata do layout]
//app.engine("handlebars" ,handlebars({defaultLayout:'main'}))
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view egine', ' handlebars')


// Rotas static para arquivos CSS , Javascript, img etc
app.use('/css', express.static('css'))
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));



//Routes
/*
/:id? = parametro opcional

*/
//Rota Para index  
app.get('/', function (req, res) {
    // res.send("lavamos nos ")                // retorna uma string
    // res.sendFile(__dirname+"/index1.html")  // retorna a pagina html
    //console.log(req.params.id)               // id passado na url
    res.render('index.handlebars', { id: req.params.id })
})



//Rota para formulario de insert
app.get('/insert', function (req, res) { res.render('insert.handlebars') })




//Rota para select
app.get('/select/:id?', function (req, res) {
    // Se não for passado um id
    if (!req.params.id) {                              // função que retorna os valores da querry      
        sql.query("SELECT * FROM user order by id asc", function (err, results, fields) { // err = erros , results =  resultados, fields = campos da pesquisa
            res.render('select.handlebars', { data: results })
        } // Passa para a view o obj data com os valores da pesquisa 
        )
    } else { //Se for passado um id a pesquisa sera feita de acordo com o id passado
        sql.query("SELECT * FROM user WHERE id=? order by id asc", [req.params.id], function (err, results, fields) { // err = erros , results =  resultados, fields = campos da pesquisa
            res.render('select.handlebars', { data: results })
        } // Passa para a view o obj data com os valores da pesquisa 
        )

    }

})



//Rota controller insert [rota que recebe os dados do formulario]
app.post('/controllerForm', urlencodeParser, function (req, res) {
    console.log(req.body.id + "-" + req.body.nome + " - " + req.body.senha) // Imprimindo dados no console node.js

    // Query que insere os dados / req.body.campo_do_formulario
    sql.query("insert into user values (?,?,?)", [req.body.id, req.body.nome, req.body.senha])

    // Redireciona para a pagina controler.handlebars e envia o valor do campo nome 
    res.render('controllerForm.handlebars', { nome: req.body.nome })

})


//Rota para Delete
app.get("/delete/:id",function(req,res){

    sql.query("DELETE FROM user WHERE id=?",[req.params.id])
    res.render("delete.handlebars")
})

//Rota formulario  update
app.get('/update/:id',function(req,res){
    res.render('update.handlebars',{id:req.params.id})
})

//Rota para Update
app.post('/controllerUpdate',urlencodeParser,function(req,res){
    sql.query("UPDATE user SET nome=?, senha=? WHERE id=?",[req.body.nome, req.body.senha, req.body.id])
    //res.send('Dados atualizados com sucesso')
    res.render('controllerUpdate.handlebars')
})


//************************************************************************************************************************8 */
///Start server
app.listen(8000, function (req, res) {
    console.log("Lá vamos nos de novo")
});

