import { prisma } from '@/data/postgres';
import { TodoDatasource, TodoEntity } from '@/domain';


export class TodoDatasourceImpl implements TodoDatasource {

  async findAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async findOne(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromObject(todo);
  }

  async create(todo: TodoEntity): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({ data: todo });

    return TodoEntity.fromObject(newTodo);
  }

  async update(todo: TodoEntity): Promise<TodoEntity> {
    await this.findOne(todo.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: todo,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async delete(id: number): Promise<boolean> {
    await this.findOne(id);
    const deleted = await prisma.todo.delete({
      where: { id },
    });

    if (!deleted?.id) return false;

    return true;
  }

}
