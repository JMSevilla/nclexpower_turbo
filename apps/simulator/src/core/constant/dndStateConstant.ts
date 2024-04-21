const itemTypes = {
    FIRST: "Action To Take",
    SECOND: "Potential Condition",
    Third: "Parameters To Monitor"
  };

  export const dropContainers = [
    { accepts: [itemTypes.FIRST], text: "Action To Take", container: "ActionToTake1" },
    { accepts: [itemTypes.FIRST], text: "Action To Take", container: "ActionToTake2" },
    { accepts: [itemTypes.SECOND], text: "Condition Most Likely Experiencing", container: "PotentialCondition" },
    { accepts: [itemTypes.Third], text: "Parameter To Monitor", container: "ParameterToMonitor1" },
    { accepts: [itemTypes.Third], text: "Parameter To Monitor", container: "ParameterToMonitor2" },
  ]

  export const initialContainerState= {
    "ActionToTake1": [],
    "ActionToTake2": [],
    "PotentialCondition": [],
    "ParameterToMonitor1": [],
    "ParameterToMonitor2": []
  };