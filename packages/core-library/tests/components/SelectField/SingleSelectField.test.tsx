import { fireEvent, render, screen } from "../../common";
import { SingleSelectField } from "../../../components";

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
}));

const options = [
    {
        label: 'Option 1',
        value: '1',
        code: 'OPT1',
        name: 'Option One'
    },
    {
        label: 'Option 2',
        value: '2',
        code: 'OPT2',
        name: 'Option Two'
    },
];

describe('SingleSelectField', () => {
    it('renders label and options correctly', () => {
        render(<SingleSelectField
            label="Select Option"
            options={options} />);

        expect(screen.getByText('Select Option')).toBeInTheDocument();

        expect(screen.queryByText('Choose one')).not.toBeInTheDocument();
    });

    it('renders options and handles selection', () => {
        const handleChange = jest.fn();
        render(
            <SingleSelectField
                label="Select Option"
                options={options}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole('combobox');
        fireEvent.mouseDown(input);

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Option 1'));
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('displays helper text and error state', () => {
        render(
            <SingleSelectField
                label="Select Option"
                helperText="Please select an option"
                error={true}
                options={options}
            />
        );

        expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });
});