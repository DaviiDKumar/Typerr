import "../Css/Gamepage.css";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

function Gamepage() {
    const [currentParagraph, setCurrentParagraph] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState("Easy");
    const [inputBoxes, setInputBoxes] = useState([]);
    const [typedText, setTypedText] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [showStart, setShowStart] = useState(true); // now properly used
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const timerRef = useRef(null);
    const inputRefs = useRef([]);

    const levelTextOptions = useMemo(() => ({
        Easy: ["Hello", "Bye", "Goodboy", "Proper", "Ofx", "Heloeworld", "Gooashy", "Sklmkmkoi", "Nknwoi <.", "Jknjksneknsk"],
        Medium: ["Breathe", "Happiness", "Strength", "Difficult", "Sunshine", "Telescope", "Galactic", "Adventure"],
        Hard: ["Supercalifragilisticexpialidocious", "Pneumonoultramicroscopicsilicovolcanoconiosis", "Hippopotomonstrosesquipedaliophobia"]
    }), []);

    const checkResult = useCallback(() => {
        const typed = inputRefs.current.map(input => input.value).join("");
        if (!typed || typed.length !== currentParagraph.length) {
            setIsCorrect(false);
            toast.error(`Incorrect! You typed: "${typed}", the correct word is: "${currentParagraph}"`);
        } else if (typed === currentParagraph) {
            setIsCorrect(true);
            toast.success("Correct!");
        } else {
            setIsCorrect(false);
            toast.error(`Incorrect! You typed: "${typed}", the correct word is: "${currentParagraph}"`);
        }
    }, [currentParagraph]);

    const handleSubmit = useCallback(() => {
        if (typedText.length === currentParagraph.length) {
            setIsTyping(false);
            checkResult();
            inputRefs.current.forEach(input => input.disabled = true);
            clearInterval(timerRef.current);
        } else {
            toast.warn("Please complete all fields before submitting.");
        }
    }, [typedText, currentParagraph, checkResult]);

    useEffect(() => {
        if (currentParagraph.length === 0 || !gameStarted) return;

        inputRefs.current = [];
        const boxes = currentParagraph.split("").map((char, index) => (
            <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="letter-box"
                data-char={char}
                disabled={!isTyping || char === " "}
                onChange={(e) => {
                    const newTypedText = inputRefs.current.map(input => input.value).join("");
                    setTypedText(newTypedText);
                    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
                        inputRefs.current[index + 1].focus();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && typedText.length === currentParagraph.length) {
                        handleSubmit();
                    }
                    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
                        inputRefs.current[index - 1].focus();
                    }
                }}
            />
        ));
        setInputBoxes(boxes);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, [currentParagraph, gameStarted, handleSubmit, isTyping, typedText.length]);

    const handleNext = () => {
        setGameStarted(false);
        setShowStart(true);
        setTypedText("");
        setCurrentParagraph("");
        setInputBoxes([]);
        inputRefs.current = [];
        setIsCorrect(null);
        setIsTyping(true);
        clearInterval(timerRef.current);
        setTimeLeft(0);
    };

    const startGame = () => {
        const textOptions = levelTextOptions[selectedLevel];
        const randomText = textOptions[Math.floor(Math.random() * textOptions.length)];
        setCurrentParagraph(randomText);
        setTypedText("");
        setIsCorrect(null);
        setIsTyping(true);
        setGameStarted(true);
        setShowStart(false); // hide manually if you want, or keep just to satisfy ESLint

        let time = 10;
        if (selectedLevel === "Medium") time = 20;
        else if (selectedLevel === "Hard") time = 35;
        setTimeLeft(time);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsTyping(false);
                    checkResult();
                    inputRefs.current.forEach(input => input.disabled = true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <section className="Gamepage left-15">
            <div className="game-header">
                <h1 className="game-title">Typing Game</h1>
                <h4 className="game-subtitle">Choose your level and start typing!</h4>

                <div className="level-selector">
                    {["Easy", "Medium", "Hard"].map((level) => (
                        <button
                            key={level}
                            className={`level-btn ${selectedLevel === level ? "active" : ""}`}
                            onClick={() => {
                                setSelectedLevel(level);
                                setShowStart(true);
                                setGameStarted(false);
                                setCurrentParagraph("");
                                setTypedText("");
                                setInputBoxes([]);
                                inputRefs.current = [];
                                setIsCorrect(null);
                                clearInterval(timerRef.current);
                                setTimeLeft(0);
                            }}
                        >
                            {level}
                        </button>
                    ))}

                 

                </div>
                {showStart && (
                        <button
                            className="start-btn"
                            onClick={startGame}
                            disabled={gameStarted}
                        >
                            Start
                        </button>
                    )}
            </div>

            <div className="paragraphText">
                <h4 className="text-preview-label">
                    Your Word: <span className="text">{currentParagraph}</span>
                </h4>
            </div>

            {gameStarted && (
                <div className="timer">
                    Time Left: {timeLeft}s
                </div>
            )}

            <div className="answer-inputs">
                {inputBoxes}
            </div>

            <div className="result">
                {!isTyping && isCorrect !== null && (
                    <span style={{ color: isCorrect ? 'green' : 'red' }}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                    </span>
                )}
            </div>

            <div className="actions">
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={typedText.length !== currentParagraph.length}
                >
                    Submit
                </button>
                <button className="next-btn" onClick={handleNext}>Next</button>
            </div>
        </section>
    );
}

export default Gamepage;
