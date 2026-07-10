import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import {ReactLenis} from 'lenis/react';
import AgendaApp from './AgendaApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ anchors: true }}>
        <AgendaApp />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>,
);
