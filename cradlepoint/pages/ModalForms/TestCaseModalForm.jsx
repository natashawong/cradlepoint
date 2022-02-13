import React, {useState} from "react";
import Modal from 'react-modal';
import CPButton from "../../components/button/CPButton";
import styles from '../../styles/Modal.module.css'
import { SmallTextInput, BigTextInput } from "../../components/fields/Text";
import { borderLeft } from "@mui/system";
import { useRouter } from 'next/router'
import {ObjectID} from 'bson';
import {modalFormType} from '../../util/modalUtils';
import { arrayOf, objectOf } from "prop-types";

export default function TestCaseModalForm(props) {
  const router = useRouter();
  const initialData = {
    _id: props.data?._id??new ObjectID(),
    name: props.data?.name??"",
    description: props.data?.description??"",
    config: props.data?.config??"",
    topology: props.data?.topology??"",
  }
  const [data, setData] = useState(initialData)

  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value
    });
  }

  async function handleSubmitData() {
    // const clone = JSON.parse(JSON.stringify(props.data));
    // const BOM = clone.BOM.map((d) => {
    //   delete d.device;
    //   return d;
    // });

    let newData = {
      ...props.data, 
      "_id":data._id.toString(), 
      "name":data.name, 
      "description":data.description,
      "testPlanId": props.testPlanId,
      "topology": data.topology,
      "config": data.config
    }
    
    const endPoint = '/api/editTestCase';
    const method = 'PUT';
    if (props.modalFormType==modalFormType.NEW){
      endPoint = '/api/addNewTestCase';
      method = 'POST';
      newData["tests"] = [];
      newData["BOM"] = [];
    }

    console.log("NewData:", newData);

    try{
      const d = JSON.stringify(newData);
      const res = await fetch(endPoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(d)
        },
        body: d
      })
      console.log("RES:", res)
    } catch (err){
      console.log("Error:",err)
    }
    props.onClose()
  }

  return (
    <>
      <Modal className={styles.Modal} isOpen={props.isOpen}>
        <h2>Fill in New Test Case Info</h2>
        <div style={{alignItems:borderLeft}}>
        <SmallTextInput label="Name:" name='name' value={data.name} onChange={handleChange}/>
        {/* TODO: will be a file upload here instead */}
        <SmallTextInput label="Topology:" name='topology' value={data.topology} onChange={handleChange}/>
        <BigTextInput label="Description:" name='description' value={data.description} onChange={handleChange}/>
        <BigTextInput label="Config:" name='config' value={data.config} onChange={handleChange}/>
        </div>
        <CPButton text='Back' onClick={()=>{
          setData(initialData);
          props.onBack();}}/>
        {/* TODO: integrate add/edit api call for test case*/}
        <CPButton text='Done' onClick={handleSubmitData}/>
      </Modal>
    </>
  );
}
