import * as StudentsDB from "../db/students";
import { request, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async hello(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(req.body.name);
  }

  async deleteStudents(req: Request, res: Response) {
    // delete the post
    await StudentsDB.deleteStudents(Number(req.params.id));
    // return response
    return res.status(StatusCodes.OK).json('Ok');
  };
  
  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    const updateStudent = await StudentsDB.updateStudent(req.body);

    if(updateStudent == null)
      return res.status(StatusCodes.NOT_MODIFIED).json(null);
    return res.status(StatusCodes.OK).json(updateStudent);
  }
}
