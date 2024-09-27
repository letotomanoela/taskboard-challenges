import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 8000;
const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/task", async (req, res, next) => {
  const result = await prisma.task.findMany();
  res.status(200).json(result);
});

app.post("/api/task", async (req, res, next) => {
  const body = req.body;
  const result = await prisma.task.create({
    data: {
      ...body,
    },
  });
  res.status(200).json(result);
});
app.get("/api/task/:id", async (req, res, next) => {
  const { id } = req.params as { id: string };
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(result);
});
app.put("/api/task/:id", async (req, res, next) => {
  const { id } = req.params as { id: string };
  console.log("HERE");
  const body = req.body;
  const result = await prisma.task.update({
    where: {
      id,
    },
    data: { ...body },
  });
  res.status(200).json(result);
});

app.delete("/api/task/:id", async (req, res, next) => {
  const { id } = req.params as { id: string };
  const result = await prisma.task.delete({
    where: {
      id,
    },
  });
  res.status(200).json(result);
});

app.listen(PORT, () => console.log("SERVER RUNNING ON PORT: ", PORT));
