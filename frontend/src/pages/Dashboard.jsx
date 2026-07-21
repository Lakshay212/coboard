import { useState } from 'react'
import { useEffect } from 'react'
// import { useParams } from "react-router";
import { getBoard,createBoard } from '../api/boards'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/dashboard.css'





function DashBoard() {
  const [boards, setBoards] =useState([])
  const [boardName, setBoardName] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchBoards=async ()=>{
      const data=await getBoard();
      setBoards(data.boards)
    }
    fetchBoards()
  },[])
  const handleCreate = async () => {
    if(boardName.trim()==''){return;}
    await createBoard(boardName)
    const data=await getBoard();
    setBoards(data.boards)
    console.log(boardName)
    setBoardName('')
  }
  return (
    <div>
       <Navbar />
        <div>
            <h1 className='heading'>DashBoard</h1>
        </div>
        <div className='takingInput'>
          <div className='inputWrapper'>

            <input type="text" className='textInput' id="boardName" placeholder='Enter the name of Board' value={boardName} onChange={(e)=> setBoardName(e.target.value)}></input>
            <button className='addingBoard'  onClick={handleCreate}>Add</button>
          </div>
        </div>
        <div className='boards'>
            {boards.map((board) => (
            <div className='board' key={board.id} onClick={() => navigate(`/board/${board.id}`)}>
                <h3>{board.name}</h3>
            </div>
            ))}
        
        </div>
    </div>
    

  )
}

export default DashBoard