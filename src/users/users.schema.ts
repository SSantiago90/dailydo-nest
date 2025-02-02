
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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
export class User {
  @Prop({ required: true , unique: true , nullable: false})
  email: string;

  @Prop({ required: true , nullable: false })
  password: string;

  @Prop()
  name: string;
  
  @Prop({default: "user"})
  role: string
  
  @Prop()
  deletedAt: Date;
  
  @Prop()
  id: string;


}


export const UserSchema = SchemaFactory.createForClass(User);

