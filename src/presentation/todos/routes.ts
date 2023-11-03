import { Router } from 'express';

import { TodosController } from './controller';
import { TodoDatasourceImpl, TodoRepositoryImpl } from '@/infrastructure';


export class TodoRoutes {

  static get routes(): Router {
    const router = Router();

    ///* DI
    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const todoController = new TodosController(todoRepository);


    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);

    router.post('/', todoController.createTodo);
    router.patch('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  }

}
