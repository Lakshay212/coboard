import { useState } from 'react'
import { useEffect } from 'react'
import { getCards, createCard } from '../api/cards'
import '../styles/list.css'
import { Droppable, Draggable } from '@hello-pangea/dnd'

function List({ list }) {
  const [cards, setCards] = useState([])
  const [cardName, setCardName] = useState('')

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getCards(list.id)
      setCards(data.cards)
    }
    fetchCards()
  }, [])

  const handleCreate = async () => {
    await createCard(list.id, cardName)
    const data = await getCards(list.id)
    setCards(data.cards)
    setCardName('')
  }

  return (
    <div className='list'>
      <h1 className='ListTitle'>{list.title}</h1>

      <div className='takingCardinput'>
        <input
          className='Cardinput'
          type="text"
          placeholder='Enter the name of card'
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <button className='Addcard' onClick={handleCreate}>Add</button>
      </div>

      <Droppable droppableId={String(list.id)}>
        {(provided) => (
          <div
            className='cards'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={String(card.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    className='card'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {card.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default List