import React, {useState} from 'react';
import { useRouter } from 'next/router';
import SplitScreen from '../components/baseScreen/SplitScreen';
import { PlainTable } from '../components/tables/Table';
import { makeStyles } from '@mui/styles';
import CPButton from '../components/button/CPButton';
import styles from '../styles/EngagementDetails.module.css';
import { resultColumns } from '../util/tableColumns';
import ResultModalForm from './ResultModalForm';
import styling from '../styles/tableStyling';
import EditModalFlow from './editModalFlow';
import { flowType } from '../util/modalUtils';


export default function ResultDetails(props) {
    const router = useRouter();
    const refreshData = ( () => {
        router.replace(router.asPath);
    })
    

    const [editModalFlow, setEditModalFlow] = useState(false);

    
    function details() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Details: {props.resultData.details}</p>
            </div>
        )
    }
    function description() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <h2>Detailed Description</h2>
                <p>Evidence: {props.resultData.evidence}</p>
                <p>Status: {props.resultData.resultStatus}</p>
                <p>Date Created: {props.resultData.createdOn}</p>
            </div>
        )
    }

    return (
        <div>
            <EditModalFlow data={props.resultData} type={flowType.RESULT} modalOpen={editModalFlow} onClose={() => {setEditModalFlow(false); refreshData();}} />

            
        <SplitScreen
            topChildren={
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h1>Result Details</h1>
                <CPButton text="Edit"
                onClick={()=>setEditModalFlow(true)}/>
                </div>}
            leftSection={details()}
            rightSection={description()}
            bottomChildren={
                <div>
   
                </div>
            }
        />
        </div> 
 
    )
}

export async function getServerSideProps(context) {
    /* 
       Gets Data for Result Details
       TODO: Error Check await call
       TODO: Refactor out fetch call
    */
    const res = await fetch(`${process.env.HOST}/api/getResult?_id=`+context.query._id);
    const resultData = await res.json().then((data) => data[0]);
    
    return {
      props: {resultData}, // will be passed to the page component as props
    }
  }