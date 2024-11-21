import { useState } from 'react'
//import { Input } from "@/components/ui/input"
import CardTitle from './CardTitle.jsx'
import SearchCard from './SearchCard.jsx'
import CardQuantitySelect from './CardQuantitySelect.jsx'
import CardSetSelect from './CardSetSelect.jsx'
import TextFile from './TextFile.jsx'
import './App.css'

// ?= operator not yet JS approved
//const [error, data] ?= fetch('https://api.scryfall.com/cards/named?fuzzy=rats').json()

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [creatureList, setCreatureList] = useState([]);
  const [spellList, setSpellList] = useState([]);
  const [permanentList, setPermanentList] = useState([]);
  const [landList, setLandList] = useState([]);

  const handleSearchResult = (data) => {
    setSearchResult(data);
  }

  const handleAddCard = (thisCard) => {
    if (thisCard.type.includes("Creature")) {
      setCreatureList([...creatureList, thisCard]);
    }
    else if (thisCard.type.includes("Instant") || thisCard.type.includes("Sorcery")) {
      setSpellList([...spellList, thisCard]);
    }
    else if (thisCard.type.includes("Land")) {
      setLandList([...landList, thisCard]);
    }
    else {
      setPermanentList([...permanentList, thisCard]);
    }
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
              <tr> <td></td><td className="card-type">Creatures</td></tr>
              {creatureList.map((eachCard) => {
                return(
                  <tr className="debug">
                    <td><CardQuantitySelect /></td>
                    <td>{eachCard.name}</td>
                    <td>{eachCard.type}</td>
                    <td><CardSetSelect default={eachCard.set} searching={eachCard.name}/></td>
                  </tr>
                )
              })}
              <tr> <td></td><td className="card-type">Permanents</td></tr>
              {permanentList.map((eachCard) => {
                return(
                  <tr className="debug">
                    <td><CardQuantitySelect /></td>
                    <td>{eachCard.name}</td>
                    <td>{eachCard.type}</td>
                    <td><CardSetSelect default={eachCard.set} searching={eachCard.name}/></td>
                  </tr>
                )
              })}
              <tr> <td></td><td className="card-type">Spells</td></tr>
              {spellList.map((eachCard) => {
                return(
                  <tr className="debug">
                    <td><CardQuantitySelect /></td>
                    <td>{eachCard.name}</td>
                    <td>{eachCard.type}</td>
                    <td><CardSetSelect default={eachCard.set} searching={eachCard.name}/></td>
                  </tr>
                )
              })}
              <tr> <td></td><td className="card-type">Lands</td></tr>
              {landList.map((eachCard) => {
                return(
                  <tr className="debug">
                    <td><CardQuantitySelect /></td>
                    <td>{eachCard.name}</td>
                    <td>{eachCard.type}</td>
                    <td><CardSetSelect default={eachCard.set} searching={eachCard.name}/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <TextFile categories={{creatureList, permanentList, spellList, landList}} />
      </div>
      <div className="buffer" />
    </>
  )
}

export default App
