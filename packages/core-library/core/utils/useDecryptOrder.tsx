import { config } from "../../config";
import { useExecuteToast } from "../../contexts";
import { useEncryptItem } from "../../contexts/auth/hooks";
import { SelectedProductType } from "../../types/global";
import { Decryption } from "../../utils/Decryption";

export const useDecryptOrder = (): SelectedProductType | undefined => {
  const key = config.value.SECRET_KEY ?? "no-action-key";
  const [getOrderSummaries, , clearSessionItem] = useEncryptItem();
  const decryptedValue = Decryption(getOrderSummaries ?? "", key);
  const { executeToast } = useExecuteToast();

  if (!decryptedValue) {
    return;
  }

  try {
    const parseValue = JSON.parse(decryptedValue);
    return parseValue;
  } catch {
    executeToast("Invalid Order Details", "top-right", false, {
      type: "error",
      toastId: 2,
    });
    clearSessionItem();
  }
};
