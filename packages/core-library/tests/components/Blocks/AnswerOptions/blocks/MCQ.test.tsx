import { FormProvider, useForm } from 'react-hook-form';
import { MCQ } from '../../../../../components/blocks/AnswerOptions/blocks/MCQ/MCQ';
import { fireEvent, renderHook, screen } from '../../../../common'
import { render } from '@testing-library/react';


jest.mock("react-hook-form", () => ({
    ...jest.requireActual("react-hook-form"),
    useFieldArray: jest.fn(() => ({
        append: jest.fn(),
        remove: jest.fn(),
    })),
}));

jest.mock("../../../../../config", () => ({
    getConfig: jest
        .fn()
        .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
    config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
    useRouter: jest.fn(),
}));




describe('MCQ', () => {
    it('Should render the mcq block', () => {
        const { result } = renderHook(() => useForm())
        const form = result.current

        render(
            <FormProvider {...form}><MCQ questionIndex={0} /></FormProvider>
        )
        expect(screen.getByTestId('mcq-answer')).toBeInTheDocument()
    })

    it("should handle radio change correctly", () => {
        const { result } = renderHook(() => useForm())
        const form = result.current

        const { getAllByRole } = render(
            <FormProvider {...form}><MCQ questionIndex={0} /></FormProvider>
        )

        const radios = getAllByRole("radio");
        fireEvent.click(radios[1]);
        expect(radios[1]).toBeChecked();
    });
})


