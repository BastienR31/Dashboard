import { TodolistModule } from './todolist.module';

describe('TodolistModule', () => {
  let todolistModule: TodolistModule;

  beforeEach(() => {
    todolistModule = new TodolistModule();
  });

  it('should create an instance', () => {
    expect(todolistModule).toBeTruthy();
  });
});
