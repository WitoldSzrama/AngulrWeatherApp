import {Weather} from './weather.model'
import {Geocode} from './geocode.model'

export class Forecast {
    constructor(public geocode:Geocode, public currently:Weather, public hourly:Weather,public daily:Weather){}
}