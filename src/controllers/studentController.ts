import * as StudentsDB from "../db/students";
import { request, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async deleteStudents(req: Request, res: Response) {
    // delete the post
    const newStudent = await StudentsDB.deleteStudents(Number.parseInt(req.params.id));
    // return response
    return res.status(StatusCodes.OK);
  };
  
  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }
}
