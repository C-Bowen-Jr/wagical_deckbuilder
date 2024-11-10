import { useState } from 'react'
//import { Input } from "@/components/ui/input"
import CardTitle from './CardTitle.jsx'
import SearchCard from './SearchCard.jsx'
import './App.css'

// ?= operator not yet JS approved
//const [error, data] ?= fetch('https://api.scryfall.com/cards/named?fuzzy=rats').json()

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [deckList, setDeckList] = useState([]);

  const handleSearchResult = (data) => {
    setSearchResult(data);
  }

  const handleAddCard = (thisCard) => {
    console.log(thisCard);
    setDeckList([...deckList, thisCard]);
  }

  return (
    <>
      <div className="searchbar">
        <SearchCard onSearch={handleSearchResult}/>
      </div>
      <div className="field">
        <div className="searchresults">
          {searchResult.map((eachResult) => {
            return(
              <CardTitle click={() => handleAddCard(eachResult)} cardResult={eachResult}></CardTitle>
            )
          })}
        </div>
        <div className="deck">
          <table>
            <thead>
              <tr>
                <th>Qty</th>
                <th>Name</th>
                <th>Type</th>
                <th>Set</th>
              </tr>
            </thead>
            <tbody>
              {deckList.map((eachCard) => {
                return(
                  <tr>
                    <td>{'\u2460'}</td>
                    <td>{eachCard.name}</td>
                    <td>{eachCard.type}</td>
                    <td>{eachCard.set}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="buffer" />
    </>
  )
}

export default App
