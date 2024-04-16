import { useState } from 'react';
import { useMachine } from '@xstate/react';
import trafficLightsMachine from '@/statemachines/traffic-lights-machine';
import Crossroad from '@components/crossroad/crossroad';
import { Button } from '@mui/material';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [machineState, sendToMachine, actor] = useMachine(trafficLightsMachine);

  return (
    <>
      <div className="header">
        <h1>Traffic Lights Demo</h1>
        <Button
          id="start-button"
          variant="contained"
          disabled={started}
          onClick={() => {
            if (!started) {
              sendToMachine({ type: 'START' });
              setStarted(true);
            }
          }}
        >
          Start
        </Button>
      </div>
      <div className="content">
        <Crossroad machineState={machineState} actor={actor} />
      </div>
    </>
  );
}

export default App;
