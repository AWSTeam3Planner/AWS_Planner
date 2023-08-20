import React from 'react';
import { MDBModalDialog, MDBModalContent, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

const SuccessModal = ({ isOpen, onClose, setText }) => {
 
  return (
    <MDBModal show={isOpen} onHide={onClose} centered>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>Success!</MDBModalHeader>
        <MDBModalBody>
          {setText}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={onClose}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  );
};

export default SuccessModal;