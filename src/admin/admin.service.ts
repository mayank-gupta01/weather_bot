import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createAdminDto } from 'src/dto/create-admin.dto';
import { Admin } from 'src/schema/admin.schema';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel : Model<Admin>){}

    async create(createAdminDto: createAdminDto): Promise<Admin> {
        console.log(createAdminDto);
        const createdAdmin = new this.adminModel(createAdminDto);
        return createdAdmin.save();
    }
    async findEmail(emailId: string):Promise<Admin>{
        return this.adminModel.findOne({emailId});
    }
}

