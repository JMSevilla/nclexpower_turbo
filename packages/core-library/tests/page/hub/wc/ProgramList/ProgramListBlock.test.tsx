import React from "react";
import { render, screen, fireEvent, waitFor } from "../../../../../tests/common";
import { ProgramListBlock } from "../../../../../../../apps/web-customer/src/components/blocks/HubBlocks/ProgramListBlock/ProgramListBlock";

jest.mock("../../../../../config", () => ({
    getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} }}),
    config: { value: jest.fn()}
}));

jest.mock("../../../../../core/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("ProgramListAccordion Component", () => {
    it("should render the program header and the ProgramListAccordion on default", () => {
        render(<ProgramListBlock/>);
        
        const programHeaderTitle = screen.getByText('Body Systems Topic (Day 1-13)');
        const programHeaderSubtitle = screen.getByText('Key body systems covered over 13 days of study.');
        
        expect(programHeaderTitle).toBeInTheDocument();
        expect(programHeaderSubtitle).toBeInTheDocument();
    });

    it("should render the list view by default", () => {
        render(<ProgramListBlock />);

        const listViewElement = screen.getByTestId('list-view');
        expect(listViewElement).toBeInTheDocument();
    });

    it("should render the grid view if the toggle-icon is clicked from the program header component", async () => {
        render(<ProgramListBlock />);

        const listViewElement = screen.getByTestId('list-view');
        const toggleIcon = screen.getByTestId('toggle-icon');

        expect(toggleIcon).toBeInTheDocument();

        fireEvent.click(toggleIcon);

        await waitFor(() => {
            const gridView = screen.getByTestId('grid-view');

            expect(gridView).toBeInTheDocument();
            expect(listViewElement).not.toBeInTheDocument();
        });
    });
});