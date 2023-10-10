import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { createSubscriberDto } from 'src/dto/create-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber } from 'src/schema/subscriber.schema';
@Injectable()
export class SubscriberService {
    constructor(@InjectModel(Subscriber.name) private subscriberModel : Model<Subscriber>){}

    async create(createSubscriberDto: createSubscriberDto): Promise<Subscriber> {
        console.log(createSubscriberDto);
        const createdSubscriber = new this.subscriberModel(createSubscriberDto);
        return createdSubscriber.save();
    }

    async findAll() : Promise<Subscriber[]> {
        return this.subscriberModel.find().exec();
    }

    async findChatId(chatId : string) : Promise<Subscriber> {
        return this.subscriberModel.findOne({chatId});
    }

    async deleteSubscriber(chatId:string) : Promise<void>{
        await this.subscriberModel.deleteOne({chatId});
    }
}
