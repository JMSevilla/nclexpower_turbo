import { ZxcvbnResult, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";

interface Props {
  result: ZxcvbnResult;
}

export function createPasswordLabel(props: Props) {
  const options = {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
  };
  zxcvbnOptions.setOptions(options);
  switch (props.result.score) {
    case 0:
      return "Weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "Weak";
  }
}
