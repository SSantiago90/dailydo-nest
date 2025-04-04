// src/schemas/todo.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Todo {
  @Prop()
  task: string;

  @Prop()
  date: Date;

  @Prop()
  done: boolean;

  @Prop()
  isNote: 0 | 1 | 2 | 3;

  @Prop()
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);