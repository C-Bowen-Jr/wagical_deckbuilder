import {useState} from 'react'

function firstSideName(name) {
    const sides = name.split(" // ");

    if(sides[1] === undefined) {
        return name;
    }
    return sides[0] + `\u{293b}`;
}

function drawMana(costs) {
    // Draws colored mana cost circles, then writes the colorless cost number
    // TODO: add mana symbols onto circles
    const circles = [];
    // Negate double sided costs (ie Young Blue Dragon)
    const cost = costs.split(" // ")[0];
    const manaSymbols = cost.match(/\{([X\d+]|[WUBRGC](\/P)?)\}/g); // Regex to match mana symbols
  
    if (manaSymbols) {
      // Reverse symbol collection, push will reverse the list (restoring order)
      manaSymbols.reverse().forEach((costSymbol, index) => {
        // Strip '{}'
        const symbol = costSymbol.replace(/\{|\}/g, "");
   
        // Convert WUBRG letters into SVG named colors (maybe exact hex values later?)
        const color = symbol.includes('W') ? 'ivory' : symbol.includes('R') ? 'lightcoral' : symbol.includes('G') ? 'darkseagreen' : symbol.includes('U') ? 'skyblue' : 'darkgrey';
        const cx = 660 - index * 46; // Adjust the x position based on index
        circles.push(<circle key={index} cx={cx} cy="42" r="20" fill={color} filter="url(#shadow)" />);

        // Psuedo Mana Symbols on circles
        if (symbol.includes('P')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-14} y="55">{`\u03D5`}</text>)
        }
        else if (symbol.includes('W')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-16} y="55">{`\u2600`}</text>)
        }
        else if (symbol.includes('U')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-14} y="55">{`\u2602`}</text>)
        }
        else if (symbol.includes('B')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-10} y="55">{`\u2620`}</text>)
        }
        else if (symbol.includes('R')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-16} y="55">{`\u2668`}</text>)
        }
        else if (symbol.includes('G')) {
            circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-14} y="55">{`\u2618`}</text>)
        }
        else 
  
        // Not swamp, but uses dark grey is X or #
        if(!symbol.includes('B') && color === 'darkgrey') {
          circles.push(<text key={index+10} fill="black" font-size="38" font-family="Ariel" x={cx-12} y="55">{symbol}</text>);
        }
      });
    }
  
    return circles;
  }
  function CardTitle(props) {
    const [cardName, setCardName] = useState("Card Name")
    const [manaCost, setManaCost] = useState("{0}")
    const [fromSet, setFromSet] = useState("No Set")

    const card = props.cardResult;
  
    return (
      <span className="card-title" onClick={props.click}>
        <svg height="84" width="700" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" width="92" height="96">
                <feOffset in="SourceAlpha" dx="-2" dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feBlend in="SourceGraphic" in2="blurOut" />
            </filter>
          </defs>
    
           <rect id="card" x="10" y="10" width="682" height="64" stroke="black" stroke-width="2" fill="#e5e5e5" rx="12" ry="32" filter="url(#shadow)" />
    
          {drawMana(card ? card.mana_cost : manaCost)}
    
          <text fill="black" font-size="42" transform="scale(0.89,1.1)" stroke="black" stroke-wide="0.1" font-family="Matrix" x="24" y="52">{card ? firstSideName(card.name) : cardName}</text>
        </svg>
        <div className="card-image">
            <img src={card.thumbnail} alt={card.set} />
        </div>
      </span>
    )
  }
  
  export default CardTitle