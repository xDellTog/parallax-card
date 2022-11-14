import './App.css'
import './Card.css'
import cardImage from '../assets/card.jpg';
import { useEffect } from 'react';

type OnMouseMoveParams = {
  x: number;
  y: number;
};

function App() {
  useEffect(() => {
    document.body.addEventListener('pointermove', onMouseMove);

    return () => {
      document.body.removeEventListener('pointermove', onMouseMove);
    }
  }, []);

  function onMouseMove({ x, y }: OnMouseMoveParams) {
    const cardEl: any = document.querySelector('.card');

    if (!cardEl) return;

    const cardBounds = cardEl.getBoundingClientRect();
    const posX = x - cardBounds.x;
    const posY = y - cardBounds.y;
    const ratioX = posX / cardBounds.width;
    const ratioY = posY / cardBounds.height;
    cardEl.style.setProperty('--ratio-x', ratioX);
    cardEl.style.setProperty('--ratio-y', ratioY);
  }

  return (
    <div className="App">
      <div className="card">
        <img src={cardImage} alt="YuGiOh! Card" />
      </div>
    </div>
  )
}

export default App
