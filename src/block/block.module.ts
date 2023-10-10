import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { Block, BlockSchema } from 'src/schema/block.schema';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [MongooseModule.forFeature([{name:Block.name, schema: BlockSchema}])],
  providers: [BlockService],
  controllers: [BlockController]
})
export class BlockModule {}
