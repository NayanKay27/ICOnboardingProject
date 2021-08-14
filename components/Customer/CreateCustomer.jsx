import React, {useState} from 'react'
import { Form, Button,  Modal } from 'semantic-ui-react'
import axios from "axios";

const CreateCustomer = (props) => {
  //const [open, setOpen] = React.useState(false)
  const {open, toggleCreateCustomerModal, fetchCustomers} = props

//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [email, setEmail] = useState("")

  const [customer, setCustomer] = useState({
    firstName : "",
    address : "",
    email : ""
  })

  const handleChangeCustomer = (field, value) => {
    setCustomer({
        ...customer,
        [field]: value
    })        
  }

  const createCustomer = () =>{
        axios.post("Customers/PostCustomer", {
            name : customer.name,
            address : customer.address,
            emailid : customer.emailid,
        })
        .then(({data}) => {
            console.log(data)
            fetchCustomers()
            toggleCreateCustomerModal(false)
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
    <Modal open={open} dimmer='blurring'>
      <Modal.Header>Create customer</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field required>
                <label>FIRSTNAME</label>
                {/* <input placeholder='First Name' onBlur ={ (e) => setCustomer(customer.firstName = e.target.value) } /> */}
                <input placeholder='First Name' onBlur ={ (e) => handleChangeCustomer("name", e.target.value) } />
            </Form.Field>
            <Form.Field required>
                <label>ADDRESS</label>
                <input placeholder='Address' onBlur ={ (e) => handleChangeCustomer("address", e.target.value) }/>
            </Form.Field>
            <Form.Field>
                <label>EMAIL</label>
                {/* <input onChange={(e) => validateEmail(e)} placeholder='joe@xyz.com' /> */}
                <input placeholder='joe@xyz.com' onBlur ={ (e) => handleChangeCustomer("emailid", e.target.value) } />
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateCustomerModal(false) }>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick= {createCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer