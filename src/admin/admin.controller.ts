import { Controller, Get, Body, Post,Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Get('/:emailId')
    findEmailId(@Param('emailId') emailId : string) : any{
        return this.adminService.findEmail(emailId);
    }

    @Post()
    createAdmin(@Body() record : any) : any{
        return this.adminService.create(record);
    }

}
