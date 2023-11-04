import request from 'supertest';

import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres/index';

describe('[TodoRoutes]: Test suite', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todos = [{ text: 'Hello World 1' }, { text: 'Hello World 2' }];

  it('should return todos when calling /api/todos', async () => {
    await prisma.todo.createMany({
      data: todos,
    });

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(todos.length);
    expect(body[0].text).toBe(todos[0].text);
    expect(body[1].text).toBe(todos[1].text);
  });

  it('should return a todo when calling /api/todo/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[0] });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt,
    });
  });

  test('should return 404 if TODO not found', async () => {
    const id = 12121212;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(404);
    expect(body).toEqual({ error: `Todo with id ${id} not found` });
  });

  ///* POST
  test('should return a new Todo api/todos', async () => {
    const todo = todos.at(0);
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo?.text,
      completedAt: null,
    });
  });

  test('should return an error if text is not present api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400);

    expect(body).toEqual({ error: 'Text property is required' });
  });
  test('should return an error if text is empty api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual({ error: 'Text property is required' });
  });

  ///* UPDATE
  test('should return an updated TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[0] });

    const { body } = await request(testServer.app)
      .patch(`/api/todos/${todo.id}`)
      .send({ text: 'Hola mundo UPDATE', completedAt: '2023-10-21' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Hola mundo UPDATE',
      completedAt: '2023-10-21T00:00:00.000Z',
    });
  });
  test('should return 404 if TODO not found', async () => {
    const id = 9_999_333;
    const { body } = await request(testServer.app)
      .patch(`/api/todos/${id}`)
      .send({ text: 'Hola mundo UPDATE', completedAt: '2023-10-21' })
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${id} not found` });
  });
  test('should return an updated TODO only the date', async () => {
    const todo1 = todos[0];
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .patch(`/api/todos/${todo.id}`)
      .send({ completedAt: '2023-10-21' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: '2023-10-21T00:00:00.000Z',
    });
  });

  ///* DELETE
  test('should delete a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[0] });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(204);

    expect(body).toEqual({});
  });

  test('should return 404 if todo do not exist api/todos/:id', async () => {
    const id = 9_999_333;

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${id}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${id} not found` });
  });
});
