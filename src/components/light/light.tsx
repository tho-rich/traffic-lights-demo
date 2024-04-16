import React, { useCallback, useEffect, useState } from 'react';
import { AnyStateMachine, StateFrom } from 'xstate';
import './light.css';

type LightProps = {
  type: string;
  machineId: string;
  machineState: StateFrom<AnyStateMachine>;
};

type State = { [key: string]: string };

const Light: React.FC<LightProps> = ({ type, machineId, machineState }) => {
  const classNames = 'light ' + type;

  const [classes, setClasses] = useState(classNames);

  const getClassNamesWithActive = useCallback(
    (classNames: string) => {
      //console.log(machineState.value);
      const typeState: State = {};
      typeState[machineId] = type;
      const redYellowState: State = {};
      redYellowState[machineId] = 'redYellow';
      const waitForGoState: State = {};
      waitForGoState[machineId] = 'waitForGo';
      const waitForRequestState: State = {};
      waitForRequestState[machineId] = 'waitForRequest';
      const waitForStartState: State = {};
      waitForStartState[machineId] = 'waitForStart';

      if (
        machineState.matches(typeState) ||
        (machineState.matches(redYellowState) &&
          (type === 'red' || type === 'yellow')) ||
        ((machineState.matches(waitForGoState) ||
          machineState.matches(waitForRequestState)) &&
          type == 'red')
      ) {
        return classNames + ' active';
      }

      if (machineState.matches(waitForStartState) && type === 'yellow') {
        return classNames + ' blink';
      }

      return classNames;
    },
    [machineState, type, machineId]
  );

  useEffect(() => {
    //console.log('state:', state);
    setClasses(getClassNamesWithActive(classNames));
  }, [machineState, setClasses, getClassNamesWithActive, classNames]);

  //setClasses(getClassNamesWithActive(classNames));

  return <div className={classes}></div>;
};

export default Light;
