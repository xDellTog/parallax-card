import './App.css'
import cardImageFront from '../assets/card-front.jpg';
import cardImageBack from '../assets/card-back.jpeg';
import { useEffect, useState } from 'react';

type OnMouseMoveParams = {
  x: number;
  y: number;
};

function App() {
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    const browserName = getBrowserName();

    let gyroscope: any;
    if (browserName != 'safari') {
      const Accelerometer: any = window.Accelerometer;

      gyroscope = new Accelerometer({ frequency: 30 });

      gyroscope.addEventListener('reading', onDeviceMove);
      gyroscope.start();
    }

    document.body.addEventListener('pointermove', onMouseMove);

    return () => {
      if (browserName != 'safari') {
        gyroscope.removeEventListener('reading', onDeviceMove);
        gyroscope.stop();
        gyroscope = null;
      }

      document.body.removeEventListener('pointermove', onMouseMove);
    }
  }, []);

  function onDeviceMove(e: any) {
    const gyro = e.target;
    const cardEl: any = document.querySelector('.card');

    if (!cardEl) return;

    const ratioX = gyro.x;
    const ratioY = gyro.y;

    cardEl.style.setProperty('--ratio-x', ratioX);
    cardEl.style.setProperty('--ratio-y', ratioY);
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

  function flipCard() {
    const cardEl: Element | null = document.querySelector('.card-inner');

    if (!cardEl) return;

    if (!flipped) {
      cardEl.classList.add('flipped');
    } else {
      cardEl.classList.remove('flipped');
    }
  }

  function getBrowserName(): string {
    let { userAgent } = navigator;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }

    return browserName;
  }

  useEffect(() => {
    flipCard();
  }, [flipped]);

  return (
    <div className="App">
      <div className="card"
        onClick={() => setFlipped(!flipped)}
      >
        <div className="card-inner">
          <div className="card-front">
            <img src={cardImageFront} alt="YuGiOh! Card Front" />
          </div>
          <div className="card-back">
            <img src={cardImageBack} alt="YuGiOh! Card Back" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
