export const itemTypes = {
  FIRST: "Action To Take",
  SECOND: "Potential Condition",
  THIRD: "Parameters To Monitor"
} as const;

export type ItemTypesKeys = keyof typeof itemTypes;

export const dropContainers = [
  { accepts: [itemTypes.FIRST], text: "Action To Take", container: "ActionToTake1", background: "bg-[#BCE4E4]" },
  { accepts: [itemTypes.FIRST], text: "Action To Take", container: "ActionToTake2", background: "bg-[#BCE4E4]" },
  { accepts: [itemTypes.SECOND], text: "Condition Most Likely Experiencing", container: "PotentialCondition", background: "bg-[#6DCFF6]" },
  { accepts: [itemTypes.THIRD], text: "Parameter To Monitor", container: "ParameterToMonitor1", background: "bg-[#E0E0DF]" },
  { accepts: [itemTypes.THIRD], text: "Parameter To Monitor", container: "ParameterToMonitor2", background: "bg-[#E0E0DF]" },
]

export const initialContainerState = {
  "ActionToTake1": [],
  "ActionToTake2": [],
  "PotentialCondition": [],
  "ParameterToMonitor1": [],
  "ParameterToMonitor2": []
};