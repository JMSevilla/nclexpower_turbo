import { FormProvider, useForm } from 'react-hook-form';
import { ControlledRadio } from '../../../components'
import { fireEvent, render, renderHook, screen } from '../../common'

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

describe('ControlledRadio', () => {
    const { result } = renderHook(() => useForm())

    it('Should render the radio button', () => {
        const { control } = result.current
        render(<ControlledRadio name='' control={control} />)
        expect(screen.getByTestId("controlled-radio")).toBeInTheDocument();
    })


    it('triggers onChange and updates value in form state', () => {
        const Wrapper = () => {
            const methods = useForm();
            return (
                <FormProvider {...methods}>
                    <ControlledRadio
                        name="testRadio"
                        control={methods.control}
                        label="Test Label"
                        value="testValue"
                    />
                </FormProvider>
            );
        };

        const { getByRole } = render(<Wrapper />);
        const radio = getByRole('radio');
        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });

})