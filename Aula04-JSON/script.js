function lerJSON(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            var objJSON = JSON.parse( this.responseText );
            txt = "Modelo: " + objJSON.modelo;
            txt += "<br>Ano: " + objJSON.ano;
            txt += "<br>Câmbio Automático: ";
            if( objJSON.cambioAutomatico ) 
                txt += "Sim";
            else
                txt += "Não";

            txt += "<br>Combustíveis: ";
            objJSON.combustivel.forEach( comb => {
                txt += comb + " - ";
            });
            txt += "<br>Proprietário: " + objJSON.proprietario.nome ;
            txt += "<br>Opcionais: ";
            objJSON.opcionais.forEach( op => {
                txt += "<br>" + op.nome + " Marca: " + op.marca;
            });
            document.getElementById("divJSON").innerHTML = txt;

        }else if( this.readyState == 4 ){
            alert( this.status + " - " + this.statusText );
        }
    };


    req.open("GET", "dados.json", true);
    req.send()
}

function consultar(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            var objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta ){
                alert( objJSON.resposta );
            }else{
                txt =   '<table border="1" >';
                txt +=  '   <tr>';
                txt +=  '       <th>Id</th>';
                txt +=  '       <th>Nome</th>';
                txt +=  '       <th>Preço</th>';
                txt +=  '   </tr>';
                objJSON.produtos.forEach( prod => {
                    txt += '<tr>';
                    txt += '    <td>' + prod.id + '</td>';
                    txt += '    <td>' + prod.nome + '</td>';
                    txt += '    <td>' + prod.preco + '</td>';
                    txt += '</tr>';
                });
                txt += '</table>';
                document.getElementById("divProdutos").innerHTML = txt;
            }
        }else if( this.readyState == 4 ){
            alert( this.status + " - " + this.statusText );
        }
    };
    req.open("GET", "servidor.php?consultar", true);
    req.send()
}