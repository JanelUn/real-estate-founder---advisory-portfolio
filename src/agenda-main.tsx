import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import {ReactLenis} from 'lenis/react';
import AgendaApp from './AgendaApp.tsx';
import {isEmbedMode} from './lib/embed';
import './index.css';

// El smooth-scroll de Lenis intercepta el wheel con preventDefault, lo que
// puede "atrapar" el scroll dentro del iframe cuando esto vive embebido en
// otra página. En modo embed lo saltamos y dejamos que el scroll lo maneje
// el documento anfitrión con normalidad.
function AgendaRoot() {
  if (isEmbedMode()) {
    return <AgendaApp />;
  }
  return (
    <ReactLenis root options={{ anchors: true }}>
      <AgendaApp />
    </ReactLenis>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AgendaRoot />
    </MotionConfig>
  </StrictMode>,
);
