let statistics ={
    D: "Democrats",
    R: "Republicans", 
    ID: "Independents",
    numberMembers: 0,
    numberOfD: 0,
    numberOfR: 0,
    numberOfID: 0,
    votesMembers: 0,
    votesD: 0,
    votesR:0,
    votesID: 0,
    democrats:[],
    republicans:[],
    independients:[],
    lessMissedVotes:[],
    mostMissedVotes:[]
  }
  
  const copiaSenate = Array.from(senate.results[0].members)
  let table_senate_attendance = document.querySelector('.table_senate_attendance')
  
  let copiaHouse = Array.from(house.results[0].members)
  let table_house_attendance = document.querySelector('.table_house_attendance')
  
  function calculoVotos(condicion){
    statistics.votesD=Number(sumaVotewithparty(statistics.democrats,condicion).toFixed(2))
    statistics.votesR=Number(sumaVotewithparty(statistics.republicans,condicion).toFixed(2))
    let independients=Number(sumaVotewithparty(statistics.independients,condicion).toFixed(2))
    statistics.votesID=independients?independients:0
    if(statistics.numberOfID==0){
      statistics.votesMembers=((statistics.votesD+statistics.votesR)/2).toFixed(2)
    }else{
      statistics.votesMembers=((statistics.votesD+statistics.votesR+statistics.votesID)/3).toFixed(2)
    }  
  }

  
if(document.title=='Attendance Senate'){ 
  cantidadmiembros(copiaSenate)
  calculoVotos('votes_with_party_pct')
  MostrartableAtAGlase(table_senate_attendance)
  numbermissedvotes(copiaSenate, 'missed_votes_pct')
    
  const table_senate_attendance_most = document.querySelector('.table_senate_attendance_most')
  MostrartableLeanEngaged(statistics.mostMissedVotes, table_senate_attendance_most.children[1],'missed_votes','missed_votes_pct')
    
  const table_senate_attendance_less = document.querySelector('.table_senate_attendance_less') 
  MostrartableLeanEngaged(statistics.lessMissedVotes, table_senate_attendance_less.children[1],'missed_votes','missed_votes_pct')
    
  }else if(document.title=='Attendance House'){
    cantidadmiembros(copiaHouse)    
    calculoVotos('votes_with_party_pct')
    MostrartableAtAGlase(table_house_attendance)
    numbermissedvotes(copiaHouse,'missed_votes_pct')
    
    const table_house_attendance_most = document.querySelector('.table_house_attendance_most')
    MostrartableLeanEngaged(statistics.mostMissedVotes, table_house_attendance_most.children[1],'missed_votes','missed_votes_pct')

    const table_house_attendance_less = document.querySelector('.table_house_attendance_less') 
    MostrartableLeanEngaged(statistics.lessMissedVotes, table_house_attendance_less.children[1],'missed_votes','missed_votes_pct')
  }

if(document.title=='Senate party'){
  cantidadmiembros(copiaSenate)
  calculoVotos('votes_with_party_pct')
  MostrartableAtAGlase(table_senate_attendance)
  numbermissedvotes(copiaSenate, 'total_votes')
  
  const table_senate_party_less = document.querySelector('.table_senate_party_less') 
  MostrartableLeanEngaged(statistics.lessMissedVotes, table_senate_party_less.children[1],'total_votes','votes_with_party_pct')

  const table_senate_party_most = document.querySelector('.table_senate_party_most') 
  MostrartableLeanEngaged(statistics.mostMissedVotes, table_senate_party_most.children[1],'total_votes','votes_with_party_pct')

  }else if(document.title=='House party'){
    cantidadmiembros(copiaHouse)    
    calculoVotos('votes_with_party_pct')
    MostrartableAtAGlase(table_house_attendance)
    numbermissedvotes(copiaHouse,'total_votes')

    const table_house_party_most = document.querySelector('.table_house_party_most')
    MostrartableLeanEngaged(statistics.mostMissedVotes, table_house_party_most.children[1],'total_votes','votes_with_party_pct')

    const table_house_party_less = document.querySelector('.table_house_party_less') 
    MostrartableLeanEngaged(statistics.lessMissedVotes, table_house_party_less.children[1],'total_votes','votes_with_party_pct')
}


  //Creacion de las filas de las tablas
  function MostrartableAtAGlase(element){
    let tablebody = element.children[1]
    tablebody.innerHTML = ''
    let fragment = document.createDocumentFragment()
    
    let filatr1 = document.createElement('tr')
    let filatr2 = document.createElement('tr')
    let filatr3 = document.createElement('tr')
    let filatr4 = document.createElement('tr')
    
    let NameD = document.createElement('TD')
    let NameR = document.createElement('TD')
    let NameID = document.createElement('TD')
    let numberOfD = document.createElement('TD')
    let numberOfR = document.createElement('TD')
    let numberOfID = document.createElement('TD')
    let votesD = document.createElement('TD')
    let votesR = document.createElement('TD')
    let votesID = document.createElement('TD')
    let total = document.createElement('TD')
    let totalofRep= document.createElement('TD')
    let totalporc= document.createElement('TD')

    NameD.textContent = `${statistics.D}`
    numberOfD.textContent = `${statistics.numberOfD}`
    votesD.textContent = `${statistics.votesD}`
    filatr1.append(NameD,numberOfD,votesD)
    
    NameR.textContent = `${statistics.R}`
    numberOfR.textContent = `${statistics.numberOfR}`
    votesR.textContent = `${statistics.votesR}`
    filatr2.append(NameR,numberOfR,votesR)

    NameID.textContent = `${statistics.ID}`
    numberOfID.textContent = `${statistics.numberOfID}`
    votesID.textContent = `${statistics.votesID}`
    filatr3.append(NameID, numberOfID,votesID)

    total.textContent = `${'Total'}`
    totalofRep.textContent = `${statistics.numberMembers}`
    totalporc.textContent = `${statistics.votesMembers}`
    filatr4.append(total,totalofRep,totalporc)
        
    fragment.append(filatr1,filatr2,filatr3,filatr4)
    
    tablebody.appendChild(fragment)
    element.appendChild(tablebody)
}
  

function cantidadmiembros(miembros){
  statistics.democrats=miembros.filter(member => member.party=="D")
  statistics.numberOfD=statistics.democrats.length 
  statistics.republicans=miembros.filter(member => member.party=="R")
  statistics.numberOfR=statistics.republicans.length
  statistics.independients= miembros.filter(member => member.party=="ID")
  statistics.numberOfID=statistics.independients.length
  
  let total=statistics.numberOfD + statistics.numberOfR + statistics.numberOfID 
  statistics.numberMembers=total  
}

function sumaVotewithparty(miembros, valor) {
  let sumaD = miembros.map(member => member[valor]).reduce((acc, act) => acc + act,0)   
  let prom = sumaD/miembros.length
  return prom
}

function numbermissedvotes(miembros,valor){
   
  let arraynumber = miembros.filter(miembro => miembro[valor]).length
  porcentaje = Math.ceil(arraynumber* 0.10)
  
  let arraymember=[...miembros].sort((a,b) => a[valor] - b[valor]).slice(0,porcentaje)
  let arraymember2=[...miembros].sort((a,b) => b[valor] - a[valor]).slice(0,porcentaje)
  statistics.mostMissedVotes=arraymember  
  statistics.lessMissedVotes=arraymember2
}

function MostrartableLeanEngaged(array,element,condicion1,condicion2){
  element.innerHTML = ''
  let fragment = document.createDocumentFragment()
  
  array.forEach(member => {    
      let filatr = document.createElement('tr')
      let Name = document.createElement('TD')
      let NumberofMissedVotes = document.createElement('TD')
      let votes = document.createElement('TD')
  
      Name.textContent = `${member.first_name}`
      NumberofMissedVotes.textContent = `${member[condicion1]}`
      votes.textContent = `${member[condicion2]}`
      
      filatr.append(Name,NumberofMissedVotes,votes)
      fragment.appendChild(filatr)    
  });        
    element.appendChild(fragment)
  
}




