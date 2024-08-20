//  Aqui são as constantes que permitem essas informações ficarem fixas
//

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const jogar_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
// Aqui começa fazer o botão do START funcionar e abrir a página de informações do usuario, onde ele poe o nome e etc//
start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
}

//Aqui se o usuario clicar no botão de EXIT , a tela de informações vai sumir e vai voltar pra pagina de start  //
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
}


// Aqui é a parte de saudação //
function saudar() {
  var nome = document.getElementById("nome").value;
  var saudacao = nome + "! Bem-vindo(a) ao Quiz!";
  document.getElementById("saudacao").innerHTML = saudacao;
}

// Botão Sair que também faz tudo fechar//
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
}

// Aqui faz o botão de jogar ser ativado e quando é clicado faz a parte de informações sumir e faz aparecer a página de perguntas//
jogar_btn.onclick = () => {
  info_box.classList.remove("activeInfo");

  // Aqui faz a página de Perguntas aparecer e também chama todos os elementos que fazem parte da página, como o cronometro e a passagem das perguntas //

  quiz_box.classList.add("activeQuiz");

  showQuetions(0); //chama as questões do js
  queCounter(1); //passa a primeira pergunta
  startTimer(15); //chama o cronometro
}
// Essa parte da nome para as informações e atribui dados para cada delas//

// Determina o tempo do temporizador //
let timeValue = 15;
//Faz a contagem do array das questões  //
let que_count = 0;
// é a primeira questão
let que_numb = 1;
// Pontuação do jogador
let userScore = 0;
// Foi chamado para fazer a contagem
let counter;
//determina onde começa 
let widthValue = 0;

// Aqui são os botoes de reiniciar e também de fechar e eles ficam na pagina de resultados //
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Aqui quando a pessoa clica em REINICIAR ela volta para a parte das questões
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");

  // 
  timeValue = 15;
  //
  que_count = 0;
  // 
  que_numb = 1;
  // 
  userScore = 0;
  // 
  widthValue = 0;

  //chama a função de mostrar as questions
  showQuetions(que_count);

  //passa o valor de que_numb para queCounter
  queCounter(que_numb);

  //limpa o counter
  clearInterval(counter);

  //chama a função startTimer, que inicia o temporizador
  startTimer(timeValue);

  //muda o texto timeText para Time Left
  timeText.textContent = "Time Left";

  //esconde o botão next
  next_btn.classList.remove("show");
}

// Botão Sair que ao ser clicado recarrega a página
quit_quiz.onclick = () => {
  window.location.reload(); //recarrega a pagina
}

//chama as constantes dos botões do rodapé
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Botão de NEXT
next_btn.onclick = () => {
  if (que_count < questions.length - 1) { //se a contagem de perguntas for menor que o tamanho total das perguntas

    //incrementa o valor de que_count
    que_count++;

    //incrementa o valor de the que_numb
    que_numb++;

    //chama a função showQestions
    showQuetions(que_count);

    //passa valor de  que_numb para queCounter
    queCounter(que_numb);

    //limpa o counter
    clearInterval(counter);

    //chama a função startTimer que inicia o temporizador
    startTimer(timeValue);

    //muda o timeText para Time Left
    timeText.textContent = "Time Left";

    //esconde o next button
    next_btn.classList.remove("show");
  } else {

    //limpa o counter
    clearInterval(counter);

    //chamando a função showResult para mostrar os resultados
    showResult();
  }
}

// obtendo perguntas e opções do array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //criando uma nova tag span e div para questões e option(respostas) e passando o valor usando array index
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
  que_text.innerHTML = que_tag; //adiciona um novo span tag dentro de que_tag

  //adiciona um novo div tag dentro de option_tag
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  // definir o atributo onclick para todas as opções disponíveis
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

//if usuario clicar nas options(respostas)
function optionSelected(answer) {

  //limpa o counter(contador de perguntas)
  clearInterval(counter);

  //obtendo a opção selecionada pelo usuário
  let userAns = answer.textContent;

  //obtendo a resposta correta do array
  let correcAns = questions[que_count].answer;

  //obtendo todos os itens de opção
  const allOptions = option_list.children.length;

  //se a opção selecionada pelo usuário for igual à resposta correta do array
  if (userAns == correcAns) {

    //atualizando o valor da pontuação com 1
    userScore += 1;

    //adicionando cor verde para corrigir a opção selecionada
    answer.classList.add("correct");
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {

    //adicionando cor vermelha para corrigir a opção selecionada
    answer.classList.add("incorrect")
    console.log("Wrong Answer");


    //se houver uma opção que corresponda a uma resposta do array
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {


        //adicionando cor verde à opção correspondente
        option_list.children[i].setAttribute("class", "option correct");
        console.log("Auto selected correct answer.");
      }
    }
  }

  //uma vez que o usuário seleciona uma opção, desativa todas as opções
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }

  //mostrar o botão próximo se o usuário selecionou qualquer opção
  next_btn.classList.add("show");
}

function showResult() {
  //esconde a página de inforações
  info_box.classList.remove("activeInfo");

  //esconde a parte de perguntas
  quiz_box.classList.remove("activeQuiz");

  //mostra a pagina de resultados
  result_box.classList.add("activeResult");


  // se o usuário marcou mais de 3
  //criando uma nova tag span e passando o número da pontuação do usuário e o número total da pergunta
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {

    // adiciona novo span tag dentro de score_Text
    let scoreTag = '<span>Arrasou, você conseguiu <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }

  // se o usuário marcou mais de 1 mostra essa mensagem
  else if (userScore > 1) {
    let scoreTag = '<span>Muito bem , você conseguiu <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }

  // se o usuário marcou menos de 1 mostra essa mensagem
  else {
    let scoreTag = '<span>Não foi dessa vez, você conseguiu <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

//alterando o valor de timeCount com valor de tempo
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;


    //diminuir o valor do tempo
    time--;

    //se o timer for menor que 9
    if (time < 9) {
      let addZero = timeCount.textContent;

      //adiciona  0 antes do time value
      timeCount.textContent = "0" + addZero;
    }

    //se o cronometro for menor que 0
    if (time < 0) {

      //limpa o counter
      clearInterval(counter);

      // altera o cronometro para off
      timeText.textContent = "Time Off";

      //obtendo todos os itens de opção
      const allOptions = option_list.children.length;

      //obtendo a resposta correta ddo array
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {


        //se houver uma opção que corresponda a uma resposta do array
        if (option_list.children[i].textContent == correcAns) {

          //adicionando cor verde à opção correspondente
          option_list.children[i].setAttribute("class", "option correct");
          console.log("Time Off: Auto selected correct answer.");
        }
      }

      //uma vez que o usuário seleciona uma opção, desativa todas as opções
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }

      //mostrar o próximo botão se o usuário selecionou qualquer opção
      next_btn.classList.add("show");
    }
  }
}

//criando uma nova tag span e passando o número da pergunta e o total da pergunta
function queCounter(index) {

  let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';

  //adicionando um span tag dentro de bottom_ques_counter
  bottom_ques_counter.innerHTML = totalQueCounTag;
}