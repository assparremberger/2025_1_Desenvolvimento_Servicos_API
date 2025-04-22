const http = require("http")
const mysql = require("mysql")

const hostname = "127.0.0.1"
const port = 3000

const conn = mysql.createConnection( {
    host : hostname ,
    user : "root" ,
    password : "" ,
    database : "market"
} )

const server = http.createServer( (req, res) => {
    res.statusCode = 200
    res.setHeader( "Content-type" , "application/json" )

    try{
        if( conn.state != "authenticated" ){
            conn.connect( function( erro ){
                if( erro ){
                    res.end( JSON.stringify( 
                        { 
                            resposta : "Erro na conexao" ,
                            erro : erro
                        } 
                        ) 
                    )
                }else{
                    consultar( res )
                }
            } )
        }else{
            consultar( res )
        }
    }catch( error ){
        res.end( '{ "resposta" : "Erro no servidor" }')
    }
} )

function consultar( res ){
    var sql = "SELECT * FROM produto ORDER BY nome"
    conn.query( sql , ( err, result, fields ) => {
        if( err ){
            res.end( JSON.stringify(
                { 
                    resposta : "Erro na consulta" ,
                    erro : err
                }
            ) )
        }else{
            res.end( JSON.stringify( result ) )
        }
    } )
}


server.listen( port, hostname, ()=>{
    console.log( `Servidor rodando em: http://${hostname}:${port}` )
})