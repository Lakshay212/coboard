import { useState } from 'react'
import { useEffect } from 'react'
// import { useParams } from "react-router";
import { getBoard,createBoard } from '../api/boards'
import { useNavigate,useParams } from 'react-router-dom'




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
    await createBoard(boardName)
    const data=await getBoard();
    setBoards(data.boards)
    console.log(boardName)
    setBoardName('')
  }
  return (
    <div>
      <div>
        <h1>DashBoard</h1>
      </div>
      <div>
        <input type="text" id="boardName" placeholder='Enter the name of Board' value={boardName} onChange={(e)=> setBoardName(e.target.value)}></input>
        <button onClick={handleCreate}>Add</button>
      </div>
      <div>
        {boards.map((board) => (
          <div key={board.id} onClick={() => navigate(`/board/${board.id}`)}>
            <h3>{board.name}</h3>
          </div>
        ))}
        
      </div>
    </div>
    

  )
}

export default DashBoard