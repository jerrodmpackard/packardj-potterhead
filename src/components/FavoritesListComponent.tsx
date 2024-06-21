import { Box, Drawer, IconButton, ListItem, Tooltip, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '@/utils/dataServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPotterHead } from '@/interfaces/Interfaces';
import { ChevronLeft } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

interface DrawerProps {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    currentWizard: IPotterHead | null;
}


const FavoritesListComponent = ({ openDrawer, setOpenDrawer, currentWizard }: DrawerProps) => {
    const [favorites, setFavorites] = useState<IPotterHead[]>([]);

    // Getting user favorites
    useEffect(() => {
        setFavorites(getLocalStorage());
    }, [openDrawer])


    // Removing favorites
    const handleRemoveFavorite = async (currentWizard: IPotterHead) => {

        removeFromLocalStorage(currentWizard);

        setFavorites(getLocalStorage());
    }

    const handleWizardClick = () => {

    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'fit content',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        position: 'sticky',
        top: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: 101,
    }))

    return (
        <Drawer variant='persistent' hideBackdrop={true} open={openDrawer}>
            <DrawerHeader sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <IconButton edge='end' onClick={() => setOpenDrawer(false)}>
                    <CloseIcon fontSize='large' />
                </IconButton>
            </DrawerHeader>
            {favorites.length > 0 ? (
                favorites.map((currentWizard, index) => (
                    <Box key={index} sx={{ width: '100%', maxWidth: 295 }}>
                        <ListItem
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                                },
                            }}
                            secondaryAction={
                                <Tooltip title="delete">
                                    <IconButton edge="end" onClick={() => handleRemoveFavorite(currentWizard)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <Tooltip title={currentWizard.name}>
                                <Typography key={index} noWrap onClick={() => handleWizardClick()}>
                                    {currentWizard.name}
                                </Typography>
                            </Tooltip>
                        </ListItem>
                    </Box>
                ))
            ) : (
                <Box sx={{ width: '100%', maxWidth: 295 }}>
                    <Typography className='text-pretty pb-3'>No favorites to display.</Typography>
                    <Typography className='text-pretty'>Add some wizards to favorites to see them populate here.</Typography>
                </Box>
            )}
        </Drawer>
    )
}

export default FavoritesListComponent
