import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, useSortBy} from 'react-table'
import {COLUMNS} from './columns'
import { GlobalFilter } from './GlobalFilter'
import './table.css'

function FilteringTable(props) {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.data, [])
    console.log(props.data);

    const tableInstance = useTable({
        columns: columns,   // podría suplirse por únicamente columns (ES6)
        data: data          // podría suplirse por únicamente data (ES6)
    })

    //Desestrucutación de propiedades y métodos de la instancia tabla. Se refiere a funciones y arrays que el hook useTable nos ofrece. Lo utiliza el HTML para renderizar la tabla.
    const{                  
        getTableProps,
        getTableBodyProps,
        headerGroups,
        //footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
    }, useGlobalFilter, useSortBy
    )

    const { globalFilter } = state

    return (
    <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map( column =>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>                                
                                </th>
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
            {/* <tfoot>
                {footerGroups.map((footerGroup) =>(
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map((column) =>(
                            <td {...column.getFooterProps}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot> */}
        </table>
    </>
    )
}

export default FilteringTable;