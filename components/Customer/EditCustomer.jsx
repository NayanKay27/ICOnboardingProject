import React from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const EditCustomer = (props) => {
  //const [open, setOpen] = React.useState(false)
  const { openEditCustModal, toggleEditCustomerModal, customer, fetchCustomers} = props

  console.log(customer)
//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [email, setEmail] = useState("")

  /* const [customer, setCustomer] = useState({
    firstName : "",
    address : "",
    email : ""
  }) */

  /* const handleChangeCustomer = (field, value) => {
    setCustomer({
        ...customer,
        [field]: value
    })        
  } */
  const handleChangeCustomer = (field, value) => {
      customer[field] = value
  }

  const updateCustomer = () =>{
      const URL = "Customers/PutCustomer/" + customer.id
      axios.put(URL, {
            id : customer.id,
            name : customer.name,
            address : customer.address,
            emailid : customer.emailId,
        })
        .then(({data}) => {
            console.log(data)
            fetchCustomers()
            toggleEditCustomerModal(false, customer)
          })
        .catch((err) => {
            console.log(err)
        })
  }
    // const validateEmail = (e) =>{
    //     var email = e.target.value
  
    //     if (validator.isEmail(email)) {
    //     }
    //     else {
    //         e.target.value = 'Enter valid Email!'
    //     }
    // }

  return ( 
    <Modal open={openEditCustModal} dimmer='blurring'>
      <Modal.Header>Edit customer</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>First Name</label>
                {/* <input placeholder='First Name' onBlur ={ (e) => setCustomer(customer.firstName = e.target.value) } /> */}
                <input  placeholder={customer.name} onChange ={ (e) => handleChangeCustomer("name", e.target.value) } />
            </Form.Field>
            <Form.Field>
                <label>Address</label>
                <input placeholder={customer.address} onChange ={ (e) => handleChangeCustomer("address", e.target.value) }/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                {/* <input onChange={(e) => validateEmail(e)} placeholder='joe@xyz.com' /> */}
                <input placeholder={customer.emailId} onChange ={ (e) => handleChangeCustomer("emailId", e.target.value) } />
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleEditCustomerModal(false) }>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick= {updateCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomer