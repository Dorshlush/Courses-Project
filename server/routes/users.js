const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const authorization = require("../middlewares/authorization");

router.post( "/getUserByEmail",async (req, res) => {
  try {
    const { email } = req.body;
    const emailsQuery = `SELECT * FROM users WHERE email='${email}'`;
    const result = await db.query(emailsQuery);
    const user = result.rows[0];
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
router.route("/adduser").post(async (req, res) => {
  const { name, password, email } = req.body;
  const emailsQuery = `SELECT email FROM users WHERE email='${email}'`;
  const result = await db.query(emailsQuery);

  if (result.rows[0]) {
    res.status(400).send("User Alredy exist");
    
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query = `INSERT INTO users ( name, password, email) VALUES ( '${name}', '${hashedPassword}', '${email}')`;

    try {
      await db.query(query);
      const token=generateJWT(email)
      
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "user created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding user" });
    }
  }
});

router.post("/signup",authorization,async (req, res) => {
  const { user_id, subject } = req.body;
  //getting subject_id based on the subject name i got from the Front
  const subjectIdQuery = `SELECT subject_id FROM subjects WHERE subject = '${subject}'`;
  const subjectIdRows = await db.query(subjectIdQuery);
  let subjectId = subjectIdRows?.rows[0].subject_id
  if(subjectId==="undefined"){
    subjectId=0
  }
  const checkIfUserRegisteredQuery = `SELECT * FROM courses WHERE user_id = ${user_id} AND subject_id='${subjectId}'`;
  const checkIfUserRegistered=await db.query(checkIfUserRegisteredQuery)
  if(checkIfUserRegistered.rows[0]){
    res.status(400).send("User Alredy registered to this subject");
    
  }
  else{

  try {
    //checking if there are any coureses with the same subjecy_id
    const checkCourseQuery = `SELECT * FROM courses WHERE subject_id = ${subjectId}`;
    
    const checkCourseRows = await db.query(checkCourseQuery);
    const courseArray = checkCourseRows.rows;
    let loopLength1 = courseArray.length;
    let loop_length = Math.ceil(loopLength1 / 22);
    
    let courseNum=1;
    for (let i = 1; i <= loop_length + 1; i++) {
      const checkCourseNumQuery=`SELECT * FROM courses WHERE course_number=${courseNum} `
      let checkCourseNumRows=await db.query(checkCourseNumQuery)
      if (checkCourseNumRows.rowCount < 22||checkCourseNumRows.rowCount === undefined) {
        courseNum = i;
        break
      }
      else{
      courseNum++;
    }
  } 
    // Create row in the table
    const course_number = courseNum;
    const name = `${subject} `;
    const newCourseQuery = `INSERT INTO courses (name, user_id, subject_id, course_number) VALUES ('${name}', '${user_id}', '${subjectId}','${course_number}') `;
    await db.query(newCourseQuery);
    res.status(200).send("Successfully signed up for course!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to sign up for course.");
  }
}});

module.exports = router;

//deleting the course from the courses table, and "leaving" the course
router.delete("/leavecourse/:user_id/:name",authorization,async (req, res) => {
  const { user_id, name } = req.params;
  console.log(name)
  console.log(user_id)
  try {
    const result = await db.query(
      `DELETE FROM courses WHERE user_id = ${user_id} AND name = '${name} '`
    );
    console.log(name)
    console.log(user_id)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course" });
  }
});
module.exports = router;

//get all users courses
router.post( "/getUserCourses",authorization, async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await db.query(
      `SELECT courses.name as name, courses.user_id, subjects.rating, subjects.level,courses.subject_id,courses.course_number, users.name as user_name 
    FROM courses 
    JOIN subjects ON courses.subject_id = subjects.subject_id
    JOIN users ON courses.user_id = users.user_id 
    WHERE courses.user_id = '${user_id}'`
    );
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user courses" });
  }
});
module.exports = router;

router.put("/changepassword",authorization,async(req,res)=>{
  const {user_id,currentPassword,newPassword}=req.body
  const salt = await bcrypt.genSalt(10);
  const newPasswordHashed= await bcrypt.hash(newPassword,salt)
  const passwordResult=await db.query(`SELECT * FROM users WHERE user_id=${user_id}`)
  const valiedPassword = await bcrypt.compare(currentPassword,passwordResult.rows[0].password);
      if(valiedPassword){
  try {
    const result=await db.query(`UPDATE users
    SET password = '${newPasswordHashed}'
    WHERE user_id = ${user_id}`)
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    
  }
}})




function generateJWT(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, "secretkey", options);}