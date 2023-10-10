import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';


@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService){};

    @Get()
    async root():Promise<object>{
        const res = this.weatherService.getWeatherByCity('Delhi');
        return res;
    }
}
