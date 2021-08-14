import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditSales from "./EditSales"
import DeleteSales from "./DeleteSales"

const SalesTable = (props) => {
  const { sales, fetchSales } = props;

  const [deleteSalesModal, setDeleteSalesModal] = useState(false)
  const [editSalesModal, setEditSalesModal] = useState(false)
  const [id, setId] = useState(0);
  const [sale, setSale] = useState(null)

  
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  /* useEffect(() => {
    setTotalItems(stores.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }, []) */

  useEffect(() => {

    }, [sales])

  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteSalesModal = (value, id) => {
    console.log(value)
    setId(id)
    setDeleteSalesModal(value)
  }

  const toggleEditSalesModal = (value, sale) => {
    setSale(sale)
    setEditSalesModal(value)
  }

  const RefreshTable = () => {
      alert("in RefreshTable, before fetchSales")
    fetchSales()
    alert("in RefreshTable, after fetchSales")
    alert(sales)
    setTotalItems(sales.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }

  const handleNoOfItemsChange = (items) => {
    setNoOfItemsPerPage(items)
  }

  const handlePageNoChange = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const UpdateTableContents = () =>
  {

  }

  const pages = []
  for (var i = 1; i <= totalItems; i++)
    pages[i] = i

  console.log(sales)

  return (
    <div>
      <Table className="style-table" celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>DateSold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.customer.name!= null ? sale.customer.name: "" }</Table.Cell>
              <Table.Cell>{sale.product.name != null ? sale.product.name : "" }</Table.Cell>
              <Table.Cell>{sale.store.name != null ? sale.store.name : ""}</Table.Cell>
              <Table.Cell>{sale.dateSold}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditSalesModal(true, sale)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteSalesModal(true, sale.id)} icon labelPosition='left' color='red' size='tiny'>
                  DELETE
                  <Icon name='trash' size='small' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="row" width="100%">
        <div className="column">
          <Dropdown
            //placeholder = "No. of items per page"
            selection
            options={noOfItemsOptions}
            defaultValue={noOfItemsOptions[0].value}
            onChange={(e) => handleNoOfItemsChange(e.target.value)}
          />
        </div>
        <div className="column align-right" >
          <Pagination 
            //Size="medium"
            // items={noOfPages}
            totalPages = {10}
           activePage={currentPage}
 //           totalPages={noOfPages}
  //          boundaryRange={noOfPages}
            onSelect={(e) => handlePageNoChange(e.target.activePage)}
          />
        </div>
      </div>
      {editSalesModal ? (
        <EditSales
          openEditModal={editSalesModal}
          toggleEditSalesModal={toggleEditSalesModal}
          sale={sale}
          fetchSales={RefreshTable}
        />
      ) :
        ("")}

      {deleteSalesModal ?
        (<DeleteSales
          openModal={deleteSalesModal}
          toggleDeleteSalesModal={toggleDeleteSalesModal}
          id={id}
          fetchSales={RefreshTable}
        />
        ) : ("")}
    </div>
  )
};
export default SalesTable;