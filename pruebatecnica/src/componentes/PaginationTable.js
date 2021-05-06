import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import {COLUMNS} from './columns'
import { GlobalFilter } from './GlobalFilter'
import './table.css'

function PaginationTable(props) {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.data, [])
    console.log(data);

    const tableInstance = useTable({
        columns: columns,   // podría suplirse por únicamente columns (ES6)
        data: data          // podría suplirse por únicamente data (ES6)
    })

    //Desestrucutación de propiedades y métodos de la instancia tabla. Se refiere a funciones y arrays que el hook useTable nos ofrece. Lo utiliza el HTML para renderizar la tabla.
    const{                  
        getTableProps,
        getTableBodyProps,
        headerGroups,
        //rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
    }, useGlobalFilter, useSortBy, usePagination
    )

    const { globalFilter } = state

    const { pageIndex } = state

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
                        page.map(row =>{
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
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of { pageOptions.length }
                    </strong>{' '}
                </span>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Anterior</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>Siguiente</button>
            </div>            
        </>
    )
}

export default PaginationTable;