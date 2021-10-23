import app from "..";
import supertest from "supertest";
import { Student } from "../../src/entities/Students"

jest.mock('../../src/db/students', () => {
  const originalModule = jest.requireActual("../../src/db/students");
  const students = [{
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 2,
    name: "John Doe 2",
    email: "john.doe2@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 3,
    name: "John Doe 3",
    email: "john.doe3@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 4,
    name: "John Doe 4",
    email: "john.doe4@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  }];

  return {
    __esModule: true,
    ...originalModule,
    getStudents: jest.fn((id: number, student: Student) => {
      if (id == null)
        return Promise.resolve(Object.freeze([...students]));

      let index = students.findIndex((element) => element.id == id);
      if (index == -1) return Promise.resolve(false);

      return Promise.resolve(Object.freeze(students[index]));;
    }),
    addStudent: jest.fn((student: Student) => {
      const newStudent = {
        id: students.length ? students[students.length - 1].id! + 1 : 1,
        ...student,
      };
      students.push(Object.freeze(newStudent));
      return Promise.resolve(newStudent);
    }),
    deleteStudent: jest.fn((id: number) => {
      let index = students.findIndex((element) => element.id == id);
      if (index == -1) return Promise.resolve(false);

      students.splice(index, 1);
      return Promise.resolve(index != -1);
    }),
    putStudent: jest.fn((id: number, student: Student) => {
      let index = students.findIndex((element) => element.id == id);
      if (index == -1) return Promise.resolve(false);

      students[index] = { id, ...student };
      return Promise.resolve(true);
    })
  }
})

/*jest.mock("../../src/db/students", () => {
  const originalMock = jest.requireActual("../../src/db/students");

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    },
  ];

  return {
    __esModule: true,
    ...originalMock,
    getStudents: jest.fn(() => Promise.resolve(students)),
  };
});*/

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body[0]).toMatchObject(
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          })
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 5, ...newStudent }));
  });

  it("should update student", async () => {
    const updateStudent = {
      id: 1,
      name: "John Doe 3",
      email: "john.doe.3@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/studentsUpdate")
      .send(updateStudent)
      .expect(200)
      .then((res) => expect(res.body).toMatchObject(updateStudent));
  });

  it("should not update student", async () => {
    const updateStudent = {
      id: 6,
      name: "John Doe 3",
      email: "john.doe.3@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/studentsUpdate")
      .send(updateStudent)
      .expect(304)
      .then((res) => expect(res.body).toMatchObject({}));
  });

  it('should delete a student', async () => {
    const studentID = 1;

    await supertest(app)
      .delete("/students/"+studentID)
      .expect(200)
      .then((res) => expect(res.body).toMatch('Ok'));
  });

  it('should delete a student', async () => {
    const studentID = 100;

    await supertest(app)
      .delete("/students/"+studentID)
      .expect(404)
      .then((res) => expect(res.body).toMatch('Não Encontrado'));
  });

});
