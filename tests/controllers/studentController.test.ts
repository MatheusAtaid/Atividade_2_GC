import app from "..";
import supertest from "supertest";

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
      .then((res) => expect(res.body).toMatchObject({ id: 3, ...newStudent }));
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
      .post("/students/"+studentID)
      .expect(200)
      .then((res) => expect(res.body).toMatch('Ok'));
  });

});
