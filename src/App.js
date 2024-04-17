import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button,EditableText,InputGroup,Toaster} from '@blueprintjs/core';

const AppToster = Toaster.create(
  {
    position:"top"
  }
)
function App() {
    const [users,setname] = useState([]);
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>res.json())
    .then((data)=>{setname(data)})
    },[]);

    const [NewName,setNewName] = useState("");
    const [NewEmail,setNewEmail] = useState("");
    const [NewWeb,setNewWeb] = useState("");
    const [NewPhone,setNewPhone] = useState("");
    console.log(NewName);
   
    function changevalues(){
        const name  = NewName.trim();
        const email = NewEmail.trim();
        const website   = NewWeb.trim();
        const phone = NewPhone.trim();
        
        if(name && email && website && phone){
            fetch("https://jsonplaceholder.typicode.com/users",
           {
            method :"POST",
            body :JSON.stringify({
                name,
                email,
                website,
                phone
            }),
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            } 
           } )
           .then((res)=>res.json())
           .then((data)=>
           {
           setname([...users,data]);
           AppToster.show({
            message :"User Added Successfully!",
            intent :"success",
            timeout:3000 
       });
       setNewName("");
        setNewEmail("");
        setNewPhone("");
        setNewWeb("");
         })
        }
    }
     
    function updatevalue(id, key, value) {
            setname(users.map(user => {
                return user.id === id ? { ...user, [key]: value } : user;
            }));
        }
     function Editvalues(id){
             const user = users.find((user)=>user.id===id);
             
                fetch(`https://jsonplaceholder.typicode.com/users/10`,
               {
                method :"PUT",
                body :JSON.stringify({
                   user
                }),
                headers:{
                    "Content-Type": "application/json; charset=utf-8"
                } 
               } )
               .then((res)=>res.json())
               .then((data)=>
               {
               AppToster.show({
                message :"User Updated Successfully!",
                intent :"success",
                timeout:3000 
           });
          
             })
            }
    function Deletevalues(id){
      fetch(`https://jsonplaceholder.typicode.com/users/10`,
      {
       method :"DELETE",
      } )
      .then((res)=>res.json())
      .then((data)=>
      {
        setname((users)=>users.filter(user=>user.id!==id))
      AppToster.show({
       message :"User Delelet Successfully!",
       intent :"success",
       timeout:3000 
  });
 
    })
    }
   return(
    <>
     <table>
        <thead>
           <th>Id</th>
           <th>Name</th>
           <th>Email</th>
           <th>Website</th>
           <th>Phone-num</th>
           <th>Operation</th>
        </thead>
        <tbody>
            
          {users.map(user=>
           <tr key={user.id}>
             <td>{user.id}</td>
            <td>{user.name}</td>
            <td><EditableText onChange={value => updatevalue(user.id, "email", value)}value={user.email}/></td>
            <td><EditableText onChange={value =>updatevalue(user.id,"website",value)} value={user.website}/></td>
            <td><EditableText onChange={value =>updatevalue(user.id,"phone",value)} value={user.phone}/></td>
            <Button intent='primary' onClick={()=>Editvalues(user.id)}>Update</Button>
            &nbsp;
            <Button intent='danger' onClick={()=>Deletevalues(user.id)}>Delete</Button>
           </tr>
            )}
        </tbody>
        <tr>
            <td></td>
            <td>
            <InputGroup 
            value={NewName}
             placeholder='Enter Your Name....'
             onChange={(e)=>setNewName(e.target.value)}
            />
            </td>

            <td>
            <InputGroup 
            value={NewEmail}
             placeholder='Enter Your Email....'
             onChange={(e)=>setNewEmail(e.target.value)}
            />
            </td>

            <td>
            <InputGroup 
             value={NewWeb}
             placeholder='Enter Your Website....'
             onChange={(e)=>setNewWeb(e.target.value)}
            />
            </td>

            <td>
            <InputGroup 
             value={NewPhone}
             placeholder='Enter Your Phone....'
             onChange={(e)=>setNewPhone(e.target.value)}
            />
            </td>
            <td>
                <Button intent='success' onClick={changevalues}>Submit</Button>
            </td>
        </tr>
         
     </table>
    </>
   )
}
export default App;
