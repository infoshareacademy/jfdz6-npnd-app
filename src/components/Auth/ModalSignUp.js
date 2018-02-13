import React from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {connect} from 'react-redux'

import SignUp from './SignUp'

import './ModalSignUp.css'

class ModalSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.auth.error = false
  }

  render() {
    return (
      <div className='text-center'>
        <Button className='modal-button' color="danger" onClick={this.toggle}>Zarejestruj się</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Witamy!</ModalHeader>
          <ModalBody>
            <SignUp/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ModalSignUp);