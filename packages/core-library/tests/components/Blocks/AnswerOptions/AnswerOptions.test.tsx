import { FormProvider, useForm } from 'react-hook-form';
import { AnswerOptions, AnswerOptionsType } from '../../../../components'
import { render, renderHook, screen } from '../../../common'

jest.mock("../../../../config", () => ({
    getConfig: jest
        .fn()
        .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
    useRouter: jest.fn(),
}));

const DEFAULT_PROPS: AnswerOptionsType = {
    questionIndex: 1,
    questionType: 'regularQuestion',
    questionnaireType: 'MCQ'
}

describe('AnswerOptions', () => {
    const { result } = renderHook(() => useForm())
    const form = result.current

    it('should render the mcq answer options', () => {
        render(<FormProvider {...form}><AnswerOptions {...DEFAULT_PROPS} questionnaireType='MCQ' /></FormProvider>)
        expect(screen.getByTestId('mcq-answer')).toBeInTheDocument()
    })

    it('should render the SATA answer options', () => {
        render(<FormProvider {...form}><AnswerOptions {...DEFAULT_PROPS} questionnaireType='SATA' /></FormProvider>)
        expect(screen.getByTestId('sata-answer')).toBeInTheDocument()
    })

    it('should render nothing ', () => {
        const { container } = render(<FormProvider {...form}><AnswerOptions questionIndex={1} questionType='caseStudy' questionnaireType='SATA' /></FormProvider>)
        expect(container).toBeEmptyDOMElement()
    })

    it('should render nothing when questionType is caseStudy and MCQ', () => {
        const { container } = render(<FormProvider {...form}><AnswerOptions questionIndex={1} questionType='caseStudy' questionnaireType='MCQ' /></FormProvider>)
        expect(container).toBeEmptyDOMElement()
    })

})