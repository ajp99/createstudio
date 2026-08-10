'use client';

import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export default function ElasticPressComponent() {
  const [isPressed, setIsPressed] = useState(false);

  const springStyle = useSpring({
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Elastic Press</h2>

      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
        <animated.button
          style={springStyle}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 active:shadow-inner"
        >
          Press Me
        </animated.button>
      </div>

      <p className="text-sm text-slate-600">
        Click and hold the button to see it compress with an elastic spring animation using react-spring.
      </p>
    </div>
  );
}
