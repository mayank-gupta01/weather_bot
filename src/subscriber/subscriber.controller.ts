import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService){}
    @Post()
    createSubscriber(@Body() record: any): any {
        return this.subscriberService.create(record);
    }

    @Get()
    findSubscriber():any{
        return this.subscriberService.findAll();
    }

    @Get('/:id')
    findSubscriberById(@Param('id') id:string):any{
        const chatId = id;
        return this.subscriberService.findChatId(chatId);
    }

    @Delete('/:id')
    deleteSubscriberById(@Param('id') id:string):any{
        const chatId = id;
        return this.subscriberService.deleteSubscriber(chatId);
    }
}
