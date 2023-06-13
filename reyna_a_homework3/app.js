const demoController = new (require('./controller/demoController'))();
const studentController = new (require('./controller/studentController'))(); 
const departmentController = new (require('./controller/departmentController'))();


async function demo() {
    try {
        let result = await demoController.getDatabases();
        if(result.length > 0) {
            console.log("BK_ Tables Exist");
        }
    } catch (e) {
        console.log(`You BK_ Tables might be missing!: ${e.sqlMessage}`);
    }
}

/** 8: getStudentRecord **/
async function getStudentRecord(name) {
    try {
        let students = await studentController.getStudentByName(name);
        if(students.length > 0) {
            console.log("Bk_Student exists");
            for(let student of students){
                let department = await departmentController.getDepartmentByName(student.dept_name);
                console.log(`Student record for: ${student.ID} \n \t Department: ${student.dept_name} \n\t Home building: ${department[0].building} \n\t Total Credits: ${student.tot_cred}`);
            }
        } 
    } catch (e) {
        console.log(`Your Bk_Student table might be missing!: ${e.sqlMessage}`);
    }
}

/** 2. createDepartment **/
async function createDepartment(dept) {
    let department = await departmentController.getDepartmentByName(dept.dept_name);
    try {
        
        if(department.length > 0){
            console.log(department);
            console.log(`${department.dept_name} already exists`)
            
        }
        else {
            await departmentController.addDepartment(dept);
            let deptInfo = await departmentController.getDepartmentByName(dept.dept_name);
            console.log(deptInfo[0]);
        }
    } catch (e) {
        console.log(`Your BK_Department table might be missing!: ${e.sqlMessage}`);
    }
}

(async function main() {
    let input = parseInt(process.argv[2]); // cast to int
    console.log(`Your input was: ${input}`);

    switch (input) {
        case 0:
            // Demo: Check for BK_ Tables in your database
            await demo();
            break;
        case 1:
            // Fetching Data
            let studentName = process.argv[3];
            console.log(`Your argument was: ${studentName}`);
            await getStudentRecord(studentName); 
            break;
        case 2:
            // Posting Data
            let department = JSON.parse(process.argv[3]);
            console.log(`Your argument was: ${department}`);
            await createDepartment(department); 
            break;
        default:
            console.log("Connection Successful: Welcome to HW3!");
            break;
    }

    process.exit(0);
})();