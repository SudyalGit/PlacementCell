const Employee = require('../models/employee');
const Student = require('../models/student');
const Interview = require('../models/interview');

const fastCsv = require('fast-csv');

module.exports.download = async function (req, res) {
  try {
    const jsonData = await Student.find().select('email name batch college status scores');

    const filename = 'student.csv';
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    const csvWriteStream = fastCsv.format({ headers: true });
    csvWriteStream.pipe(res);

    jsonData.forEach((row) => {
      const { email, name, batch, college, status, scores } = row;
      const { dsa, webd, react } = scores;
      csvWriteStream.write({ email, name, batch, college, status, dsa, webd, react });
    });

    csvWriteStream.end();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
};
