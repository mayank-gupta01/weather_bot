import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import keys from 'src/config/keys';

@Injectable()
export class WeatherService {
    private client : AxiosInstance

    constructor(){
        this.client = axios.create({
            baseURL: `${process.env.WEATHER_BASE_URL}`,
            params: {
                APPID: `${process.env.APPID}`,
                units: 'metric'
            }
        });
    }

    async getWeatherByCity(city : string):Promise<object> {
        const res = await this.client.get('weather',{
            params: {q:city}
        })
        return res.data;
    }
}
