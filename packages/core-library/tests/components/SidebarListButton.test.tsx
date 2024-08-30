import { render, fireEvent } from '@testing-library/react';
import { SidebarListButton } from "../../components/GenericSidebar/SidebarListButton";
import { NavigationType } from "../../types/navigation";
import { ListItemButton } from '@mui/material';


jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock('next/router', () => ({
    useRouter: () => ({
      pathname: '/test-path',
    }),
  }));

const mockNavigation : NavigationType = {
    id: 0,
    label: 'Home'
}

describe("SidebarListButton", ()=>{

    
})