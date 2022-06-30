import { useState } from "react"
import uuid from "react-uuid"

export default function FormPerson(){
    
const [person, setPerson] = useState({
    firstName: "",
    lastName: ""
})

const [personU, setPersonU] = useState({
    fName: "",
    lName: ""
})

const [personDb, setPersonDb] = useState([])


function handleChange(event) {
    const {name, value} = event.target
    setPerson(prevPerson => ({
        ...prevPerson,
        [name]: value
    }))

}


function handleChangeU(e) {
   
  /* setLName(e.target.value)
   setFName(e.target.value) */
   const {name, value} = e.target

  setPersonU(prevPerson => ({
        ...prevPerson,
        [name]: value
    }))

}

function editButton(item) {
   /* setLName(item.firstName)
    setFName(item.lastName) */
    console.log(item)
    setPersonU(
        {
        id:item.id,
        fName: item.firstName,
        lName: item.lastName}
    )  
}

function deleteButton(id){
    console.log(id)
    console.log(personDb)
    setPersonDb((prevPerson) => prevPerson.filter((i) => i.id !== id));

}

function updateData() {

}

function handleSubmit() {

    if(person.firstName.trim().length === 0 || person.lastName.trim().length === 0){
        alert("PLease fill first name and last name")
    }

    else{
        setPersonDb(prevPersonDb => ([
            ...prevPersonDb,
            {id:uuid(),
            firstName: person.firstName,
            lastName:person.lastName}
        ]))
    }

}

function handleUpdate() {

    let index = personDb.findIndex(x => x.id === personU.id);

    const updatedPerson = [...personDb];
    updatedPerson[index] = {id:personU.id,
                            firstName: personU.fName,
                            lastName:personU.lName}
    setPersonDb(updatedPerson);

    setPersonU({id:"",fName:"",lName:""})
}

console.log(person)
const displayRow = personDb.map((i)=>{ 
    return  (
        <tr key={i.id}><td>{i.firstName}</td><td>{i.lastName}</td><td><button onClick={()=>editButton(i)}>Edit</button></td><td><button onClick={()=>deleteButton(i.id)}>Delete</button></td></tr>
    )
})


/*const displayHeader = personDb.map((p)=>{
    const personObj = Object.keys(p)
    return (
    personObj.map((item,key)=>{
        return(
            <th data-key={key}>{item}</th>
        )
    })
    )
})*/
return (
<div>
        <input 
            type="text"
            placeholder="First N"
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
        />
        <input 
            type="text"
            placeholder="Last Name"
            className="form--input"
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
        />
        <button onClick={()=>handleSubmit()}>Add</button>
  <div>
    <h1>Customer Details</h1>
    <table>
    <tbody>
    <tr><td>First Name</td><td>Last Name</td></tr>
    {(personDb.length > 0) &&displayRow}
    </tbody>
    </table>
  </div>
  <div>

  </div>
  <div>
        <input 
            type="text"
            placeholder=''
            name='fName'
            value={personU.fName}
            onChange={handleChangeU}
        />
        <input 
            type="text"
            placeholder=''
            name='lName'
            value={personU.lName}
            onChange={handleChangeU}
        />
        <button onClick={handleUpdate}>Update</button>
  </div>
</div>
)

}