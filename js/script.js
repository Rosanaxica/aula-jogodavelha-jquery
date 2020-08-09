var rodada = 0;
var matriz_jogo = Array(3)

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);


matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function () {



    $('#game').hide();
    $('#btn_replay').hide();
   


    $('#btn_play').click(function () {
        if ($('#player1').val() == '') {
            alert("insira o nome do Jogador um");
            $('#player1').focus()
            return false;
        }
        if ($('#player2').val() == '') {
            alert("insira o nome do Jogador dois");
            $('#player2').focus();
            return false;
        }

        $('#vs').hide();
        $('#game').show();
        $('#btn_play').hide();
        $('#btn_replay').show();

        $('#player1').hide();
        $('#player2').hide();

        $('#player1Name').html($('#player1').val());
        $('#player2Name').html($('#player2').val());

        $(".jogada").click(function () {
            var id_campo_clicado = this.id;
            jogada(id_campo_clicado);

        })
        function jogada(id) {
            var icone = '';
            var ponto = 0;
            if ((rodada % 2) == 1) {
                icone = 'url("imagens/X.png")';
                ponto = -1;
            } else {
                icone = 'url("imagens/0.png")';
                ponto = 1;
            }
            rodada++;
            $('#' + id).css('background-image', icone);
            $('#' + id).css('background-repeat', 'no-repeat');
            $('#' + id).css('background-position', 'center');
            $('#' + id).off();

            //criar arrays globalmente
            //quebrar o id para pegar linha e coluna
            var linha_coluna = id.split('-'); //a-1
            matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
            console.log(matriz_jogo);
            //verificação se houve vencedor
            verifica_combinacao();
        }
        function verifica_combinacao() {
            //verifica na horizontal linha A
            var pontos = 0;
            for (var i = 1; i <= 3; i++) {
                pontos = pontos + matriz_jogo['a'][i];
            }
            ganhador(pontos);
            //verifica na horizontal linha B
            pontos = 0;
            for (var i = 1; i <= 3; i++) {
                pontos = pontos + matriz_jogo['b'][i];
            }
            ganhador(pontos);
            //verifica na horizontal linha C
            pontos = 0;
            for (var i = 1; i <= 3; i++) {
                pontos = pontos + matriz_jogo['c'][i];
            }
            ganhador(pontos);
            //verifica na vertical
            for (var l = 1; l <= 3; l++) {
                pontos = 0;
                pontos = pontos + matriz_jogo['a'][l];
                pontos = pontos + matriz_jogo['b'][l];
                pontos = pontos + matriz_jogo['c'][l];
                ganhador(pontos);
            }
            //verificar na diagonal
            pontos = 0;
            pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
            ganhador(pontos);
            pontos = 0;
            pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
            ganhador(pontos);
        }
        function ganhador(pontos) {
            if (pontos == -3) {
                
                $('.jogada').off();
                $('#resultado1').html("WINNER!!!");
                $('#card-player1').addClass("winner");
            } else if (pontos == 3) {
               
                $('.jogada').off();
                $('#resultado2').html("WINNER!!!");
                $('#card-player2').addClass("winner");
            }
            else if(rodada==9&&(pontos!==3||pontos!==-3)){
                $('#resultado3').html("TIE!!!");
                $('.jogada').off();


            }
        }


    })
    $('#btn_replay').click(function () {
        location.reload();
    });
})