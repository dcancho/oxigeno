const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' });
});

app.get('/oxygen-providers', (req, res) => {
	const patientId = req.query.patientId;
	const healthcareCenter = req.query.healthcareCenter;
	const oxygenRequirement = req.query.oxygenRequirement;
	const searchIntensity = req.query.searchIntensity;
	res.json({ 
		message: `Oxygen providers list for patientId: ${patientId} and healthcareCenter: ${healthcareCenter} and oxygenRequirement: ${oxygenRequirement} and searchIntensity: ${searchIntensity}`
	});
})

app.post('/oxygen-request', (req, res) => {
    const patientId = req.body.patientId;
    const healthcareCenter = req.body.healthcareCenter;
    const oxygenRequirement = req.body.oxygenRequirement;
    const patientDiagnosis = req.body.patientDiagnosis;

    res.json({ 
        message: `Oxygen request received! with patientId: ${patientId} and healthcareCenter: ${healthcareCenter} and oxygenRequirement: ${oxygenRequirement} and patientDiagnosis: ${patientDiagnosis}`
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});