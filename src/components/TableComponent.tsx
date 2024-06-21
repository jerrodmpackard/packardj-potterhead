'use client'
import React, { useEffect, useState } from 'react'
import { getPotterData } from '../utils/dataServices'
import { IPotterHead } from '@/interfaces/Interfaces';

const TableComponent = () => {
    const [potterData, setPotterData] = useState<IPotterHead[]>([]);
    // let potterData: IPotterHead;

    useEffect(() => {
        const getData = async () => {
            setPotterData(await getPotterData());
            // potterData = await getPotterData();
            // console.log(potterData);
        }

        getData();
    }, [])

    return (
        <div className='grid grid-cols-4 gap-24'>
            {potterData ? (
                potterData.map((wizard, index) => (
                    <div className='' key={index}>
                        <div key={index}>
                            {wizard.name}
                        </div>
                    </div>

                ))
            ) : (
                <h2>No Data</h2>
            )

            }
        </div>

    )
}

export default TableComponent
