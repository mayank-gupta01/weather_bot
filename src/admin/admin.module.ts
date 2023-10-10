import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from 'src/schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
