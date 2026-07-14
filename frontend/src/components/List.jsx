import { useState } from 'react'
import { useEffect } from 'react'
import { getCards,createCard} from '../api/cards'


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
    <div>
      <div>
        <h1>{list.title}</h1>
      </div>

      <div>
        <input type="text" id="cardname" placeholder='Enter the name of card' value={cardName} onChange={(e)=> setCardName(e.target.value)}></input>
        <button onClick={handleCreate}>Add</button>
      </div>
      <div>
        {cards.map((card) => (
          <div key={card.id} >
            <h3>{card.title}</h3>
          </div>
        ))}

      </div>

    </div>
  )
}

export default List