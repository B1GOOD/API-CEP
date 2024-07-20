// aprende a chamar uma URL pelo js
// 1ª Chamar API
// 2ª "Traduzir" a resposta do API
// 3ª Trabalhar com os dados API

// AJAX => ANTIGA E NÃO DEVE SER USADA EM CÓDIGOS NOVOS
// FETCH => 2015+ OK
// AXIOS => mais moderno, porém depende de uma biblioteca externa.
let respostaApi;
let dadosApi;
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const estado = document.getElementById("uf")
const bairro = document.getElementById("bairro")
const cidade = document.getElementById("cidade")
const complemento = document.getElementById("comp") 
const rodopiao = document.querySelector(".loader")

const todoForm = [cep, rua, estado, bairro, cidade, complemento]
// Metodos do fetch para ler dados da API
function buscaCep(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resposta) => {
        console.log(resposta);
        desabilitarForms()
        rodopiao.style.display = "block"
        // Decodificar a resposta no formato json
        respostaApi = resposta.json();
        // return = resposta.json()
        return respostaApi
    })
    .then(dados => {
        dadosApi = dados;
        setTimeout (() => {
            preencherForms(dadosApi)
            habilitarForms()
            rodopiao.style.display = "none"}, 2000)
    })
}
function preencherForms (dadosApi){
    rua.value = dadosApi.logradouro;
    estado.value = dadosApi.uf;
    bairro.value = dadosApi.bairro;
    cidade.value = dadosApi.localidade;
    complemento.value = dadosApi.complemento;
}

//deasbilitar pega todos os
function desabilitarForms(){
    for (const input of todoForm) {
        input.disabled = true;
    }
}

function habilitarForms(){
    for (const input of todoForm) {
        input.disabled = false;
    }
}

// função arrow/Arrow Function


cep.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Enter") {
        // alert("Vamos buscar o cep...")
        buscaCep(cep.value)
    }
})

