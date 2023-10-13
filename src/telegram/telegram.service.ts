import { Injectable, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

const moment = require('moment')
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    //create a variable 
    private readonly bot: any

    constructor() {
        const token = "6526380523:AAGh6KbEk_GtQy7xFB30EJwlWXffMOit6k8"
        this.bot = new TelegramBot(token, { polling: true });
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        //check whether user is blocked or not
        //listen to /start event
        this.bot.onText(/\/start/, async (msg: any) => {
            const chatId = msg.chat.id;
            console.log(msg);

            try {
                //check whether user blocked or not
                const isBlocked = await this.userBlocked(chatId);
                if (!isBlocked) {
                    const weatherData = await this.getWeatherData();
                    // console.log(weatherData);
                    this.bot.sendMessage(chatId, `Welcome to the Daily Weather Report Bot`)
                    await delay(500)
                    this.printWeatherData(chatId, weatherData)
                    await delay(500)
                    this.bot.sendMessage(chatId, `For getting daily weather report:\n/subscribe : Subscribe the channel\n/unsubscribe : Unsubscribe the channel`)
                }

            } catch (error) {
                console.log("Error in start event", error);
            }
        });

        //listen to subscribe event
        this.bot.onText(/\/subscribe/, async (msg: any) => {
            try {
                const chatId = msg.chat.id;
                const firstName = msg.chat.first_name;
                const lastName = msg.chat.last_name;
                //check whether user blocked or not
                const isBlocked = await this.userBlocked(chatId);
                if (!isBlocked) {
                    //Make a get request to your server
                    const isExistingSubscriber = await this.existingSubscriber(chatId);

                    // Make a POST request to your server
                    if (!isExistingSubscriber) {
                        this.sendSubscriptionRequest(chatId, firstName, lastName);
                        this.bot.sendMessage(chatId, `Thank you, for subscribing our channel!\nYou'll receive weather report every day at 10 AM.`);
                    }
                    else
                        this.bot.sendMessage(chatId, 'You already a subscriber');
                }
            } catch (error) {
                console.error("Error in subscriber event", error);
            }
        });

        this.bot.onText(/\/unsubscribe/, async (msg: any) => {
            try {
                const chatId = msg.chat.id;

                //check whether user blocked or not
                const isBlocked = await this.userBlocked(chatId);

                if (!isBlocked) {
                    const isExistingSubscriber = await this.existingSubscriber(chatId);
                    console.log("......................" + isExistingSubscriber);

                    if (isExistingSubscriber) {
                        this.requestForDelete(chatId);
                        this.bot.sendMessage(chatId, 'You are now unsubscribed!');
                    } else {
                        this.bot.sendMessage(chatId, 'You are not a subscriber');
                    }
                }
            } catch (error) {
                console.error("Error in Unsubscriber event", error);
            }
        });
    }

    //scheduleing a job
    // need to update the time
    @Cron('30 4 * * *')
    async schedulingJobs() {
        const botSubscribers = await this.requestForGetAll();
        const weatherData = await this.getWeatherData();

        for (let subObject of botSubscribers) {
            let cid = subObject.chatId;
            console.log(cid);
            this.printWeatherData(cid, weatherData);
        }
    }

    // whether user blocked or not
    private async userBlocked(chatId: string) {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/block/${chatId}`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error getting Blocked user', error);
        }
    }

    // Function to send a POST request to your server
    private async sendSubscriptionRequest(chatId: string, firstName: string, lastName: string) {
        try {

            const response = await axios.post(`${process.env.BASE_URL}/subscriber`, {
                chatId,
                firstName,
                lastName,
            });

            console.log('Subscription request sent:', response.data);
        } catch (error) {
            console.error('Error sending subscription request:', error);
        }
    }

    //check is already subscriber
    private async existingSubscriber(chatId: string) {
        try {
            const res = await axios.get(`${process.env.BASE_URL}/subscriber/${chatId}`);
            console.log(res);
            return res.data;
        } catch (error) {
            console.error('Error sending in existing user info request:', error);
        }
    }

    //delete the subscriber
    private async requestForDelete(chatId: string) {
        try {
            await axios.delete(`${process.env.BASE_URL}/subscriber/${chatId}`);
        } catch (error) {
            console.error('Error sending unsubscription request:', error);
        }
    }

    //get all the subscriber
    private async requestForGetAll() {
        try {
            const res = await axios.get(`${process.env.BASE_URL}/subscriber`);
            return res.data;
        } catch (error) {
            console.error('Error in fetching all the subscriber:', error);
        }
    }

    //get weather data
    private async getWeatherData() {
        try {
            const res = await axios.get(`${process.env.BASE_URL}/weather`);
            return res.data;
        } catch (error) {
            console.error('Error in fetching weather data:', error);
        }
    }

    //print weather data
    private async printWeatherData(chatId: string, weatherData: any) {
        try {
            const sunRise = moment.unix(weatherData.sys.sunrise).format('HH:mm');
            const sunSet = moment.unix(weatherData.sys.sunset).format('HH:mm');

            this.bot.sendMessage(chatId, `Today's weather report:\nTemperature: ${weatherData.main.temp}°C\nHumidity: ${weatherData.main.humidity}%\nWind-speed: ${weatherData.wind.speed} km/h\nSunrise: ${sunRise}\nSunset: ${sunSet}`)
        } catch (error) {
            console.error('Error in printing data:', error);
        }
    }
}
