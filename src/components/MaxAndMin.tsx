import { useState } from 'react';
import { Collapse, Table } from '@mantine/core';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import data from "../../Manufac _ India Agro Dataset.json"

function MaxAndMin() {

    const [opened, setOpened] = useState(false);

    const startYear: number = parseInt(data[0].Year.split(',')[1])
    const endYear: number = parseInt(data[data.length - 1].Year.split(',')[1])

    const analysis = (startYear: number, endYear: number, data: any[]) => {
        const maxProduction: { cropName: string; year: number; production: number; }[] = [];
        const minYeild: { cropName: string; year: number; yeild: number; }[] = [];
        data.filter((crop) => {
            const year: number = parseInt(crop.Year.split(',')[1])
            return year >= startYear && year <= endYear
        }).forEach((crop) => {
            const cropName: string = crop["Crop Name"]
            const year: number = parseInt(crop.Year.split(',')[1])
            const productionValue: number = crop["Crop Production (UOM:t(Tonnes))"] || 0;
            const existingProductionEntry = maxProduction.find((entry) => entry.year === year)
            if (existingProductionEntry) {
                if (productionValue > existingProductionEntry.production) {
                    existingProductionEntry.production = productionValue
                    existingProductionEntry.cropName = cropName
                }
            } else {
                maxProduction.push({
                    year: year,
                    cropName: cropName,
                    production: productionValue
                })
            }
            const yeildValue: number = crop['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0;
            const existingYeildEntry = minYeild.find((entry) => entry.year === year)
            if (existingYeildEntry) {
                if (yeildValue < existingYeildEntry.yeild) {
                    existingYeildEntry.yeild = yeildValue;
                    existingYeildEntry.cropName = cropName
                }
            } else {
                minYeild.push({
                    year: year,
                    cropName: cropName,
                    yeild: yeildValue
                })
            }
        })
        const output: { year: number; maxProduction: string; minYeild: string }[] = []
        if (maxProduction.length === minYeild.length) {
            for (let i: number = 0; i < maxProduction.length; i++) {
                if (maxProduction[i].year === minYeild[i].year) {
                    output.push({
                        year: maxProduction[i].year,
                        maxProduction: maxProduction[i].cropName,
                        minYeild: minYeild[i].cropName
                    })
                }
            }
        }
        return output;
    }

    const analysedData = analysis(startYear, endYear, data)

    const rows = analysedData.map((data) => (
        <Table.Tr key={data.year}>
            <Table.Td>{data.year}</Table.Td>
            <Table.Td>{data.maxProduction}</Table.Td>
            <Table.Td>{data.minYeild}</Table.Td>
        </Table.Tr>
    ))
    
    return (
        <div className='inline-block flex flex-col justify-center mb-10 shadow-lg bg-gray-200'>
            <button onClick={() => setOpened((o) => !o)} className='flex justify-between items-center text-5xl tracking-tighter pt-2 pl-5 pr-5  border-b-[2px] border-zinc-400'>
                {opened ? (
                    <>
                    Crop with maximum production and minimum yield
                    <span className="ml-2">
                        <FaChevronUp />
                    </span>
                </>
                ) : (
                    <>
                        Crop with maximum production and minimum yield
                        <span className="ml-2">
                            <FaChevronDown />
                        </span>
                    </>
                )}
            </button>

            <Collapse in={opened} transitionDuration={1500} transitionTimingFunction="ease">
                <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <Table highlightOnHover withTableBorder withColumnBorders withRowBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Year</Table.Th>
                                <Table.Th>Crop with maximum production in that Year</Table.Th>
                                <Table.Th>Crop with minimum yeild in that Year</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div>
            </Collapse>
        </div>
    );
}

export default MaxAndMin;