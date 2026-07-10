import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import {ReactLenis} from 'lenis/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ anchors: true }}>
        <App />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>,
);
