import { Request, Response } from 'express';

import { TodoRepository } from '@/domain';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';


export class TodosController {

  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}



  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.findAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findOne(id);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    try {
      const todo = await this.todoRepository.create(createTodoDto!);
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    // prevent to upd id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    try {
      const updatedTodo = await this.todoRepository.update(updateTodoDto!);
      return res.json(updatedTodo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    
    try {
      await this.todoRepository.delete(id);
      return res.status(204).send(); // 204 without body
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

}
