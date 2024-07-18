import { sanitize, Config } from 'isomorphic-dompurify'


type useSanitizedInputsType = {
    purifyInputs(dirty: string, config?: Config): string | HTMLElement | DocumentFragment;
}

export const useSanitizedInputs = (): useSanitizedInputsType => {
    const purifyInputs = (dirty: string, config?: Config) => {
        const clean = sanitize(dirty, { ...config, ALLOWED_TAGS: ['#text'] })
        return clean
    }

    return { purifyInputs }
}