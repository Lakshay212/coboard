import { useState } from 'react'
import { useEffect } from 'react'
import { getBoard,createBoard } from '../api/boards'
import { getLists,createList} from '../api/lists'
import { useNavigate,useParams } from 'react-router-dom'
import List from '../components/List'
import Navbar from '../components/Navbar'
import '../styles/boards.css'
import { DragDropContext } from '@hello-pangea/dnd'
import { updateCardList } from '../api/cards'




function Board() {
  const [lists, setLists] =useState([])
  const [listName, setListName] = useState('')
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
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
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    
    if (!destination) return
    
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return
    
    console.log('moved card', draggableId, 
      'from list', source.droppableId, 
      'to list', destination.droppableId)
    await updateCardList(Number(draggableId), Number(destination.droppableId))
    setRefreshKey(prev => prev + 1);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='Lists'>
          {lists.map((list) => (
            <List key={`${list.id}-${refreshKey}`} list={list} />
          ))}
        </div>
      </DragDropContext>

    </div>
  )
}

export default Board