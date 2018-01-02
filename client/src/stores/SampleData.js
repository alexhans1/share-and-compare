const sampleData = JSON.parse(`{
    "total": 534.43,
    "chartData": [
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.09,
            "date": "2017-03-16T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.76,
            "date": "2017-03-16T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 9.06,
            "date": "2017-03-20T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 20.95,
            "date": "2017-03-27T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 4.38,
            "date": "2017-03-27T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.78,
            "date": "2017-04-20T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 13.24,
            "date": "2017-04-23T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 7.2,
            "date": "2017-05-09T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 14.26,
            "date": "2017-05-30T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": -5.04,
            "date": "2017-06-01T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 5.04,
            "date": "2017-06-01T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 4.48,
            "date": "2017-06-29T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.76,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 12.22,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 4.4,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 8.96,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "type": "scooter",
            "amount": 1.39,
            "date": "2017-07-11T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 8.68,
            "date": "2017-07-19T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 12.82,
            "date": "2017-07-30T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 3.64,
            "date": "2017-08-03T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 3.74,
            "date": "2017-08-06T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 27.5,
            "date": "2017-08-06T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 10.17,
            "date": "2017-08-13T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 4.5,
            "date": "2017-08-13T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "type": "scooter",
            "amount": 6.2,
            "date": "2017-08-13T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.78,
            "date": "2017-08-15T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 4.4,
            "date": "2017-08-15T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 3.17,
            "date": "2017-08-27T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 2.5,
            "date": "2017-08-27T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.89,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.65,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 5.32,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 11.18,
            "date": "2017-09-05T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 3,
            "date": "2017-09-10T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 16.52,
            "date": "2017-09-13T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.41,
            "date": "2017-09-19T22:00:00.000Z"
        },
        {
            "provider": "Drive By",
            "type": "car",
            "amount": 22.32,
            "date": "2017-09-20T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 19.5,
            "date": "2017-09-25T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 25.2,
            "date": "2017-10-01T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 21.28,
            "date": "2017-10-05T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 6.82,
            "date": "2017-10-08T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 2.5,
            "date": "2017-10-08T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 7.82,
            "date": "2017-10-10T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 4.42,
            "date": "2017-10-16T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 19.32,
            "date": "2017-10-19T22:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 4.5,
            "date": "2017-10-22T22:00:00.000Z"
        },
        {
            "provider": "Drive By",
            "type": "car",
            "amount": 9.14,
            "date": "2017-10-28T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "type": "scooter",
            "amount": 2.27,
            "date": "2017-10-29T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 3.17,
            "date": "2017-11-03T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 6.78,
            "date": "2017-11-04T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.65,
            "date": "2017-11-04T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 6.5,
            "date": "2017-11-09T23:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "type": "car",
            "amount": 2.8,
            "date": "2017-11-09T23:00:00.000Z"
        },
        {
            "provider": "LIDL-BIKE",
            "type": "bike",
            "amount": 1.5,
            "date": "2017-11-12T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.03,
            "date": "2017-11-17T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 5.76,
            "date": "2017-11-18T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 24.5,
            "date": "2017-11-19T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "type": "car",
            "amount": 11.16,
            "date": "2017-11-24T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 4.34,
            "date": "2017-12-04T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 24.37,
            "date": "2017-12-07T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "type": "car",
            "amount": 13.78,
            "date": "2017-12-14T23:00:00.000Z"
        }
    ],
    "providers": [
        {
            "name": "DriveNow",
            "color": "#0080A6",
            "type": "car"
        },
        {
            "name": "Car2Go",
            "color": "#009ee3",
            "type": "car"
        },
        {
            "name": "LIDL-BIKE",
            "color": "#88B42B",
            "type": "bike"
        },
        {
            "name": "Emmy",
            "color": "#EE3124",
            "type": "scooter"
        },
        {
            "name": "Multicity",
            "color": "#a11d6a",
            "type": "car"
        },
        {
            "name": "Drive By",
            "color": "#45bdac",
            "type": "car"
        }
    ]
}`);

export default sampleData;
