import './App.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer';
import React from 'react';
import { initGameState } from './constants';
import AppContext from './contexts/Context';
import pauseIcon from './assets/pause.svg';
import playIcon from './assets/play.svg';

function App() {
    const [appState, dispatch] = React.useReducer(reducer, initGameState);
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        audioRef.current = new Audio('/L-Theme.mp3');

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    const togglePlayPause = React.useCallback(() => {
        if (audioRef.current) {
            const { current } = audioRef;
            current.paused ? current.play() : current.pause();
            setIsPlaying(prev => !prev);
        }
    }, []);

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            <div className="App">
                <Board />
                <button className="play-pause" onClick={togglePlayPause}>
                    {isPlaying ? <img src={pauseIcon} alt="Pause" /> : <img src={playIcon} alt="Play" />}
                </button>
            </div>
        </AppContext.Provider>
    );
}

export default App;

