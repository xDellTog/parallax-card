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
  useEffect(() => {
    const Gyroscope: any = window.Gyroscope;

    let gyroscope = new Gyroscope({ frequency: 60 });

    gyroscope.addEventListener('reading', onDeviceMove);
    gyroscope.start();

    document.body.addEventListener('pointermove', onMouseMove);
    // document.body.addEventListener('devicemotion', onDeviceMove);

    return () => {
      gyroscope.removeEventListener('reading', onDeviceMove);
      gyroscope.stop();
      gyroscope = null;

      document.body.removeEventListener('pointermove', onMouseMove);
      // document.body.removeEventListener('devicemotion', onDeviceMove);
    }
  }, []);

  function onDeviceMove(e: any) {
    console.log(e);

    // const gyro = e.target;
    // console.log(gyro);
    // const cardEl: any = document.querySelector('.card');

    // if (!cardEl) return;

    // const x = Math.round(gyro.x);
    // const y = Math.round(gyro.y);

    // cardEl.style.transition = "";
    // cardEl.style.transform = "perspective(400px) rotateX(" + y / 2 + "deg) rotateY(" + x / 2 + "deg)";
  }

  function onMouseMove({ x, y }: OnMouseMoveParams) {
    const cardEl: any = document.querySelector('.card');

    if (!cardEl) return;

    const cardBounds = cardEl.getBoundingClientRect();
    const posX = x - cardBounds.x;
    const posY = y - cardBounds.y;
    const ratioX = posX / cardBounds.width;
    const ratioY = posY / cardBounds.height;

    cardEl.style.transition = "";
    cardEl.style.transform = "perspective(400px) rotateX(" + ratioY + "deg) rotateY(" + (-ratioX) + "deg)";
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
