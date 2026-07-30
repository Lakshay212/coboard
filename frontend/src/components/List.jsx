import { useState } from 'react'
import { useEffect } from 'react'
import { getCards,createCard} from '../api/cards'
import '../styles/list.css'



function List({list}) {
  const [cards, setCards] =useState([])
  const [cardName, setCardName] = useState('')
  
  useEffect(()=>{
    const fetchCards=async ()=>{
      const data=await getCards(list.id);
      setCards(data.cards)
    }
    fetchCards()
  },[])
  const handleCreate = async () => {
    await createCard(list.id,cardName)
    const data=await getCards(list.id);
    setCards(data.cards)
    console.log(cardName)
    setCardName('')
  }
  return (
    <div className='list'>
      <div>
        <h1 className='ListTitle'>{list.title}</h1>
      </div>

      <div className='takingCardinput'>
        <input className='Cardinput' type="text" id="cardname" placeholder='Enter the name of card' value={cardName} onChange={(e)=> setCardName(e.target.value)}></input>
        <button className='Addcard' onClick={handleCreate}>Add</button>
      </div>
      <div className='cards'>
        {cards.map((card) => (
          <div className='card' key={card.id} >
            <h3>{card.title}</h3>
          </div>
        ))}

      </div>

    </div>
  )
}

export default List