/* 
Lógica de Programacao
    - Falar a lingua do computador
Algoritmo
    - Receita de bolo. Os passos na sequencia certa

JavaScript
    - Variáveis - pedacinho na memória do computador
        que voce pode guardar o que voce quiser

    - Funcoes
        pedacinho de código que, só executa quando
        eu chamo
        
    - Como se comunicar com o HTML
        Manipular a DOM

    console.log() mostra o que eu quiser na tela

    [x] Saber quando o botão foi clicado
    [ ] Pegar o texto que o usário digitou
    [ ] Mando para o servidor traduzir
    [ ] Receber a resposta do servidor (traducao)  
    [ ] Colocar o texto na tela   

    // JavaScript - scripts
    // HTML - document
    querySelector - procurar alguem no HTML
    value = valor - o texto que tem nele

   padrao =  https://api.mymemory.translated.net/get?q=
   traduzir =  Hello World!
   idioma = &langpair=pt-BR|en

   fetch / ferramenta do javascript para entrar em contato com um servidor
   await (Espere) - async (async & await)
   json (formato mais amigavel)
*/

let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let botaoTraduzir = document.querySelector(".botao-traduzir")
let botaoMicrofone = document.querySelector(".botao-microfone")
let selectIdioma = document.querySelector(".idioma")


async function traduzir(){
    let idiomaSelecionado = selectIdioma.value

    // Mapear idiomas para a API
    let codigosIdioma = {
        "Inglês": "pt-BR|en",
        "Espanhol": "pt-BR|es",
        "Francês": "pt-BR|fr",
        "Alemão": "pt-BR|de",
        "Italiano": "pt-BR|it",
        "Japonês": "pt-BR|ja",
        "Chinês": "pt-BR|zh-CN",
        "Coreano": "pt-BR|ko",
        "Russo": "pt-BR|ru",
        "Árabe": "pt-BR|ar"
    }

    let endereco = "https://api.mymemory.translated.net/get?q=" 
    + inputTexto.value
    + "&langpair=" + codigosIdioma[idiomaSelecionado]

    let resposta = await fetch(endereco)

    let dados = await resposta.json()
    
    traducaoTexto.textContent = dados.responseData.translatedText
    console.log(dados)

}

// Mapeamento de idiomas para síntese de fala
let codigosIdiomaFala = {
    "Inglês": "en-US",
    "Espanhol": "es-ES",
    "Francês": "fr-FR",
    "Alemão": "de-DE",
    "Italiano": "it-IT",
    "Japonês": "ja-JP",
    "Chinês": "zh-CN",
    "Coreano": "ko-KR",
    "Russo": "ru-RU",
    "Árabe": "ar-SA"
}

// Configurar Speech Recognition (reconhecimento de voz)
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
recognition.lang = 'pt-BR'
recognition.continuous = false
recognition.interimResults = false

function falarTexto(){
    let idiomaSelecionado = selectIdioma.value
    let codigoFala = codigosIdiomaFala[idiomaSelecionado]
    let texto = traducaoTexto.textContent

    // Parar qualquer fala anterior
    window.speechSynthesis.cancel()

    // Criar um novo objeto de fala
    let utterance = new SpeechSynthesisUtterance(texto)
    utterance.lang = codigoFala
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    // Fazer o navegador falar
    window.speechSynthesis.speak(utterance)
}

function escutarVoz(){
    inputTexto.value = ""
    traducaoTexto.textContent = "Ouvindo..."
    recognition.start()
}

// Evento quando a fala é reconhecida
recognition.onresult = function(event){
    let textoFalado = event.results[0][0].transcript
    inputTexto.value = textoFalado
    
    // Traduzir automaticamente
    setTimeout(() => {
        traduzir().then(() => {
            // Falar a tradução automaticamente
            falarTexto()
        })
    }, 500)
}

// Evento de erro
recognition.onerror = function(event){
    traducaoTexto.textContent = "Erro ao ouvir. Tente novamente!"
}

// Adicionar eventos de clique nos botões
botaoTraduzir.addEventListener("click", traduzir)
botaoMicrofone.addEventListener("click", escutarVoz)
// clicou no botao de traduzir -> chama a funcao -> monto o enderco ->
// clicou no botao de microfone -> escuta a voz -> traduz automaticamente -> fala automaticamente 

