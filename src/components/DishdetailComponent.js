import React, { Component } from 'react'
import { Container, Row, Col, Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'

    function RenderDish({dish}){
         if(dish !=null ){
            console.log(dish)
            return (
                <Card  >
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle> { dish.cname } </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            )
        }
    }


    function RenderComments({comments, addComment, dishId}){
        if (comments != null){
            return(
                <div>
                    <h3> Comments </h3>
                    <ul className="list-unstyled">

                            {comments.map((comment)=>{
                                return(
                                        <div key={comment.id}>
                                            <li>{comment.comment}</li>
                                            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                                        </div>
                                );
                            })}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
            )

        }else{
            return(
                <div></div>
            )
        }
    }


    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className = 'container'>
                    <div className ='Row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className = 'container'>
                    <div className = 'Row'>
                        <h4> { props.errMess }</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish !==null){
            return(
                <Container>
                   <Row>
                       <Breadcrumb>
                          <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                      <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
                       </Breadcrumb>
                       <div className="col-12">
                           <h3>{props.dish.name}</h3>
                           <hr />
                       </div>
                   </Row>
                   <Row >
                       <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                           <RenderDish dish = {props.dish} />
                       </div>
                       <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                       <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                      />

                       </div>
                   </Row>

                </Container>

            )
        }
            else{
                return(
                    <div></div>
                )}
    }


    const required = (val) => val && val.length
    const maxLength = (len) => (val) => !(val) || (val.length <= len)
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
            alert('Current comment: ' + JSON.stringify(values))
             this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
        }


        render(){
            return(
                <div>
                    <Button outline onClick={ this.toggleModal }>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen ={ this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit ={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
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
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor ='name'>Your Name </Label>
                                <Control.text model ='.name' id='name' name='name' placeholder='Your Name'
                                    className ='form-control'
                                    validators ={{
                                        required,
                                        maxLength:maxLength(15),
                                        minLength:minLength(3)
                                    }}/>
                                <Errors
                                    className = "text-danger"
                                    model ='.name'
                                    show = 'touched'
                                    messages ={{
                                        required:'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor ='comment'> Comment </Label>
                                <Control.textarea model='.comment' name ='comment'
                                    rows='6' className='form-control'
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type ='submit' value='submit' color='primary'>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                    </Modal>
                </div>
            )
        }

    }




export default DishDetail
