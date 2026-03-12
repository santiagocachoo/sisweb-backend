import { RequestHandler, Request, Response } from "express";
import { Tier } from "../models/tier";

// Create new tier
export const createTier: RequestHandler = (req: Request,res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
  }

  const tier = { ...req.body };

  Tier.create(tier)
    .then((data: Tier | null) => {
      return res.status(201).json({
        status: "success",
        message: "Tier successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened creating a tier. " + err.message,
        payload: null,
      });
    });
};

// Get all tiers
export const getAllTiers: RequestHandler = (req: Request,res: Response) => {
  Tier.findAll()
    .then((data: Tier[]) => {
      return res.status(200).json({
        status: "success",
        message: "Tiers successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message:
          "Something happened retrieving all tiers. " + err.message,
        payload: null,
      });
    });
};

// Get tier by ID
export const getTierById: RequestHandler = (req: Request,res: Response) => {
  Tier.findByPk(Number(req.params.id))
    .then((data: Tier | null) => {
      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "Tier not found",
          payload: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Tier successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving a tier. " + err.message,
        payload: null,
      });
    });
};

// Modify tier
export const modifyTier: RequestHandler = (req: Request,res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  Tier.update({ ...req.body }, { where: { id_tier: Number(req.params.id) } })
    .then(([updatedRows]) => {
      if (updatedRows > 0) {
        return res.status(200).json({
          status: "success",
          message: "Tier successfully updated",
          payload: { ...req.body },
        });
      }

      return res.status(404).json({
        status: "error",
        message: "Tier not found",
        payload: null,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened updating a tier. " + err.message,
        payload: null,
      });
    });
};

// Delete tier
export const deleteTier: RequestHandler = (req: Request,res: Response) => {
  Tier.destroy({ where: { id_tier: Number(req.params.id) } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        return res.status(200).json({
          status: "success",
          message: "Tier successfully deleted",
          payload: { id_tier: Number(req.params.id) },
        });
      }

      return res.status(404).json({
        status: "error",
        message: "Tier not found",
        payload: null,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Error deleting tier. " + err.message,
        payload: null,
      });
    });
};
