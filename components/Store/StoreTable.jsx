import React, { useState } from 'react'
import { Table, Button, Icon, Dropdown, Pagination } from 'semantic-ui-react'
import EditStore from "./EditStore"
import DeleteStore from "./DeleteStore"

const StoreTable = (props) => {
  const { stores, fetchStores } = props;

  const [deleteStoreModal, setDeleteStoreModal] = useState(false)
  const [editStoreModal, setEditStoreModal] = useState(false)
  const [id, setId] = useState(0);
  const [store, setStore] = useState(null)

  
  const [totalItems, setTotalItems] = useState(0);
  const [noOfItemsPerPage, setNoOfItemsPerPage] = useState(5)
  const [noOfPages, setNoOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  /* useEffect(() => {
    setTotalItems(stores.length)
    setNoOfPages(Math.ceil(totalItems / noOfItemsPerPage))
  }, []) */


  let noOfItemsOptions = [
    { text: '5 items', value: 5 },
    { text: '10 items', value: 10 },
    { text: '15 items', value: 15 }
  ]

  const toggleDeleteStoreModal = (value, id) => {
    console.log(value)
    setId(id)
    setDeleteStoreModal(value)
  }

  const toggleEditStoreModal = (value, store) => {
    setStore(store)
    setEditStoreModal(value)
  }

  const RefreshTable = () => {
    fetchStores()
    setTotalItems(stores.length)
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

  console.log(stores)

  return (
    <div>
      <Table className="style-table" celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stores.map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>{store.name}</Table.Cell>
              <Table.Cell>{store.address}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleEditStoreModal(true, store)} icon labelPosition='left' color='yellow' size='tiny' >
                  EDIT
                  <Icon name='edit' size='small' />

                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => toggleDeleteStoreModal(true, store.id)} icon labelPosition='left' color='red' size='tiny'>
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
      {editStoreModal ? (
        <EditStore
          openEditModal={editStoreModal}
          toggleEditStoreModal={toggleEditStoreModal}
          store={store}
          fetchStores={RefreshTable}
        />
      ) :
        ("")}

      {deleteStoreModal ?
        (<DeleteStore
          openWindow={deleteStoreModal}
          toggleDeleteStoreModal={toggleDeleteStoreModal}
          id={id}
          fetchStores={RefreshTable}
        />
        ) : ("")}
    </div>
  )
};
export default StoreTable;