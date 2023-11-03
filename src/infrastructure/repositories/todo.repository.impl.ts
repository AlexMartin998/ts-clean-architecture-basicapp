import { TodoDatasource, TodoEntity, TodoRepository } from '@/domain';


export class TodoRepositoryImpl implements TodoRepository {

  ///* DI
  constructor(private readonly datasource: TodoDatasource) {}


  findAll(): Promise<TodoEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<TodoEntity> {
    return this.datasource.findOne(id);
  }

  create(todo: TodoEntity): Promise<TodoEntity> {
    return this.datasource.create(todo);
  }

  update(todo: TodoEntity): Promise<TodoEntity> {
    return this.datasource.update(todo);
  }

  delete(id: number): Promise<boolean> {
    return this.datasource.delete(id);
  }

}
