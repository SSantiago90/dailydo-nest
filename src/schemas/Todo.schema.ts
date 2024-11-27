
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

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
  date: Date;

  @Prop()
  task: string;

  @Prop()
  done: boolean;

  @Prop()
  isNote: 0 | 1 | 2 | 3;


}

export const TodoSchema = SchemaFactory.createForClass(Todo);

