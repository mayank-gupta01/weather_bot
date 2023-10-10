import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createBlockDto } from 'src/dto/create-block.dto';
import { Block } from 'src/schema/block.schema';

@Injectable()
export class BlockService {
    constructor(@InjectModel(Block.name) private blockModel : Model<Block>){}

    async block(createBlockDto: createBlockDto):Promise<Block>{
        console.log(createBlockDto);
        const blocked = new this.blockModel(createBlockDto);
        return blocked.save();
    }

    async findBlockUser(chatId : string) : Promise<Block> {
        return this.blockModel.findOne({chatId});
    }
}
