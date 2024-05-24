type AsyncFunction<A = unknown, O = unknown> = (...args: A) => Promise<O>;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown
  ? A
  : never;
