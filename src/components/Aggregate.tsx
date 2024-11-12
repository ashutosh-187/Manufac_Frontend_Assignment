import { useState } from 'react';
import { Collapse, Table } from '@mantine/core';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import data from "../../Manufac _ India Agro Dataset.json"

function Aggregate() {

    const [opened, setOpened] = useState(false);

    const startYear: number = parseInt(data[0].Year.split(',')[1])
    const endYear: number = parseInt(data[data.length - 1].Year.split(',')[1])

    const aggregate = (startYear: number, endYear: number, data: any[]) => {
        const temp: { cropName: string; aggregateArea: number; aggregateYeild: number }[] = []
        let totalArea: number = 0;
        let totalYeild: number = 0;
        data.filter((crop) => {
            const year: number = parseInt(crop.Year.split(',')[1]);
            return year >= startYear && year <= endYear
        }).forEach((crop) => {
            const cropName: string = crop["Crop Name"]
            const areaValue: number = crop["Area Under Cultivation (UOM:Ha(Hectares))"] || 0;
            const yeildValue: number = crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0;
            const existingEntry = temp.find((entry) => entry.cropName === cropName)
            totalArea += areaValue;
            totalYeild += yeildValue;
            if (existingEntry) {
                existingEntry.aggregateArea += areaValue;
                existingEntry.aggregateYeild += yeildValue;
            } else {
                temp.push({
                    cropName: cropName,
                    aggregateArea: areaValue,
                    aggregateYeild: yeildValue
                })
            }
        }) 
        const output: { cropName: string; aggregateArea: number; aggregateYeild: number; }[] = temp.map((crop) => {
            let roundoffArea: number = Math.round((crop.aggregateArea / totalArea) * 1000 * 1000) / 1000
            let roundoffYeild: number = Math.round((crop.aggregateYeild / totalYeild) * 1000 * 1000) / 1000
            return{...crop, aggregateArea: roundoffArea, aggregateYeild: roundoffYeild}
        })
        return output
    }

    const aggregatedData = aggregate(startYear, endYear, data);

    const rows = aggregatedData.map((data) => (
        <Table.Tr key={data.cropName}>
            <Table.Td>{data.cropName}</Table.Td>
            <Table.Td>{data.aggregateYeild}</Table.Td>
            <Table.Td>{data.aggregateArea}</Table.Td>
        </Table.Tr>
    ))
    
    return (
        <div className='inline-block flex flex-col justify-center shadow-lg bg-gray-200 mb-36'>
            <button onClick={() => setOpened((o) => !o)} className='flex justify-between items-center text-5xl tracking-tighter pt-2 pl-5 pr-5 border-b-[2px] border-zinc-400'>
                {opened ? (
                    <>
                        Aggregated crops data
                        <span className="ml-2">
                            <FaChevronUp />
                        </span>
                    </>
                ) : (
                    <>
                        Aggregated crops data
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
                                <Table.Th>Crop</Table.Th>
                                <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
                                <Table.Th>Average Cultivation Area of the Crop between 1950-2020</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div>
            </Collapse>
        </div>
    );
}

export default Aggregate