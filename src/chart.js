function checkReport() {
    var websiteName = document.getElementById('websiteName');
    fetch('http://127.0.0.1:3000/getData?websiteName=' + websiteName).then(res => res.json())
        .then(json => {
            console.log(json);
            let dataPoints = [];
            json.forEach((dataRow) => {
                dataPoints.push({x:dataRow.timeStamp, y: parseInt(dataRow.data)});
            });
            console.log("data points", dataPoints);
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Simple Line Chart"
                },
                axisY: {
                    includeZero: false
                },
                data: [{
                    type: "line",
                    dataPoints: dataPoints
                }]
            });
            chart.render();
        });
}