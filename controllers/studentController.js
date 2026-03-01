import Student from "../models/student.js";

 
 
 export async function createStudent(req, res) {
    if(req.user == null){
        res.status(403).json({
            message : "unauthorized access you need to login before creating student"
        })
        return;
    }
    
    
    try{
       
       const newStudent = new Student({
            name : req.body.name,
            age : req.body.age,
            grade : req.body.grade

       });

      await newStudent.save()
      res.json({ 
            message : "Student Added Successfully"

    });
    
    } catch (error) {
       
        console.log("Error while creating student:", error);
        
    
    }
}



 export function getStudents(req, res) {

     Student.find().then(
            
            (student)=>{
                
               
                 res.json(student);
            
            }
        )

    }