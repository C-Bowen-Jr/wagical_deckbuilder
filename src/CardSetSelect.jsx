import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function CardSetSelect(props) {
  const [inSets, setInSets] = useState([]);  

  const handleLoad = () => {
    scryfallSearch(props.searching);
  }

  async function scryfallSearch(searchCardName) {
    //const url = `https://api.scryfall.com/cards/named?fuzzy=${searchCardName}`
    const url = `https://api.scryfall.com/cards/search?q=${searchCardName}&unique=prints&released=true`

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Error response: ${response.status}`)
        }

        const foundCards = await response.json();
        const sets = [];
        
        foundCards.data.forEach((foundCard) => {
          const set = foundCard.set.toUpperCase();
          sets.push(set);
        });

        setInSets(sets);
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <Box sx={{ minWidth: "5rem" }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Set
        </InputLabel>
        <NativeSelect
          defaultValue={props.default}
          onClick={handleLoad}
          inputProps={{
            name: 'set_code',
            id: 'set_code_select',
          }}
        >
          {inSets.map((eachSet, index) => {
                return(
                  <option key={index} value={eachSet}>{eachSet}</option>
                )
              })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
