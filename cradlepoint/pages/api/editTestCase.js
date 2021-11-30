const { ObjectId } = require('mongodb');
import connectToDb from "../../util/mongodb";
import {testCaseSchema} from "../../schemas/testCaseSchema";
/*
  Edits the requested TestCase from the database
*/

export default async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).send({ message: 'Only PUT requests allowed' })
  }
  try{
    const data = req.body;
    const valid = await testCaseSchema.isValid(data);
    if (valid && ObjectId.isValid(data.testPlanId)){
        const result = testCaseSchema.cast(data);
        // Set ID strings to Mongo ObjectId's
        const id = ObjectId(result._id);
        const testPlanId = ObjectId(result.testPlanId);
        const query = {_id: id};
        const engagement = {...result , _id: id, testPlanId:testPlanId};
        // Update the Database w/ new TestCase
        const db = await connectToDb();
        await db.collection("testCases").replaceOne(query, engagement);
        res.status(200).send({message: "Success!"});
    } else {
        res.status(422).send({message: 'Input not in right format'})
    }
  } catch (err) {
        res.status(500).send(err);
  }
};