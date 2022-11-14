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
    console.log(window);

    const Gyroscope: any = window.Gyroscope;

    console.log(Gyroscope);

    let gyroscope = new Gyroscope({ frequency: 60 });

    gyroscope.addEventListener('reading', (e: any) => {
      console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
      console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
      console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
    });
    gyroscope.start();

    document.body.addEventListener('pointermove', onMouseMove);
    // document.body.addEventListener('devicemotion', onDeciveMove);

    return () => {
      document.body.removeEventListener('pointermove', onMouseMove);
      // document.body.removeEventListener('devicemotion', onDeciveMove);
    }
  }, []);

  // useEffect(() => {
  //   console.log(gyroscope);
  // }, [gyroscope]);

  // function onDeciveMove(data: any) {
  //   console.log(data);
  // }

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
