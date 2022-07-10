import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";




@Injectable()
export class CatRepository{
  constructor(@InjectModel(Cat.name)private readonly catModel: Model<Cat>){}


  async findCatByEmail(email: string): Promise<Cat | null>{
    const cat = await this.catModel.findOne({email});
    return cat;
  }

  async findCatbyIdWithoutPassword(catId: string): Promise<Cat | null>{
    
    const cat = await this.catModel.findById(catId).select('-password')

    return cat;
  }
  

  async existByEmail(email: string): Promise<boolean> {
    const id = await this.catModel.exists({email});
    let result : boolean;

    if(id)
      result = true;
    else
      result = false;

      return result;
  } 

}