import express, { json } from "express";
import { MongoClient } from "mongodb";

const app = express();

app.use(json());

app.get("/test", (req, res) => {
  res.json({ message: "Hello World from Express!" });
});

app.get("/oxygen-providers", async (req, res) => {
  const queryPatientId = req.query.patientId;
  const queryHealthcareCenter = req.query.healthcareCenter;
  const queryOxygenRequirement = req.query.oxygenRequirement;
  const searchIntensity = req.query.searchIntensity;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Mongo URI is not set");
    return res.status(500).json({ message: "Internal server error" });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const oxygenRequests = client
      .db("dev_oxigeno")
      .collection("oxygenRequests");
    const result = await oxygenRequests.findOne({ patientId: queryPatientId });
    if (result) {
      res.json({ message: "Oxygen request already exists for this patient" });
    } else {
      res.json({
        message: `Oxygen providers list for patientId: ${queryPatientId} and healthcareCenter: ${queryHealthcareCenter} and oxygenRequirement: ${queryOxygenRequirement} and searchIntensity: ${searchIntensity}`,
      });
    }
  } catch (err) {
	console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred." });
  } finally {
    await client.close();
  }
});

app.post("/oxygen-request", (req, res) => {
  const patientId = req.body.patientId;
  const healthcareCenter = req.body.healthcareCenter;
  const oxygenRequirement = req.body.oxygenRequirement;
  const patientDiagnosis = req.body.patientDiagnosis;

  res.json({
    message: `Oxygen request received! with patientId: ${patientId} and healthcareCenter: ${healthcareCenter} and oxygenRequirement: ${oxygenRequirement} and patientDiagnosis: ${patientDiagnosis}`,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
