import "../Css/Startpage.css";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { motion } from "framer-motion";

function StartPage() {

    const navigate = useNavigate();
  const modes = [
    {
      icon: <KeyboardIcon fontSize="large" />,
      title: "Typing Practice",
      description: "Build speed and accuracy with customized typing drills tailored to your skill level.",
    },
    {
      icon: <SportsEsportsIcon fontSize="large" />,
      title: "Competitive Mode",
      description: "Race against real players in live typing battles. Climb the leaderboard and win badges!",
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: "Progress Tracker",
      description: "Visualize your progress with WPM charts, error trends, and daily typing goals.",
    },
  ];


  const handleStart=()=>{

    navigate('/gamePage');
  }

  return (
    <section className="Main left-15">
      <div className="top">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <h1 className="title">Welcome to Typerr</h1>
          <p className="subtitle">
            Your personal space to practice, compete, and improve your typing speed and accuracy — whether you're just starting out or chasing that 150 WPM badge.
          </p>
          <button className="start-btn" onClick={handleStart}>Start Typing</button>
        </motion.div>

        <div className="mode-cards">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              className="mode-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="custom-card">
                <div className="card-icon">{mode.icon}</div>
                <h3 className="card-title">{mode.title}</h3>
                <p className="card-desc">{mode.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StartPage;
