import React, { Component } from 'react'
import {  Modal, ModalHeader, ModalBody, Label} from 'reactstrap'
import { Control, Form, Errors, actions } from 'react-redux-form'

const required = (val) => val && val.length
const maxLength =(len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values))
        alert('Current comment: ' + JSON.stringify(values))
        this.props.resetFeedbackForm()
    }


    render(){
        return(
            <div>
                <Button outline onClick={ this.toggleModal }>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen ={ this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row>
                            <Col>
                                <Label htmlFor ='rating'>Rating </Label>
                                <Control.select model='.rating' name="rating"
                                    className ='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor ='name'>Your Name </Label>
                                <Control.text model ='.name' name='name' placeholder='Your Name'
                                className ='form-control' validators ={{
                                    required, maxLength:maxLength(15), minLength:minLength(3)
                                }}/>
                            <Errors
                                className = "text-danger"
                                model ='.name'
                                show = 'touched'
                                message ={{
                                    required:required,
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor ='comment'> Comment </Label>
                            <Control.textarea model='.comment' name ='comment'
                                rows='6' className='form-control'
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type ='submit' color='primary'>
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </ModalBody>

                </Modal>
            </div>
        )
    }

}
