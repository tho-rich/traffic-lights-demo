import React from 'react';
import { AnyActor, AnyStateMachine, StateFrom } from 'xstate';
import Light from '@components/light/light';
import { Radio } from '@mui/material';
import './traffic-light.css';

type TrafficLightProps = {
  type: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  machineId: string;
  machineState: StateFrom<AnyStateMachine>;
  actor: AnyActor;
};

type State = { [key: string]: string };

const TrafficLight: React.FC<TrafficLightProps> = ({
  type,
  offsetX,
  offsetY,
  rotation,
  machineId,
  machineState,
  actor,
}) => {
  function showYellowLight(
    type: string,
    machineId: string,
    machineState: StateFrom<AnyStateMachine>
  ) {
    if (type == 'street') {
      return (
        <Light
          type="yellow"
          machineId={machineId}
          machineState={machineState}
        ></Light>
      );
    }
  }

  function handleChange() {
    actor.send({ type: 'PED_REQUEST' });
  }

  function isChecked() {
    const waitForRequestState: State = {};
    waitForRequestState[machineId] = 'waitForRequest';

    return !machineState.matches(waitForRequestState);
  }

  function showButton(type: string) {
    if (type === 'pedestrian') {
      return (
        <div className="pedestrian-button">
          <Radio
            onChange={handleChange}
            checked={isChecked()}
            disabled={isChecked()}
          />
        </div>
      );
    }
  }

  return (
    <div
      className="traffic-light-wrapper"
      style={{
        marginLeft: offsetX + 'rem',
        marginTop: offsetY + 'rem',
        rotate: rotation + 'deg',
      }}
    >
      <div className="traffic-light">
        <Light
          type="red"
          machineId={machineId}
          machineState={machineState}
        ></Light>
        {showYellowLight(type, machineId, machineState)}
        <Light
          type="green"
          machineId={machineId}
          machineState={machineState}
        ></Light>
      </div>
      {showButton(type)}
    </div>
  );
};

export default TrafficLight;
