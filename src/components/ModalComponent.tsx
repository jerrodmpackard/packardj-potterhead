import { IPotterHead } from '@/interfaces/Interfaces';
import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import placeholderImage from '../assets/placeholderImage.jpg';
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '@/utils/dataServices';
import { PiHeart, PiHeartFill } from "react-icons/pi";


interface ModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentWizard: IPotterHead;
}


const ModalComponent = ({ openModal, setOpenModal, currentWizard }: ModalProps) => {

    const [inFavorites, setInFavorites] = useState<boolean>(false);

    const checkIfInFavorites = async () => {
        const favorites: IPotterHead[] = await getLocalStorage();
        const isAlreadyFavorited = favorites.some(wizard => wizard.name === currentWizard.name);
        setInFavorites(isAlreadyFavorited);
    }

    useEffect(() => {

        checkIfInFavorites();

    }, [currentWizard])

    const handleAddFavorite = async () => {
        try {
            if (inFavorites) {
                await removeFromLocalStorage(currentWizard);
                checkIfInFavorites();
                return;
            } else {
                await saveToLocalStorage(currentWizard);
                checkIfInFavorites();
            }
        } catch (error) {
            console.error('Error occurred while adding favorite', error);
        }
    }

    return (
        <Dialog open={openModal} fullWidth={true} maxWidth='md' >
            <DialogTitle sx={{ m: 0, padding: 2, paddingRight: 5 }} className='truncate'>
                {currentWizard.name}
            </DialogTitle>

            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
                onClick={() => {
                    setOpenModal(false);
                }}
            >
                <Close />
            </IconButton>

            <DialogContent dividers className='grid grid-cols-1 sm:grid-cols-2'>
                <Box>
                    {currentWizard.image ? (
                        <img className='w-full rounted-xl aspect-square object-contain' src={currentWizard.image} alt="Wizard Image" />
                    ) : (
                        <img className='w-full rounded-xl' src={placeholderImage.src} alt="Placeholder Image" />
                    )}
                </Box>

                <Box>
                    <Box>
                        <Tooltip title={inFavorites ? "In favorites" : "Add to favorites"}>
                            <IconButton onClick={handleAddFavorite}>
                                {inFavorites ? (<PiHeartFill className='text-3xl text-red-600' />) : (<PiHeart className='text-3xl text-red-600' />)}
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* <Typography><strong>Alternate Names:</strong> {currentWizard.alternate_names}</Typography> */}
                    <Typography className='pb-2'><strong>Gender:</strong> {currentWizard.gender ? (currentWizard.gender) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Species:</strong> {currentWizard.species ? (currentWizard.species) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Date of Birth:</strong> {currentWizard.dateOfBirth ? (currentWizard.dateOfBirth) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Eye Color:</strong> {currentWizard.eyeColour ? (currentWizard.eyeColour) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Hair Color:</strong> {currentWizard.hairColour ? (currentWizard.hairColour) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>House:</strong> {currentWizard.house ? (currentWizard.house) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Ancestry:</strong> {currentWizard.ancestry ? (currentWizard.ancestry) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Wand:</strong> {currentWizard.wand.wood !== "" ? (`${currentWizard.wand.wood} wood, ${currentWizard.wand.core} core, ${currentWizard.wand.length} inches`) : ('N/A')} </Typography>
                    <Typography className='pb-2'><strong>Patronus:</strong> {currentWizard.patronus ? (currentWizard.patronus) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Actor:</strong> {currentWizard.actor ? (currentWizard.actor) : ('N/A')}</Typography>
                    <Typography className='pb-2'><strong>Wizard:</strong> {currentWizard.wizard === true ? ('Yes') : ('No')}</Typography>
                    <Typography className='pb-2'><strong>Hogwarts Student:</strong> {currentWizard.hogwartsStudent === true ? ('Yes') : ('No')}</Typography>
                    <Typography className='pb-2'><strong>Hogwarts Staff:</strong> {currentWizard.hogwartsStaff === true ? ('Yes') : ('No')}</Typography>
                    <Typography className='pb-2'><strong>Alive:</strong> {currentWizard.alive === true ? ('Yes') : ('No')}</Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                {/* <Box sx={{ flexGrow: 1 }}> */}
                <Button color="error" variant="contained" onClick={() => setOpenModal(false)}>Close</Button>
                {/* </Box> */}
            </DialogActions>
        </Dialog>
    )
}

export default ModalComponent
