import './App.css'
import './Card.css'
import cardImage from '../assets/card.jpg';
import { useEffect } from 'react';
// import * as useGyroscope from 'react-hook-gyroscope';

type OnMouseMoveParams = {
  x: number;
  y: number;
};

function App() {
  // const gyroscope = useGyroscope({
  //   frequency: 60,
  // });

  useEffect(() => {
    const Gyroscope: any = window.Gyroscope;

    let gyroscope = new Gyroscope({ frequency: 60 });

    console.log('gyroscope', gyroscope);

    gyroscope.addEventListener('reading', onDeviceMove);
    gyroscope.start();

    document.body.addEventListener('pointermove', onMouseMove);

    return () => {
      gyroscope.removeEventListener('reading', onDeviceMove);
      gyroscope.stop();
      gyroscope = null;

      document.body.removeEventListener('pointermove', onMouseMove);
      // document.body.removeEventListener('devicemotion', onDeciveMove);
    }
  }, []);

  function onDeviceMove(e: any) {
    console.log(e);
    console.log(`Angular velocity along the X-axis ${e.x}`);
    console.log(`Angular velocity along the Y-axis ${e.y}`);
    console.log(`Angular velocity along the Z-axis ${e.z}`);
  }

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
