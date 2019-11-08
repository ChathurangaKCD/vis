import { Router } from "express";
import { Service } from "./Service";
import db from "./db";

const router = Router();

router.get(`/services`, (_, res) => {
  return res.send(db.getData("/services"));
});

router.get(`/services/:id`, (req, res) => {
  const serviceId = parseInt(req.params.id);
  const result = db
    .getData("/services")
    .filter((s: Service) => s.id === serviceId)[0];
  if (result) {
    return res.send(result);
  }
  return res.sendStatus(404);
});

router.post(`/services`, (req, res) => {
  const newService: Service = req.body;
  if (isNaN(newService.id) || !newService.dependsOn) {
    return res.status(400).send({ error: "Invalid request body" });
  }

  // check for duplicate IDs
  // Note that there is no validation for the service Id's provided in the dependsOn array
  const services: Service[] = db.getData("/services");
  for (let i = 0; i < services.length; i++) {
    if (services[i].id == newService.id)
      return res.status(400).send({
        error: `Service Id: ${newService.id} already exists`
      });
  }

  db.push("/services[]", newService, true);
  return res.sendStatus(201);
});

router.put(`/services`, (req, res) => {
  const service: Service = req.body;
  if (isNaN(service.id) || !service.dependsOn) {
    return res.status(400).send({ error: "Invalid request body" });
  }
  const services: Service[] = db.getData("/services");
  let index = -1;
  for (let i = 0; i < services.length; i++) {
    if (services[i].id == service.id) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return res.status(400).send({
      error: `Service Id: ${service.id} doesn't exist`
    });
  }
  db.delete(`/services[${index}]`);
  db.push("/services[]", service, true);
  return res.sendStatus(201);
});

router.delete(`/services/:id`, (req, res) => {
  const serviceId = parseInt(req.params.id);
  const services: Service[] = db.getData("/services");

  let index = -1;
  for (let i = 0; i < services.length; i++) {
    if (services[i].id == serviceId) {
      index = i;
      break;
    }
  }

  if (index >= 0) {
    db.delete(`/services[${index}]`);
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
});

export default router;
