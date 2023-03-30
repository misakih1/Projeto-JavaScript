var nome               = document.getElementById("inputNome");
var sobrenome          = document.getElementById("inputSobrenome");
var idade              = document.getElementById("inputIdade");
var nascimento         = document.getElementById("inputNascimento");
var experiencia        = document.getElementById("inputExperiencia");
var especialidade      = document.getElementById("inputEspecialidade");
var curso              = document.getElementById("inputCurso");
var turno              = document.getElementById("inputTurno");
var tipo               = document.getElementById("selectTipo");
var alertaErro = document.getElementById("alertaErro")
//--------------------------- input -------------------------
var tudo               = [];
// ==========================================================
var divNascimento      = document.getElementById("Nascimento");
var divExperiencia     = document.getElementById("Experiencia");
var divEspecialidade   = document.getElementById("Especialidade");
var divCurso           = document.getElementById("Curso");
var divTurno           = document.getElementById("Turno");
//===========================================================
function exibeForm(){
    
    switch(tipo.value){
        case "professores":
            divExperiencia.classList.remove  ("desaparece");
            divEspecialidade.classList.remove("desaparece");
            divNascimento.classList.remove   ("desaparece");
            divCurso.classList.add           ("desaparece");
            divTurno.classList.add           ("desaparece");
            break;  
        case "alunos":
            divCurso.classList.remove        ("desaparece");
            divTurno.classList.remove        ("desaparece");
            divNascimento.classList.remove   ("desaparece");
            divExperiencia.classList.add     ("desaparece");
            divEspecialidade.classList.add   ("desaparece");
            break;
        case "turmas":
            divCurso.classList.remove        ("desaparece");
            divTurno.classList.remove        ("desaparece");
            divNascimento.classList.add      ("desaparece");
            divExperiencia.classList.add     ("desaparece");
            divEspecialidade.classList.add   ("desaparece");
            break;
    }

}

//===========================================

function cadastrar(){

    //funcionou?!
    idade.value    >= 18
    ? (idade.value += "<br>Maior de idade")
    : "<br>Menor de idade";
    
    tudo.push(new inform(
                  nome.value,
                  sobrenome.value,
                  nascimento.value.replace(/-/g , "/"),
                  idade.value,
                  experiencia.value,
                  especialidade.value,
                  curso.value,
                  turno.value,
                  tipo.value
    ));

    consultar();

}


//==============================================

function consultar(){
    let cards  = "";

    for(let i in tudo){
        cards +=
            "<div class='card'>"  +   
                tudo[i].imprime() +
            "</div>";
    }

    document.getElementById("resultados").innerHTML = cards;
}

//-------------------------------------------

class inform{
    nome;
    sobrenome;
    nascimento;
    idade;
    experiencia;
    especialidade;
    curso;
    turno;
    tipo;

    constructor(nome,
                sobrenome,
                nascimento,
                idade,
                experiencia,
                especialidade,
                curso,
                turno,
                tipo){

        this.nome          = nome;
        this.sobrenome     = sobrenome;
        this.idade         = idade;
        this.nascimento    = nascimento;
        this.experiencia   = experiencia;
        this.especialidade = especialidade;
        this.curso         = curso;
        this.turno         = turno;
        this.tipo          = tipo;
    }

        imprime            = () => {
        let dados          = 
        "Nome: "                + this.nome          + "</br>"  + 
        "Sobrenome: "           + this.sobrenome     + "</br>"  +
        "Idade: "               + this.idade         + "</br>"  ;
        
        switch(tipo.value){
            case "professores":
                dados += "Nascimento: "    + this.nascimento    + "</br>"  
                dados += "Experiência: "   + this.experiencia   + "</br>";
                dados += "Especialidade: " + this.especialidade + "</br>";
                
                break;

            case "alunos":
                dados += "Nascimento: "    + this.nascimento    + "</br>";
                dados += "Curso: "         + this.curso         + "</br>";
                dados += "Turno: "         + this.turno         + "</br>";
                
                break;

            case "turmas":
                dados += "Curso: "         + this.curso         + "</br>";
                dados += "Turno: "         + this.turno         + "</br>";
                
                break;
   
        }
        document.getElementById("cards").reset();
        return dados;
    }
}


function validar(){
    let erros        = 0;
    let confirmaErro = "";

    //nome, professores, alunos e turma
    
    //sobrenome obrigatório, professores, alunos e turma
    if(this.nome.value === ""){
        confirmaErro += 
        "<li>Coloque o nome</li>";
        erros        ++;
        console.log(this.sobrenome.value.indexOf());
        nome.classList.add("erroInput")
    }
    else{
        nome.classList.remove("erroInput")	
    }
   
    if(this.sobrenome.value === ""){
        confirmaErro += 
        "<li>Coloque o sobrenome</li>";
        erros        ++;
        console.log(this.sobrenome.value.indexOf());
        sobrenome.classList.add("erroInput");
    }
    else{
        sobrenome.classList.remove("erroInput");	
    }
    //idade obrigatória, professores, alunos e turma
    if(!this.idade.value){
        confirmaErro += 
        "<li>Coloque sua idade</li>";
        erros        ++;
        idade.classList.add("erroInput");
    }
    else if(this.tipo.value == "alunos" && this.idade.value < 15){
        confirmaErro += 
        "<li>Não pode menores de 15 anos</li>";
        erros        ++;
        idade.classList.add("erroInput");
    }
    else if (this.tipo.value == "alunos" && this.idade.value >= 15 && this.idade.value){
        idade.classList.remove("erroInput");
    }
    else if(this.tipo.value == "professores" && this.idade.value < 18){
        confirmaErro += 
        "<li>Não pode menores de 18 anos</li>";
        erros        ++;
    }
    else if(this.tipo.value == "professores" && this.idade.value >= 18 && this.idade.value){
        idade.classList.remove("erroInput");
    }
    
    if(isNaN(this.idade.value)){
        confirmaErro += 
        "<li>Idade inválida</li>";
        erros        ++;
        idade.classList.add("erroInput");
    }
    else if (this.idade.value){
        idade.classList.remove("erroInput");
    }
    //idade menor, professores, aluno e turm
    
    //nascimento professores
    if(!this.nascimento.value && this.tipo.value == "alunos" || !this.nascimento.value && this.tipo.value == "professores"){
        confirmaErro  += 
        "<li>Coloque sua data de nascimento</li>";
        erros         ++;
        nascimento.classList.add("erroInput");
    }
    else{
        nascimento.classList.remove("erroInput");
    }
    

    //Experiencia obrigatória,professores
    if(!this.experiencia.value && this.tipo.value == "professores"){
        confirmaErro += 
        "<li>Coloque sua experiência</li>";
        erros        ++;
        experiencia.classList.add("erroInput");
    }
    else{
        experiencia.classList.remove("erroInput");
    }
    //Especialidade obrigatória, professores
    if(!this.especialidade.value && this.tipo.value == "professores"){
        confirmaErro += 
        "<li>Coloque sua especialidade</li>";
        erros        ++;
        especialidade.classList.add("erroInput");
    }
    else{
        especialidade.classList.remove("erroInput");}

    //Curso obrigatório, turmas e alunos
    if(!this.curso.value && this.tipo.value == "alunos" || !this.curso.value && this.tipo.value == "turmas"){
        confirmaErro += 
        "<li>Coloque seu curso</li>";
        erros        ++;
        curso.classList.add("erroInput");
    }
    else{
        curso.classList.remove("erroInput");
    }
    //Turno obrigatório, alunos
    if(!this.curso.value && this.tipo.value == "alunos" || !this.curso.value && this.tipo.value == "turmas"){
        confirmaErro += 
        "<li>Coloque seu turno</li>";
        erros        ++;
        turno.classList.add("erroInput");
    }
    else{
        turno.classList.remove("erroInput");
    }
    

    if(erros == 0){
        cadastrar();
        
    } else {
        document.getElementById("listaErro").innerHTML   = confirmaErro;
        alertaErro.classList.remove("desaparece")
        


        setTimeout(() => {
            alertaErro.classList.add("desaparece")
            nome.classList.remove("erroInput");
            sobrenome.classList.remove("erroInput");
            idade.classList.remove("erroInput");
            nascimento.classList.remove("erroInput");
            experiencia.classList.remove("erroInput");
            especialidade.classList.remove("erroInput");
            curso.classList.remove("erroInput");
            turno.classList.remove("erroInput");
            
            

        }, 4000);
    }
} 

