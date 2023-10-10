import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
    constructor(private readonly blockService: BlockService) { }

    @Post()
    addBlockedUser(@Body() record: any): any {
        return this.blockService.block(record);
    }

    @Get('/:chatId')
    findBlockedUser(@Param('chatId') chatId: string): any {
        return this.blockService.findBlockUser(chatId);
    }

}
