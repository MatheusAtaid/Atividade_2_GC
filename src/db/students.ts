import { Student } from "../entities/Students";
import { Entity, getConnection } from "typeorm";

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
async function addStudent(student: Student) {
  const newStudent = new Student(student);

  const repository = await getConnection().getRepository(Student);

  const createdStudent = await repository.save(newStudent);

  return createdStudent;
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find();

async function deleteStudents(id: number) {
  return Promise.resolve(await getConnection().getRepository(Student).delete(id));
}

/*function deleteStudents(id: Number) {
  var index = students.findIndex(x => x.id === id);
  if (index > -1) {
    students.splice(index, 1);
  }
  return Promise.resolve(index);
}*/

function updateStudent(student: Student) {
  return new Promise<null|Student>((resolve) => {
    const id = student.id;
    const property = getConnection().getRepository(Student).findOne({
      where: { id }
    });

    return getConnection().getRepository(Student).save({
      ...property, // existing fields
      ...student // updated fields
    });
  });
}

export { addStudent, getStudents, updateStudent, deleteStudents};
