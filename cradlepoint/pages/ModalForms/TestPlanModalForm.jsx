import React, {useState} from "react";
import Modal from 'react-modal';
import CPButton from "../../components/button/CPButton";
import styles from '../../styles/Modal.module.css'
import { SmallTextInput, BigTextInput } from "../../components/fields/Text";
import { borderLeft } from "@mui/system";
import { useRouter } from 'next/router';
import {ObjectID} from 'bson';
import { Formik, Field } from "formik";

export default function TestPlanModalForm(props) {
  const router = useRouter();
  const initialData = {
    _id: props.data?._id??new ObjectID(),
    name: props.data?.name??"",
    isActive: props.data.isActive?props.data.isActive:"true",
    version: props.data.version?props.data.version:"",
    customerFeedback: props.data.customerFeedback?props.data.customerFeedback:"",
    description: props.data.description?props.data.description:"",
    deviceConfig: props.data.deviceConfig?props.data.deviceConfig:""
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
    let newData = {
      ...props.data, 
      "_id":data._id, 
      "name":data.name, 
      "isActive":data.isActive,
      "version": data.version,
      "customerFeedback": data.customerFeedback,
      "description": data.description,
      "deviceConfig": data.deviceConfig,
    }
    try{
      const res = await fetch('/api/editTestPlan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
    } catch (err){
      console.log("Error:",err)
    }
    props.onBack()
  }

  return (
      <Modal className={styles.Modal} isOpen={props.isOpen}>
        <h2>Test Plan Info</h2>
        <div style={{alignItems:borderLeft}}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div>
          <SmallTextInput label="Name:" name='name' value={data.name} onChange={handleChange}/>
          <div style={{padding: "25px"}}>
          <Formik>
            <label>
              Active:
              <Field as="select" name="isActive" value={data.isActive} onChange={handleChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </Field>
              </label>
            </Formik>
            </div>
          <SmallTextInput label="Version:" name='version' value={data.version} onChange={handleChange}/>
          </div>
        <BigTextInput label="Customer Feedback:" name='customerFeedback' value={data.customerFeedback} onChange={handleChange}/>
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <BigTextInput label="Test Plan Description:" name='description' value={data.description} onChange={handleChange}/>
        <BigTextInput label="Device Config:" name='deviceConfig' value={data.deviceConfig} onChange={handleChange}/>
        </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <CPButton text='Back' onClick={()=>{
          setData(initialData);
          props.onBack();}}/>
          <CPButton text='Done' onClick={handleSubmitData}/>
        </div>
      </Modal>
  );
}