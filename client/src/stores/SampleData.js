const sampleData = JSON.parse(`{
    "total": 413,
    "chartData": [
        {
            "provider": "DriveNow",
            "amount": 6.09,
            "date": "2017-03-16T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.76,
            "date": "2017-03-16T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 9.06,
            "date": "2017-03-20T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 20.95,
            "date": "2017-03-27T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 4.38,
            "date": "2017-03-27T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 6.78,
            "date": "2017-04-20T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 13.24,
            "date": "2017-04-23T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 7.2,
            "date": "2017-05-09T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 14.26,
            "date": "2017-05-30T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": -5.04,
            "date": "2017-06-01T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 5.04,
            "date": "2017-06-01T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 6.76,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 12.22,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 4.4,
            "date": "2017-07-03T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "amount": 1.39,
            "date": "2017-07-11T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 8.68,
            "date": "2017-07-19T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 12.82,
            "date": "2017-07-30T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 3.64,
            "date": "2017-08-03T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 3.74,
            "date": "2017-08-06T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "amount": 6.2,
            "date": "2017-08-13T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 10.17,
            "date": "2017-08-13T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 6.78,
            "date": "2017-08-15T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 4.4,
            "date": "2017-08-15T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 3.17,
            "date": "2017-08-27T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 5.32,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 6.89,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.65,
            "date": "2017-08-30T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 11.18,
            "date": "2017-09-05T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 16.52,
            "date": "2017-09-13T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.41,
            "date": "2017-09-19T22:00:00.000Z"
        },
        {
            "provider": "Drive By",
            "amount": 22.32,
            "date": "2017-09-20T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 25.2,
            "date": "2017-10-01T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 21.28,
            "date": "2017-10-05T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 6.82,
            "date": "2017-10-08T22:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 7.82,
            "date": "2017-10-10T22:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 4.42,
            "date": "2017-10-16T22:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 19.32,
            "date": "2017-10-19T22:00:00.000Z"
        },
        {
            "provider": "Drive By",
            "amount": 9.14,
            "date": "2017-10-28T22:00:00.000Z"
        },
        {
            "provider": "Emmy",
            "amount": 2.27,
            "date": "2017-10-29T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 3.17,
            "date": "2017-11-03T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 6.78,
            "date": "2017-11-04T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.65,
            "date": "2017-11-04T23:00:00.000Z"
        },
        {
            "provider": "Multicity",
            "amount": 2.8,
            "date": "2017-11-09T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 6.5,
            "date": "2017-11-09T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.03,
            "date": "2017-11-17T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 5.76,
            "date": "2017-11-18T23:00:00.000Z"
        },
        {
            "provider": "Car2Go",
            "amount": 24.5,
            "date": "2017-11-19T23:00:00.000Z"
        },
        {
            "provider": "DriveNow",
            "amount": 11.16,
            "date": "2017-11-24T23:00:00.000Z"
        }
    ],
    "providers": [
        {
            "name": "DriveNow",
            "color": "#0080A6"
        },
        {
            "name": "Car2Go",
            "color": "#009ee3"
        },
        {
            "name": "Emmy",
            "color": "#EE3124"
        },
        {
            "name": "Multicity",
            "color": "#a11d6a"
        },
        {
            "name": "Drive By",
            "color": "#45bdac"
        }
    ]
}`);

export default sampleData;
