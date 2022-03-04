import {addTestCase} from "../../util/addEntry"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
    }
    else {

        try {
          const response = await addTestCase(req.body)
          res.status(200).send({message: response});
        } catch (err) {
          res.status(500).send(err.message);
        }
    }
} 