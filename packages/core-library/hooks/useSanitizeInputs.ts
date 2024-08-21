import { sanitize, Config } from 'isomorphic-dompurify'


type useSanitizedInputsType = {
    purifyInputs(dirty: string, config?: Config): string | TrustedHTML | DocumentFragment | HTMLElement;
}

export const useSanitizedInputs = ({ config }: { config?: Config }): useSanitizedInputsType => {
    const purifyInputs = (dirty: string) => {
        const clean = sanitize(dirty, { ...config })
        return clean
    }

    return { purifyInputs }
}