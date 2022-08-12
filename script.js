  //Genero una copia para no modificar el orginal 
const copiaSenate= Array.from(senate.results[0].members)
console.log(copiaSenate)

const table_senate = document.querySelector('.table_senate')
const checkboxes = document.querySelectorAll('.form-check input')
const selectstate= document.getElementById('selectstate')
const formulario = document.getElementById('formulario')

//Creacion de las opciones de State 
let state = []

const x = copiaSenate.forEach( member => member.state !== '' ? state.push(member.state) : null )

let stateNoRepetidos = new Set(state)

stateNoRepetidos.forEach(state => {
  selectstate.innerHTML += `<option value=${state}>${state}</option>`
})

//  Primera fila de la tabla con valores a mostrar 
let encabezado = document.createElement('tr')// me crea una fila
let thName = document.createElement('TH')
thName.innerHTML= "Name"
let thParty = document.createElement('TH')
thParty.innerHTML = "Party"
let thState = document.createElement('TH')
thState.innerHTML = "State" 
let thTime = document.createElement('TH')
thTime.innerHTML = "Years in office"
let thVote = document.createElement('TH')
thVote.innerHTML = "%Votes w/Party"
encabezado.append(thName, thParty, thState, thTime, thVote)
table_senate.children[0].appendChild(encabezado)
let tablebody = table_senate.children[1]

MembersSenate(copiaSenate,table_senate);

//Creacion de las filas de las tablas
function MembersSenate(array,element){
  tablebody.innerHTML = ''
  console.log(array)
  let fragment = document.createDocumentFragment()
  array.forEach( member => {     
    let filatr = document.createElement('tr')// me crea una fila
    let Name = document.createElement('TD')
    let Party = document.createElement('TD')
    let State = document.createElement('TD')
    let Time = document.createElement('TD')
    let Vote = document.createElement('TD')
    
    Name.textContent = `${member.first_name}` //Name es un tipo td
    filatr.appendChild(Name) //Name que es td es hijo de tr
    
    Party.textContent = `${member.party}`
    filatr.appendChild(Party)
    
    State.textContent = `${member.state}`
    filatr.appendChild(State)

    Time.textContent = `${member.seniority}`
    filatr.appendChild(Time)
    
    Vote.textContent = `${member.votes_with_party_pct}`
    filatr.appendChild(Vote)
    
    fragment.appendChild(filatr)
  })
      
   tablebody.appendChild(fragment)
   element.appendChild(tablebody)
  }


formulario.addEventListener('change', (e)=>{
  
  const checkedentradaslistadas = checkentradas()
  
  let arraylisten =[] //almacenar los miembros filtrados
  
  arraylisten = copiaSenate.filter(member => member.state == checkedentradaslistadas[0] || checkedentradaslistadas[0] == 'ALL')  
  if(checkedentradaslistadas.length > 1){
    arraylisten = arraylisten.filter(filtro => filtro.party == checkedentradaslistadas[1] || filtro.party == checkedentradaslistadas[2] || filtro.party == checkedentradaslistadas[3]) 
  }  
  MembersSenate(arraylisten,table_senate)
  
}  
)
function checkentradas(){
  const checkboxall = Array.from(checkboxes)
  const filtrados = checkboxall.filter(entrada => entrada.checked)
  const solovalue = filtrados.map(entrada => entrada.value)
  solovalue.unshift(selectstate.value)
  return solovalue  
}



