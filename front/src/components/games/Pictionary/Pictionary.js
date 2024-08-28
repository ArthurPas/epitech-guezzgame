import React, { useEffect, useRef, useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

const Pictionary = () => {
  const canvasRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(10);

  // Utilisez useStompClient pour obtenir le client STOMP
  const stompClient = useStompClient();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasCTX(ctx);

    // Ecouter les événements de dessin via les websockets
    if (stompClient) { // Vérifiez que stompClient est défini
      const subscription = stompClient.subscribe('/topic/draw', (message) => {
        const data = JSON.parse(message.body);
        drawFromSocket(data);
      });

      // Nettoyez l'abonnement quand le composant est démonté
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]); // Dépendance sur stompClient pour réagir à sa disponibilité

  const SetPos = (e) => {
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const Draw = (e) => {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const drawFromSocket = (data) => {
    if (!canvasCTX) return;
    const { x0, y0, x1, y1, color, size } = data;
    canvasCTX.beginPath();
    canvasCTX.moveTo(x0, y0);
    canvasCTX.lineTo(x1, y1);
    canvasCTX.strokeStyle = color;
    canvasCTX.lineWidth = size;
    canvasCTX.lineCap = 'round';
    canvasCTX.stroke();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseEnter={SetPos}
        onMouseMove={Draw}
        onMouseDown={SetPos}
      />
      <div className="controlpanel" style={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
        <input
          type="range"
          value={size}
          max={40}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={() => canvasCTX.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Pictionary;
