import { raise, stateIn, not, createMachine } from 'xstate';

const pedestrianLightStates = {
  id: 'ped',
  initial: 'waitForStart',
  states: {
    waitForStart: {
      on: {
        START: {
          target: 'waitForRequest',
        },
      },
    },
    waitForRequest: {
      on: {
        PED_REQUEST: 'waitForGo',
      },
    },
    waitForGo: {
      on: {
        PED_GO: 'red',
      },
    },
    red: {
      after: {
        RED_TIMER: 'green',
      },
    },
    green: {
      after: {
        GREEN_TIMER: 'waitForRequest',
      },
      exit: [raise({ type: 'MAIN_GO' })],
    },
  },
};

const minorStreetLightStates = {
  id: 'minor',
  initial: 'waitForStart',
  states: {
    waitForStart: {
      on: {
        START: {
          target: 'waitForGo',
        },
      },
    },
    waitForGo: {
      entry: raise({ type: 'PED_GO' }),
      on: {
        MINOR_GO: {
          guard: not(stateIn({ ped: 'waitForGo' })),
          target: 'red',
        },
      },
    },
    red: {
      after: {
        RED_TIMER: 'redYellow',
      },
    },
    redYellow: {
      after: {
        RED_YELLOW_TIMER: 'green',
      },
    },
    green: {
      after: {
        GREEN_TIMER: 'yellow',
      },
    },
    yellow: {
      after: {
        YELLOW_TIMER: 'waitForGo',
      },
      exit: [raise({ type: 'MAIN_GO' })],
    },
  },
};

const mainStreetLightStates = {
  id: 'main',
  initial: 'waitForStart',
  states: {
    waitForStart: {
      on: {
        START: {
          target: 'green',
        },
      },
    },
    waitForGo: {
      entry: raise({ type: 'PED_GO' }),
      on: {
        MAIN_GO: {
          guard: not(stateIn({ ped: 'waitForGo' })),
          target: 'red',
        },
      },
    },
    red: {
      after: {
        RED_TIMER: 'redYellow',
      },
    },
    redYellow: {
      after: {
        RED_YELLOW_TIMER: 'green',
      },
    },
    green: {
      after: {
        GREEN_TIMER: 'yellow',
      },
    },
    yellow: {
      after: {
        YELLOW_TIMER: 'waitForGo',
      },
      exit: [raise({ type: 'MINOR_GO' })],
    },
  },
};

const trafficLightsMachine = createMachine({
  id: 'trafficLights',
  type: 'parallel',
  states: {
    main: mainStreetLightStates,
    minor: minorStreetLightStates,
    ped: pedestrianLightStates,
  },
}).provide({
  delays: {
    RED_TIMER: 2000,
    RED_YELLOW_TIMER: 2000,
    GREEN_TIMER: 5000,
    YELLOW_TIMER: 1000,
  },
});

export default trafficLightsMachine;
