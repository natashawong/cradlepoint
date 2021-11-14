import React from "react";
import Modal from 'react-modal';
import CPButton from "../../components/button/CPButton";
import styles from '../../styles/Modal.module.css'

export default function NewTestCaseModal(props) {

  return (
    <>
      <Modal className={styles.Modal} isOpen={props.modalOpen}>
        <h2>Create New Test Case</h2>
        <CPButton text='From scratch' className="ModalButton" onClick={()=>{console.log('scratch clicked');
        props.onClickNext("scratch")}}/> 
        <CPButton text='From exisiting test cases (Clone)' onClick={()=>props.onClickNext("clone")}/>
        <CPButton text='Cancel' onClick={()=>props.onClose(false)}/>
      </Modal>
    </>
  );
}
