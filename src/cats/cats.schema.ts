import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  
  @Prop({
    require: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Prop({
    require: true,
    nique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    require: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    require: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
