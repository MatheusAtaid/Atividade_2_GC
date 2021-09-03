import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

function updateStudent(student: Student) {
  for(let c = 0; c < students.length; c++){
    if(students[c].id == student.id){
      students[c] = Object.freeze(student);
      return Promise.resolve(students[c]);
    }
  }

  return null;
}

export { addStudent, getStudents, updateStudent };
