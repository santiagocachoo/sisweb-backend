import { RequestHandler, Request, Response } from "express";
import { EmpresaMiembro } from "../models/empresaMiembro";

// Create new empresa miembro
export const createEmpresaMiembro: RequestHandler = (req: Request,res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
  }

  const empresaMiembro = { ...req.body };
  EmpresaMiembro.create(empresaMiembro)
    .then((data: EmpresaMiembro | null) => {
      return res.status(201).json({
        status: "success",
        message: "EmpresaMiembro successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened creating an EmpresaMiembro. " + err.message,
        payload: null,
      });
    });
};

// Get all empresa miembros
export const getAllEmpresaMiembros: RequestHandler = (req: Request,res: Response) => {
  EmpresaMiembro.findAll()
    .then((data: EmpresaMiembro[]) => {
      return res.status(200).json({
        status: "success",
        message: "EmpresaMiembros successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message:
          "Something happened retrieving all EmpresaMiembros. " + err.message,
        payload: null,
      });
    });
};

// Get empresa miembro by ID
export const getEmpresaMiembroById: RequestHandler = (req: Request,res: Response) => {
  EmpresaMiembro.findByPk(Number(req.params.id))
    .then((data: EmpresaMiembro | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "EmpresaMiembro not found",
          payload: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "EmpresaMiembro successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving an EmpresaMiembro. " + err.message,
        payload: null,
      });
    });
};

// Modify empresa miembro
export const modifyEmpresaMiembro: RequestHandler = (req: Request,res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  EmpresaMiembro.update({ ...req.body }, { where: { id: Number(req.params.id) } })
    .then(([updatedRows]) => {
      if (updatedRows > 0) {
        return res.status(200).json({
          status: "success",
          message: "EmpresaMiembro successfully updated",
          payload: { ...req.body },
        });
      }

      return res.status(404).json({
        status: "error",
        message: "EmpresaMiembro not found",
        payload: null,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened updating an EmpresaMiembro. " + err.message,
        payload: null,
      });
    });
};

// Delete empresa miembro
export const deleteEmpresaMiembro: RequestHandler = (req: Request,res: Response) => {
  EmpresaMiembro.destroy({ where: { id: Number(req.params.id) } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        return res.status(200).json({
          status: "success",
          message: "EmpresaMiembro successfully deleted",
          payload: { id: Number(req.params.id) },
        });
      }

      return res.status(404).json({
        status: "error",
        message: "EmpresaMiembro not found",
        payload: null,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Error deleting EmpresaMiembro. " + err.message,
        payload: null,
      });
    });
};
