import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { Subscriber, SubscriberSchema } from 'src/schema/subscriber.schema';
import { MongooseModule } from '@nestjs/mongoose';

//register the schema
@Module({
  imports: [MongooseModule.forFeature([{ name: Subscriber.name, schema: SubscriberSchema }])],
  providers: [SubscriberService],
  controllers: [SubscriberController]
})
export class SubscriberModule {}
