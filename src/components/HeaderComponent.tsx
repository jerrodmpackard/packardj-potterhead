import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { IPotterHead } from '@/interfaces/Interfaces';

interface DrawerProps {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    currentWizard: IPotterHead;
    setCurrentWizard: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderComponent = ({openDrawer, setOpenDrawer, currentWizard, setCurrentWizard}: DrawerProps) => {

    const handleOpenDrawer = (wizard: IPotterHead) => {
        setOpenDrawer(true);
        // setCurrentWizard(wizard);
    }

    return (
        <>
            <IconButton>
                {/* <MenuIcon edge="end" onClick={() => handleOpenDrawer()} /> */}
            </IconButton>
            <h1 className='text-4xl xl:text-7xl text-center'>Harry Potter Directory</h1>
        </>
    )
}

export default HeaderComponent
