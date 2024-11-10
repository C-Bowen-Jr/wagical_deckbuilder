import { useState } from 'react'

// ?= operator not yet JS approved
//const [error, data] ?= fetch('https://api.scryfall.com/cards/named?fuzzy=rats').json()

function simplyType(fullType) {
    const removedSubtype = fullType.split(" — ")[0];
    const removedSupertype = removedSubtype.replace(/^(Legendary |Basic |Snow )/, '');

    return removedSupertype;
}

function SearchCard({ onSearch }) {
  const [cardName, setCardName] = useState("")
  
  const handleSubmit = (event) => {
    event.preventDefault();
    scryfallSearch(cardName);
  }

  async function scryfallSearch(searchCardName) {
    //const url = `https://api.scryfall.com/cards/named?fuzzy=${searchCardName}`
    const url = `https://api.scryfall.com/cards/search?q=${searchCardName}&unique=cards`

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Error response: ${response.status}`)
        }

        const foundCards = await response.json();
        const cardsSimplified = [];
        
        foundCards.data.forEach((foundCard) => {
          const cardSimplified = {
              name: foundCard.name,
              mana_cost: foundCard.mana_cost,
              type: simplyType(foundCard.type_line),
              thumbnail: foundCard.image_uris["normal"],
              set: foundCard.set.toUpperCase(),
          }
          cardsSimplified.push(cardSimplified);
        });

        onSearch(cardsSimplified);
    } catch (error) {
        alert(error.message)
    }
}
  return (
    <form onSubmit={handleSubmit}>
        <label>Search by card name:
        <input
          type="text"
          value={cardName}
          placeholder="Search card name..."
          onChange={(e) => setCardName(e.target.value)} />
        </label>
        <input type="submit" />
    </form>
  )
}

export default SearchCard
