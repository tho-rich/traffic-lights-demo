import { AnyActor, AnyStateMachine, StateFrom } from 'xstate';
import TrafficLight from '@components/traffic-light/traffic-light';
import './crossroad.css';

type CrossroadProps = {
  machineState: StateFrom<AnyStateMachine>;
  actor: AnyActor;
};

const Crossroad: React.FC<CrossroadProps> = ({ machineState, actor }) => {
  return (
    <div className="crossroad">
      <div className="street vertical"></div>
      <div className="streetcross left"></div>
      <div className="streetcross right"></div>
      <div className="street horizontal"></div>
      <div className="pedestrian"></div>

      <TrafficLight
        type="street"
        offsetX={-6}
        offsetY={-10}
        rotation={90}
        machineId="main"
        machineState={machineState}
        actor={actor}
      ></TrafficLight>
      <TrafficLight
        type="street"
        offsetX={6}
        offsetY={6}
        rotation={0}
        machineId="minor"
        machineState={machineState}
        actor={actor}
      ></TrafficLight>
      <TrafficLight
        type="pedestrian"
        offsetX={20}
        rotation={0}
        offsetY={-15}
        machineId="ped"
        machineState={machineState}
        actor={actor}
      ></TrafficLight>
    </div>
  );
};

export default Crossroad;
