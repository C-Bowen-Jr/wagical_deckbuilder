import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFile(props) {
    const [rawText, setRawText] = useState("Double click here to generate");  

    // Each card type group gets a comment line descriptor, then writes the card entry
    // TODO solve for getting quantity to pass through
    // Formatted pretty allowing 34 characters (longest mtg name is 31) so quantity forms
    // a nice vertical column
    const handleBuildDeck = () => {
        let textBuilder = "#NAME:Unnamed Deck\n#DESC:Wagical Deckbuilder\n";
        if(props.categories.creatureList) {
          textBuilder +=`\n# // Creatures //\n`;
          props.categories.creatureList.map((eachCard) =>{
              const spacing = 34 - eachCard.name.length;
              textBuilder +=`${eachCard.name} (${eachCard.set}) ${" ".repeat(spacing)}*1\n`;
          })
        }
        if(props.categories.permanentList) {
            textBuilder += `\n# // Permanents //\n`;
            props.categories.permanentList.map((eachCard) =>{
                const spacing = 34 - eachCard.name.length;
                textBuilder += `${eachCard.name} (${eachCard.set}) ${" ".repeat(spacing)}*1\n`;
            })
          }
        if(props.categories.spellList) {
            textBuilder += `\n# // Spells //\n`;
            props.categories.spellList.map((eachCard) =>{
                const spacing = 34 - eachCard.name.length;
                textBuilder += `${eachCard.name} (${eachCard.set}) ${" ".repeat(spacing)}*1\n`;
            })
          }
        if(props.categories.landList) {
            textBuilder += `\n# // Lands //\n`;
            props.categories.landList.map((eachCard) =>{
                const spacing = 34 - eachCard.name.length;
                textBuilder += `${eachCard.name} (${eachCard.set}) ${" ".repeat(spacing)}*1\n`;
            })
          }
        setRawText(textBuilder);
    }
    const handleResetDeck = () => {
        setRawText("Double click here to generate");
    }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, minWidth: "600px", fontFamily: "monospace"} }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="text" 
        variant="outlined" 
        onDoubleClick={handleBuildDeck} 
        value={rawText}
        multiline />
        <button onClick={handleResetDeck}>Clear Decklist</button>
    </Box>
  );
}