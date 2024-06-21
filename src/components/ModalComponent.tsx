import { IPotterHead } from '@/interfaces/Interfaces';
import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'

interface ModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentWizard: IPotterHead;
}

const ModalComponent = ({openModal, setOpenModal, currentWizard}: ModalProps) => {



    return (
        <Dialog open={openModal} fullWidth={true} maxWidth='sm' >
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

            <DialogContent dividers className='h-96'>
                <Typography>

                </Typography>
            </DialogContent>

            <DialogActions>
                <Box sx={{ flexGrow: 1 }}>
                    <Button color="error" variant="contained" onClick={() => setOpenModal(false)}>Close</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default ModalComponent
