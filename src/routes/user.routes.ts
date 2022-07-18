import express from 'express';
import { nanoid } from 'nanoid';
import { users } from '../data';
import { User } from '../types';

export const userRouter = express.Router();

userRouter
  .route('/')
  .get((req, res) => {
    res.status(200).send(users);
  })
  .post((req, res) => {
    const newUser: User = { id: nanoid(5), ...req.body };
    users.push(newUser);
    res.status(201).send(newUser);
  });

userRouter
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    // Find the user with the given id using the find array method.
    const user = users.find((userObject) => userObject.id === id);
    // Check if the user does not exist and if not then send the 404 status.
    if (!user) res.status(404).send(`User with id ${id} Not Found`);

    res.status(200).send(user);
  })
  .patch((req, res) => {
    const { id } = req.params;
    const user = users.find((userObject) => userObject.id === id);
    if (!user) res.status(404).send(`User with id ${id} Not Found`);

    const userIndex = users.findIndex((user) => user.id === id);
    const updatedUser = { ...user, ...req.body };
    users.splice(userIndex, 1, updatedUser);

    res.status(200).send(updatedUser);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) res.status(404).send(`User with id ${id} Not Found`);

    users.splice(userIndex, 1);
    res.sendStatus(204);
  });
