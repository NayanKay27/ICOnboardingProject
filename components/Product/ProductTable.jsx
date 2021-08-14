import React, {useState} from 'react'
import { Table, Button,  Icon, Dropdown, TableRow, TableHeaderCell, TableBody, TableCell } from 'semantic-ui-react'

import '../../custom.css'
import EditProduct from './EditProduct';

const ProductTable = (props) => {
    const {products, fetchProducts} = props;
    const [editProductModal, setEditProductModal] = useState(false)
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const [prodId, setProdId] = useState(0)
    const [product, setProduct] = useState(null)

    const toggleDeleteProductModal = (value, id) => {
        console.log(value)
          setProdId(id)
          setDeleteProductModal(value)
      }

      const toggleEditProductModal = (value, product) => {
        setProduct(product)
        setEditProductModal(value)
      }

    return(
        <div>
            <Table className="table" celled size='small'>
                <Table.Header>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </Table.Header>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <Button onClick={() => toggleEditProductModal(true,product)} icon labelPosition='left' color='yellow' size='tiny' >
                                    EDIT
                                    <Icon name='edit' size='small'/>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => toggleDeleteProductModal(true,product.id)} icon labelPosition='left' color='red' size='tiny' >
                                    DELETE
                                    <Icon name='trash' size='small'/>
                                </Button>
                            </TableCell>
                        </TableRow>    
                    ))}
                                       
                </TableBody>
            </Table>

            {editProductModal ? (
                <EditProduct
                openEditProdModal = {editProductModal}
                toggleEditProductModal = {toggleEditProductModal}
                product = {product}
                fetchProducts = {fetchProducts}
                />
            ) : 
            ("")}

            {deleteProductModal ? (
                <EditProduct
                openWindow = {deleteProductModal}
                toggleDeleteProductModal = {toggleDeleteProductModal}
                id = {prodId}
                fetchProducts = {fetchProducts}
                />
            ) : 
            ("")}
        </div>
    );
}
export default ProductTable