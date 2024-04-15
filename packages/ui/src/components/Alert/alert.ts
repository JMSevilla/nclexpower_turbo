export enum MessageType {
  Info = "Info",
  Problem = "Problem",
  Success = "Success",
  Warning = "Warning",
  Note = "Note",
}

export const messageRole = (type: MessageType) =>
  ({
    [MessageType.Info]: "note",
    [MessageType.Success]: "note",
    [MessageType.Problem]: "alert",
    [MessageType.Warning]: "alert",
    [MessageType.Note]: "note",
  })[type];
