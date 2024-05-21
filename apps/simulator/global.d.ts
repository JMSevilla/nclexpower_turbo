type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown
  ? A
  : never;
