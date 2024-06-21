'use client'
import React, { useEffect, useState } from 'react'
import { getPotterData } from '../utils/dataServices'
import { IPotterHead } from '@/interfaces/Interfaces';
import placeholderImage from '../assets/placeholderImage.jpg';
import ModalComponent from './ModalComponent';
import { IpcNetConnectOpts } from 'net';
import { Button } from '@mui/material';

const TableComponent = () => {
    const [potterData, setPotterData] = useState<IPotterHead[]>([]);
    const [currentWizard, setCurrentWizard] = useState<IPotterHead | null>(null);

    const [openModal, setOpenModal] = useState(false);

    // UseEffect to fetch data and save to potterData useState variable
    useEffect(() => {
        const getData = async () => {
            setPotterData(await getPotterData());
        }

        getData();
    }, [])

    const handleOpenModal = (wizard: IPotterHead) => {
        setOpenModal(true);
        setCurrentWizard(wizard);
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24'>
                {/* Ternary to map through potterData and return images and names, or return No Data if none */}
                {potterData ? (
                    potterData.map((wizard, index) => (
                        <div className='bg-black rounded-xl cursor-pointer' key={index} onClick={() => handleOpenModal(wizard)}>
                            {/* Ternary to map through images to display Wizard image from API if available, or placeholder image if not. */}
                            {wizard.image ? (
                                <img className='w-full rounted-t-xl aspect-square object-contain' src={wizard.image} alt="Wizard Image" />
                            ) : (
                                <img className='w-full rounded-t-xl' src={placeholderImage.src} alt="Placeholder Image" />
                            )}

                            {/* Display Wizard name */}
                            <div className='text-center bg-white rounded-b-xl py-2' key={index}>
                                {wizard.name}
                            </div>

                            {/* <Button color='primary' onClick={() => handleOpenModal(wizard)}>
                                Learn More
                            </Button> */}
                        </div>

                    ))
                ) : (
                    <h2>No Data</h2>
                )
                }
                
            </div>

            {currentWizard && <ModalComponent openModal={openModal} setOpenModal={setOpenModal} currentWizard={currentWizard} />}

        </>

    )
}

export default TableComponent
