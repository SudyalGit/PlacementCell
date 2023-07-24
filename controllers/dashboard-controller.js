const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');

module.exports.dashboard = async function(req, res){
    const students = await Student.find({});
    // console.log(students);
    const interviews = await Interview.find({}).sort('date_of_visit');
    interviews.forEach(interview => {
        interview.company = interview.company.charAt(0) + interview.company.slice(1).toLowerCase();
        interview.date_of_visit = interview.date_of_visit.toLocaleDateString();
    })
    return res.render('dashboard', {
        students: students,
        interviews: interviews
    });
}

module.exports.createStudent = async function(req, res){
    const student = await Student.findOne({email: req.body.email});
    console.log(student);
    if(student){
        req.flash('error', 'Student already exists!');
        console.log('Student already exists!');
        return res.redirect('back');
    }
    const data = req.body;
    const newStudent =await Student.create({
        email: data.email,
        name: data.name,
        batch: data.batch,
        college: data.college,
        scores: {
            dsa: data.dsa,
            webd: data.webd,
            react: data.react
        }
    });

    if(!newStudent){
        req.flash('error', 'Error in creating a student!');
        console.log(`Error in creating student`);
    }

    req.flash('success', `Student ${newStudent.name} created successfully.`);
    return res.redirect('back');
}

module.exports.createInterview = async function(req, res){
    console.log(req.body);
    const formData = {
        company: req.body.company.toUpperCase(),
        date_of_visit: req.body.date_of_visit
    }
    const interview = await Interview.findOne(formData);
    console.log(interview);
    if(interview){
        req.flash('error', 'Interview already exists!');
        console.log(`Interview is already scheduled for ${req.body.company} on ${req.body.date_of_visit}!`);
        return res.redirect('back');
    }

    const newInterview =await Interview.create(formData);
    if(!newInterview){
        req.flash('error', 'Error in creating interview!');
        console.log(`Error in creating an interview: ${err}`);
        return res.redirect('back');
    }
    await Result.create({
        interview: newInterview
    });

    req.flash('success', `Interview creadted successfull- Company: ${formData.company}, Date: ${formData.date_of_visit}`);
    return res.redirect('back');

}
