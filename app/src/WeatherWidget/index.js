import React from "react";
import Store from "../contextStore";

import {
    EuiStat,
    EuiFlexItem,
    EuiFlexGroup,
    EuiImage,
    EuiSpacer,
    EuiTextAlign,
    EuiTextColor,
    EuiText,
    EuiDescriptionList,
    EuiDescriptionListTitle,
    EuiDescriptionListDescription
  } from '@elastic/eui';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export default class extends React.Component {
    static contextType = Store;

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false,
        };
    }

    formatUTCDate = (unixDate) => {
        const date = new Date(unixDate*1000);
        return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getUTCMonth()]}`;
    }

    getDayOfWeek = (unixDate) => {
        const date = new Date(unixDate*1000);
        return DAYS[date.getDay()].toLowerCase();
    }

    render() {
        const { result } = this.context.state;

        if( !result || (result && result.cod !== "200")) return null;
        
        // First item is today
        const today = result.list[0];
        const todayForecast = today.weather.length ? today.weather[0] : false

        // Group by date
        const forecastCalendar = result.list.reduce((prevState, currentValue, index) => {
            // get the date
            const date = new Date(currentValue.dt * 1000);
            const dateKey = date.getDate();
            
            if( !prevState[dateKey] ) {
                prevState[dateKey] = [];
            }

            prevState[dateKey].push(currentValue);
            
            return prevState;
        }, []).map((day, indx) => {
            
            const forecast = day[0];
            const dayWeather = forecast.weather.length ? forecast.weather[0] : false;
            
            if( !forecast ) return null;

            return (
                <EuiFlexItem key={`day-${indx}`}>
                    <EuiText size="s">
                        <EuiTextAlign textAlign="center">
                            <p><strong>{this.formatUTCDate(forecast.dt)}</strong></p>
                        </EuiTextAlign>
                    </EuiText>
                    <EuiTextAlign textAlign="center">
                        {dayWeather && <EuiImage
                            size="s"
                            alt={dayWeather.description}
                            url={`http://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`}
                        />}
                    </EuiTextAlign>
                    <EuiDescriptionList align="center" compressed>
                        <EuiDescriptionListTitle>{dayWeather.description}</EuiDescriptionListTitle>
                        <EuiDescriptionListDescription>
                            {`Wind: ${forecast.wind.speed} m/s`}
                        </EuiDescriptionListDescription>
                    </EuiDescriptionList>
                    <EuiSpacer size="xl" />
                    <EuiStat title={`${Math.ceil(forecast.main.temp)} °C`} description={`Temperature`} textAlign="center" titleSize="m"  />
                    <EuiSpacer size="xl" />
                    <EuiStat title={`${forecast.main.humidity} %`} description={`Humidity`} textAlign="center" titleSize="m"  />
                    <EuiSpacer size="xl" />
                    <EuiStat title={`${forecast.clouds.all} %`} description={`Cloudiness`} textAlign="center" titleSize="m"  />
                </EuiFlexItem>
            );
        });

        return (
            <div>
                <EuiSpacer size="xxl" />
                <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false} style={{  width: "90%", margin: "0 auto" }}>
                        <EuiFlexGroup>
                            <EuiFlexItem grow={false} style={{  width: "20%" }}>
                                {/* Title */}
                                <EuiText size="s">
                                    <EuiTextAlign textAlign="center">
                                        <h1 className="text-weight-bold">
                                            <EuiTextColor>{`${result.city.name}, ${result.city.country}`}</EuiTextColor>
                                        </h1>
                                        <p><strong>{this.formatUTCDate(today.dt)}</strong></p>
                                    </EuiTextAlign>
                                </EuiText>
                                <EuiTextAlign textAlign="center">
                                    {todayForecast && <EuiImage
                                        size="s"
                                        alt={todayForecast.description}
                                        url={`http://openweathermap.org/img/wn/${todayForecast.icon}@2x.png`}
                                    />}
                                </EuiTextAlign>
                                <EuiDescriptionList align="center" compressed>
                                    <EuiDescriptionListTitle>{todayForecast.description}</EuiDescriptionListTitle>
                                    <EuiDescriptionListDescription>
                                        {`Wind: ${today.wind.speed} m/s`}
                                    </EuiDescriptionListDescription>
                                </EuiDescriptionList>
                                <EuiSpacer size="xl" />
                                <EuiStat title={`${Math.ceil(today.main.temp)} °C`} description={`Temperature`} textAlign="center" titleSize="m"  />
                                <EuiSpacer size="xl" />
                                <EuiStat title={`${today.main.humidity} %`} description={`Humidity`} textAlign="center" titleSize="m"  />
                                <EuiSpacer size="xl" />
                                <EuiStat title={`${today.clouds.all} %`} description={`Cloudiness`} textAlign="center" titleSize="m"  />
                                
                            </EuiFlexItem>
                            <EuiFlexItem grow={false} style={{  width: "80%" }}>
                                <EuiFlexGroup>
                                    {forecastCalendar}
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        )
    }

}