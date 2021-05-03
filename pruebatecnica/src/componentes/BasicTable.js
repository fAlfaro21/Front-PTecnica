import React, {useMemo} from 'react'
import {useTable} from 'react-table'
// import {MOCK_DATA} from './MOCK_DATA.json'
import {COLUMNS} from './columns'
import './table.css'

function BasicTable() {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns,   // podría suplirse por únicamente columns (ES6)
        data: data          // podría suplirse por únicamente data (ES6)
    })

    //Desestrucutación de propiedades y métodos de la instancia tabla. Se refiere a funciones y arrays que el hook useTable nos ofrece. Lo utiliza el HTML para renderizar la tabla.
    const{                  
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map( column =>(
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))
                        }
                    </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row =>{
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell =>{
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}