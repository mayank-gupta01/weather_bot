import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModule } from './subscriber/subscriber.module';
import { WeatherModule } from './weather/weather.module';
import config from './config/keys';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { BlockModule } from './block/block.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.dev.env' }), MongooseModule.forRoot(config.mongoURI), ScheduleModule.forRoot(), TelegramModule, SubscriberModule, WeatherModule, AdminModule, BlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
