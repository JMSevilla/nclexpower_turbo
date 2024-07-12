import { config } from 'core-library/config'
import { useExecuteToast } from 'core-library/contexts'
import { useEncryptItem } from 'core-library/contexts/auth/hooks'
import { SelectedProductType } from 'core-library/types/global'
import { Decryption } from 'core-library/utils/Decryption'

export const useDecryptOrder = (): SelectedProductType | undefined => {
    const key = config.value.SECRET_KEY ?? "no-action-key"
    const [getOrderSummaries, , clearSessionItem] = useEncryptItem();
    const decryptedValue = Decryption(getOrderSummaries ?? "", key)
    const { executeToast } = useExecuteToast()


    if (!decryptedValue) {
        return
    }

    try {
        const parseValue = JSON.parse(decryptedValue)
        return parseValue
    } catch {
        executeToast("Invalid Order Details", "top-right", false, { type: 'error', toastId: 2 })
        clearSessionItem()
    }


}
