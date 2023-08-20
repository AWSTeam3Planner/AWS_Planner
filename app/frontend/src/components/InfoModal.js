import React from 'react';
import { MDBModalDialog, MDBModalContent, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

const InfoModal = ({ isOpen, onClose, infoData }) => {
    // infoData가 undefined인 경우 빈 배열로 초기화
    const dataToShow = infoData || [];
  
    return (
      <MDBModal show={isOpen} onHide={onClose} centered>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>모든 일정</MDBModalHeader>
            <MDBModalBody>
              {dataToShow.map((item, index) => (
                <div key={index}>
                  <p>Title: {item.Title}</p>
                  <p>Date: {item.DATE}</p>
                  <p>Memo: {item.Memo}</p>
                  <p>Index: {item.Index}</p>
                  <p>EndDate: {item.EndDate}</p>
                  <hr />
                </div>
              ))}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={onClose}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };
  
  

export default InfoModal;
