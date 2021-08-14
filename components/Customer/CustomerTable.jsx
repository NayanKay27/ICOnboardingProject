import React, { useState } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditCustomer from "./EditCustomer"
import DeleteCustomer from "./DeleteCustomer"


const CustomerTable = (props) => {
  const { customers, fetchCustomers } = props;

  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false)
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [id, setId] = useState(0);
  const [customer, setCustomer] = useState(null)

  
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  /* useEffect(() => {
    setTotalItems(customers.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }, []) */


  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteCustomerModal = (value, id) => {
    console.log(value)
    setId(id)
    setDeleteCustomerModal(value)
  }

  const toggleEditCustomerModal = (value, customer) => {
    setCustomer(customer)
    setEditCustomerModal(value)
  }

  const RefreshTable = () => {
    fetchCustomers()
    setTotalItems(customers.length)
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

  console.log("No of customers fetched = ", totalItems)
  console.log("No of pages = ", noOfPages)

  return (
    <div>
      <Table sortable='true' celled className="style-table" size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted='ascending'>Name</Table.HeaderCell>
            <Table.HeaderCell sorted='ascending' >Location</Table.HeaderCell>
            <Table.HeaderCell>EmailId</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((cust) => (
            <Table.Row key={cust.id}>
              <Table.Cell>{cust.name}</Table.Cell>
              <Table.Cell>{cust.address}</Table.Cell>
              <Table.Cell>{cust.emailId != null ? cust.emailId : ""}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditCustomerModal(true, cust)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteCustomerModal(true, cust.id)} icon labelPosition='left' color='red' size='tiny'>
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
      {editCustomerModal ? (
        <EditCustomer
          openEditCustModal={editCustomerModal}
          toggleEditCustomerModal={toggleEditCustomerModal}
          customer={customer}
          fetchCustomers={RefreshTable}
        />
      ) :
        ("")}

      {deleteCustomerModal ?
        (<DeleteCustomer
          openWindow={deleteCustomerModal}
          toggleDeleteCustomerModal={toggleDeleteCustomerModal}
          id={id}
          fetchCustomers={RefreshTable}
        />
        ) : ("")}
    </div>
  )
};
export default CustomerTable;