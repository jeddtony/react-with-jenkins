import {useContext} from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import React from 'react';
import './table.css';
import {AiFillCaretDown} from 'react-icons/ai';
import {AiFillCaretUp} from 'react-icons/ai';

import {ThemeContext} from '../../providers/ThemeProvider';

import { theme } from "../../theme";

export default function Table({
    columns,
    data,
    fetchData,
    loading,
    newIndex,
    pageCount: controlledPageCount,
  }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: newIndex}, // Pass our hoisted table state
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
      },
      useSortBy,
      usePagination
    )
  
    const { mode } = useContext(ThemeContext);
    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
      fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex])
  
    // Render the UI for your table
    return (
      <>

        <table {...getTableProps()} data-testid="result-table" >
          <thead style={{borderBottom: theme[mode].tableBorderBottom}}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          // ? ' 🔽'
                          ? (<AiFillCaretDown />)
                          // : ' 🔼'
                          : (<AiFillCaretUp />)
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}
                    style={{borderBottom: theme[mode].tableBorderBottom}}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
            
          </tbody>
        </table>
       {/* Pagination */}
        <div className="pagination m-20">
          <button className="rounded-border paginate-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button className="rounded-border paginate-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button className="rounded-border paginate-button" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button className="rounded-border paginate-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              className="rounded-border"
              style={{color: theme[mode].color, border: "1px solid "}}
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            //   style={{ width: '100px' }}
            />
          </span>{' '}
       
        </div>
      </>
    )
  }
  