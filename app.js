
let numerosSorteados = []; // guarde um array (uma lista) dentro de uma variável a fim de memorizar os números secretos já sorteados.
let limiteMaximo = 10; // é o limite da lista, terá 10 índices 
let numeroSecreto = gerarNumeroAleatorio(); // função que gera o número secreto e o retorna, por isso dentro de uma variável
let tentativas = 1; // quantidade de tentativas, começa com 1, pois o acerto já está sendo contado, ou seja, só incrementa mais unidade caso o usuário erre o número

function exibirTextoNaTela(tag, texto) { // função com parâmetro(os quais podem ser substituidos), resposável por pegar uma tag ou estrutura do html e inserir um texto nela.
    let campo = document.querySelector(tag); // para pegar a tag;
    campo.innerHTML = texto; // para inserir o texto;
 if ('speechSynthesis' in window) { // habilitação do modo voz 
        let utterance = new SpeechSynthesisUtterance(texto); // o que será lido
        utterance.lang = 'pt-BR';  //idioma
        utterance.rate = 1.2; // velocidade da voz
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador."); // caso o modo voz não funcione
    }
}


    exibirTextoNaTela('h1', 'Jogo do número secreto!'); // chamei a função e ela executou a sua ação, porém com esse parâmetros
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');


function verificarChute() { // funcao que analisa o número já sorteado com o chute do usuário, é invocada quando o botão 'chutar' é pressionado
    let chute = document.querySelector('input').value; // peguei o valor do input, esse que é o campo vazio que é inserido o chute do usuário
    
    if (chute == numeroSecreto) { // estrutura de decisão baseada em condição. Se for true ira realizar a ação entre essas chaves
        exibirTextoNaTela('h1', 'Acertou!'); // chama a funçao e a executa (pegar a tag do html e inserir um texto) com novos parâmetros ou dados
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // operador ternário, em outras palavras: um if else (estrutura de decisão baseada em condição) dentro de uma variável
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // varíavel que comporta um templateString (texto mais valor de variável, escrito entre crase e o nome da variável entre sifrão e chaves).
        exibirTextoNaTela('p', mensagemTentativas); // chama a funcao, entao ele é executada, com os novos parâmentros  e com a variável que carrega o templateString, pois o html não espera um desses, então é mais seguro colocar em uma varável deppis chamá-la.
        document.getElementById('reiniciar').removeAttribute('disabled'); //ele é igual ao document.querySelector, porém quando se tem mais de uma mesma estrura no html, geralmente coloca-se um id (um identificador, semelhanta a um rg e cpf), por isso usamos para pegar a tag o: getElementByd(id do elemnento)
    } else { // se o chute não for igual ao numero secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; // incrementacao: soma-se mais uma unidade nela mesmo, assim que erra o número secreto
        limparCampo();// limpa o input, funcao que quando invocada deixa o campo do input vazio
    }
}

function gerarNumeroAleatorio() { // funcao que gera número secreto, desde o começo do código e quando o botão 'jogar novamente' é pressionado ou acionado
    let numeroEscolhido = parseInt(Math.random() * limiteMaximo + 1); // gera um número de acordo com o horário (um valor que está entre 0.0 e 0.99), mas que quando multiplicado por 10 e somado por 1 está entre 0 e 10;
    let quantidadeDeElementosNaLista = numerosSorteados.length; // salva dentro da variável, a quantidade de índices do array
    if(quantidadeDeElementosNaLista == limiteMaximo){ // se todos os número secretos estiverem na lista, a lista é limpa, pois sobescrever  causa erro.
        numerosSorteados = []; // deixa a lista vazia
    }

    if(numerosSorteados.includes(numeroEscolhido)){ // verifica se o numero secreto ou string está na lista 
        return gerarNumeroAleatorio(); // se sim gera outro numero secreto refazendo a função
    }
    else{

        numerosSorteados.push(numeroEscolhido); // se não adiciona na lista através no push
        console.log(numerosSorteados);
        return numeroEscolhido; // e a função retorna o número secreto que vai para a variável no topo desse código
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() { // quando botão 'jogar novamente é acionado, tudo começa de novo
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true) // pega a tag ou estrutura pelo id e coloca um elemento, o de desabilitar o botão.
}










