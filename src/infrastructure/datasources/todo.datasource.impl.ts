import { prisma } from '@/data/postgres';
import { TodoDatasource } from '@/domain/datasources';
import { CreateTodoDto, UpdateTodoDto } from '@/domain/dtos';
import { TodoEntity } from '@/domain/entities';
import { CustomException } from '@/domain/exceptions';




export class TodoDatasourceImpl implements TodoDatasource {
 
  async findAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async findOne(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) throw new CustomException(`Todo with id ${ id } not found`, 404);

    return TodoEntity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject( todo );
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findOne( updateTodoDto.id );

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
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
