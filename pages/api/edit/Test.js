import { editTest } from "../../../util/editEntry";
/*
  Edits the requested test from the database
*/

export default async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: "Only PUT requests allowed" })
  }
  try {
    const response = await editTest(req.body);
    res.status(response.statusCode).json(response);
  } catch (err) {
    res.status(500).json({ message: "Something Unexpected Occured", error: err });
  }
};