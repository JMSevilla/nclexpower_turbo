import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

type Callback = {
  key: string;
  enabled: boolean;
  unchanged: boolean;
  fn?: AsyncFunction;
};
type State = { enabled: boolean; unchanged: boolean; callbacks: Callback[] };
type InitPayload = Callback;
type TogglePayload = Omit<Callback, "fn">;

type Action =
  | { type: "init"; payload: InitPayload }
  | { type: "toggleCallback"; payload: TogglePayload }
  | { type: "reset" | "enable" | "disable" };

const INITIAL_STATE: State = { enabled: false, unchanged: true, callbacks: [] };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reset":
      return INITIAL_STATE;
    case "init":
      return {
        ...state,
        callbacks: [
          ...state.callbacks.filter((cb) => cb.key !== action.payload.key),
          action.payload,
        ],
      };
    case "toggleCallback": {
      return {
        ...state,
        callbacks: state.callbacks.map((cb) =>
          cb.key === action.payload.key
            ? {
                ...cb,
                enabled: action.payload.enabled,
                unchanged: action.payload.unchanged,
              }
            : cb
        ),
      };
    }
    default:
      throw new Error();
  }
}

const context = createContext<{
  loading: boolean;
  enabled: boolean;
  unchanged: boolean;
  hasCallbacks: () => boolean;
  hasCallback: (key: string) => boolean;
  submit: AsyncFunction;
  reset: VoidFunction;
  init: (payload: Callback) => void;
  initiateLoading: VoidFunction;
  toggleCallback: (payload: {
    enabled: boolean;
    unchanged: boolean;
    key: string;
  }) => void;
}>({} as any);

export const FormSubmissionContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const submitFn = async () => {
    if (!state.callbacks) {
      throw new Error(
        "No form bound to form-submission-action found in this page"
      );
    }
    setLoading(true);
    try {
      await Promise.all(state.callbacks.map((cb) => cb.fn?.()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <context.Provider
      value={useMemo(
        () => ({
          loading,
          enabled: state.callbacks.every((cb) => cb.enabled),
          unchanged: state.callbacks.every((cb) => cb.unchanged),
          toggleCallback: (payload: TogglePayload) =>
            dispatch({ type: "toggleCallback", payload }),
          hasCallbacks: () => !!state.callbacks.length,
          hasCallback: (key) => !!state.callbacks.find((cb) => cb.key === key),
          submit: submitFn,
          reset: () => dispatch({ type: "reset" }),
          initiateLoading: () => setLoading(true),
          init: (payload: InitPayload) => dispatch({ type: "init", payload }),
        }),
        [state, loading]
      )}
    >
      {children}
    </context.Provider>
  );
};

export const useFormSubmissionContext = () => {
  if (!context) {
    throw new Error("FormSubmissionContextProvider should be used");
  }
  return useContext(context);
};
