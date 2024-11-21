import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFile(props) {
    const [rawText, setRawText] = useState("#NAME:Unnamed Deck\n#DESC:Wagical Deckbuilder");  

    const handleBuildDeck = () => {
      if(props.categories.creatureList) {
          setRawText(`${rawText}\n# // Creatures //`);
          props.categories.creatureList.map((eachCard) =>{
              setRawText(`${rawText}\n${eachCard.name} (${eachCard.set}) *1`);
          })
        }
    }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="text" 
        variant="outlined" 
        onClick={handleBuildDeck} 
        value={rawText}
        multiline />
    </Box>
  );
}