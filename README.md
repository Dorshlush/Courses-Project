This is a courses registration website, Created with react and postgresql DB.
The assignment was the create a registration courses website with login and registration forms, that will show every user
the courses that he registered to. Every user can register to each course one time and every time the course is reaching the students limit(22 students)
the system should create a new course on the same subject.
I created the data tables manually.
on the backEnd I used express,Joi(npm-package for validations)and JWT-token for validations.
on the frontEnd I used react, axios,react-router-dom, and I took inspiration from free css designs that I found online.


//DataBase
The way decided to arrange the data base in 3 table
courses=id,name,user_id(foreign key),subject_id(foreign key),course_number ===>   this table represent every registration to any of the courses.
subject=subject_id,subject,rating,level ===>    this table represent to courses that are available.
users=user_id,name,password,email ===>    this table represent the registered users. 


