import { useState } from 'react'
import { useEffect } from 'react'
import { getBoard,createBoard } from '../api/boards'
import { getLists,createList} from '../api/lists'
import { useNavigate,useParams } from 'react-router-dom'
import List from '../components/List'
import Navbar from '../components/Navbar'
import '../styles/boards.css'



function Board() {
  const [lists, setLists] =useState([])
  const [listName, setListName] = useState('')
  const navigate = useNavigate()
  const param=useParams();
  const boardId=param.id;
  useEffect(()=>{
    const fetchLists=async ()=>{
      const data=await getLists(boardId);
      setLists(data.lists)
    }
    fetchLists()
  },[])
  const handleCreate = async () => {
    await createList(boardId,listName)
    const data=await getLists(boardId);
    setLists(data.lists)
    console.log(listName)
    setListName('')
  }
  return (
    <div>
      <Navbar />
      <div>
        <h1 className='heading'>Board</h1>
      </div>

      <div className='ListaddInputs'>
        <input className='AddListname' type="text" id="listName" placeholder='Enter the name of List' value={listName} onChange={(e)=> setListName(e.target.value)}></input>
        <button className='addListbutton' onClick={handleCreate}>Add</button>
      </div>
      <div className='Lists'>
        {lists.map((list) => (
          <List  key={list.id} list={list} />
          // <div key={list.id} >
          //   <h3>{list.title}</h3>
          // </div>
        ))}

      </div>

    </div>
  )
}

export default Board