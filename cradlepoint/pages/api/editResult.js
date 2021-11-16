const { ObjectId } = require('mongodb');
import connectToDb from "../../util/mongodb";
import {resultSchema} from "../../schemas/resultSchema";
/*
  Edits the requested result from the database
*/

export default async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).send({ message: 'Only PUT requests allowed' })
  }
  try{
    const data = req.body;
    const valid = await resultSchema.isValid(data);
    if (valid && ObjectId.isValid(data.testId)){
      const result = resultSchema.cast(data);
      // Set ID strings to Mongo ObjectId's
      const newId = ObjectId(result._id);
      const newTestId = ObjectId(result.testId);
      const query = {_id: newId};
      delete result._id;
      delete result.testId;
      const newResult = {_id: newId, testId:newTestId, ...result };
      console.log(newResult);
      // Update the Database w/ new Result
      const db = await connectToDb();
      await db.collection("result").replaceOne(query, newResult);
      res.status(200).send({message: "Success!"});
    } else {
      res.status(422).send({message: 'Input not in right format'})
    }

  } catch (err) {
    res.status(500).send(err);
  }
};