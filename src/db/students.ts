import { Student } from "../types/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 2,
    name: "Jose",
    email: "Jose@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  }
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  var newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

function deleteStudents(id: Number) {
  var index = students.findIndex(x => x.id === id);
  if (index > -1) {
    students.splice(index, 1);
  }
  return Promise.resolve(index);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

function updateStudent(student: Student) {
  return new Promise<null|Student>((resolve) => {
    const id = students.findIndex(element => element.id == student.id);

    if(id == -1)
      resolve(null);

    students[id] = student;
    resolve(students[id]);
  });
}

export { addStudent, getStudents, updateStudent, deleteStudents};
