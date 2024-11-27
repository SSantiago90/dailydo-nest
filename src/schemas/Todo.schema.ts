
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  date: Date;

  @Prop()
  task: string;

  @Prop()
  done: boolean;

  @Prop()
  isNote: 0 | 1 | 2 | 3;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
