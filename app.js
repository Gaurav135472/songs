//  StAuth10244: I Gaurav Patel, 000898120 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const Dice = ({ value, onClick, isRolling }) => {
    const diceImage = `images/${value}.png`; // Display dice image based on the value

    return (
        <div className={`dice ${isRolling ? 'rolling' : ''} mx-2`} onClick={onClick}>
            <img src={diceImage} alt={`Dice showing ${value}`} className="img-fluid" />
        </div>
    );
};

const App = () => {
    const [numDice, setNumDice] = React.useState(1);
    const [numSides, setNumSides] = React.useState(3); // Default to 3-sided dice
    const [diceValues, setDiceValues] = React.useState([1]);
    const [rollingIndices, setRollingIndices] = React.useState([]); // Track rolling state for specific dice

    // Increment number of dice (max 10)
    const handleDiceUp = () => {
        if (numDice < 30) {
            setNumDice((prev) => prev + 1);
            setDiceValues([...diceValues, 1]);
        }
    };

    // Decrement number of dice (min 1)
    const handleDiceDown = () => {
        if (numDice > 1) {
            setNumDice((prev) => prev - 1);
            setDiceValues((prev) => prev.slice(0, prev.length - 1)); // Remove last dice
        }
    };

    // Reset number of dice to 1 and set the value of the dice to 1
    const handleReset = () => {
        setNumDice(1);
        setNumSides(3); // Reset to 3-sided dice
        setDiceValues([1]);
        setRollingIndices([]); // Reset rolling states
    };

    // Increment number of sides (max 6)
    const handleSidesUp = () => {
        if (numSides < 6) {
            setNumSides((prev) => prev + 1);
        }
    };

    // Decrement number of sides (min 1)
    const handleSidesDown = () => {
        if (numSides > 1) {
            setNumSides((prev) => prev - 1);
        }
    };

    // Roll all dice with animation
    const handleRollAll = () => {
        setRollingIndices([...Array(numDice).keys()]); // Set all dice to rolling
        setTimeout(() => {
            const newValues = diceValues.map(() =>
                Math.floor(Math.random() * numSides) + 1
            );
            setDiceValues(newValues);
            setRollingIndices([]); // Stop rolling for all dice
        }, 1000); // Delay added for animation
    };

    // Roll a specific dice
    const handleDiceClick = (index) => {
        setRollingIndices([index]); // Set the clicked dice to rolling
        setTimeout(() => {
            const newValues = [...diceValues];
            newValues[index] = Math.floor(Math.random() * numSides) + 1;
            setDiceValues(newValues);
            setRollingIndices([]); // Stop rolling for that dice
        }, 1000); // Delay added for animation
    };

    return (
        <div className="container game-container p-4">
            {/* Top section for controls */}
            <div className="controls text-center mb-4">
                <h1 className="mb-4">Dice Roller Fun!</h1>
                <div className="control-item d-flex justify-content-center align-items-center mb-3">
                    <label className="mr-3">Number of Dice:</label>
                    <span className="counter h4 mx-3">{numDice}</span>
                    <button className="btn btn-success mx-2" onClick={handleDiceUp}>
                        <img src="images/up.png" alt="Increase Dice" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button className="btn btn-danger mx-2" onClick={handleDiceDown}>
                        <img src="images/down.png" alt="Decrease Dice" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button className="btn btn-secondary ml-3" onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <div className="control-item d-flex justify-content-center align-items-center mb-3">
                    <label className="mr-3">Number of Sides:</label>
                    <span className="counter h4 mx-3">{numSides}</span>
                    <button className="btn btn-success mx-2" onClick={handleSidesUp}>
                        <img src="images/up.png" alt="Increase Sides" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button className="btn btn-danger mx-2" onClick={handleSidesDown}>
                        <img src="images/down.png" alt="Decrease Sides" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleRollAll}>
                    Roll All Dice
                </button>
            </div>

            {/* Bottom section for displaying dice */}
            <div className="dice-display d-flex justify-content-center flex-wrap">
                {diceValues.map((value, index) => (
                    <Dice
                        key={index}
                        value={value}
                        isRolling={rollingIndices.includes(index)} // Only roll the clicked dice
                        onClick={() => handleDiceClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
