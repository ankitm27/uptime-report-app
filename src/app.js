function checkStatus() {
    var websiteName = document.getElementById("websitename").value;
    console.log("navigator.onLine", navigator.onLine);
    if (!navigator.onLine) {
        fetch('http://127.0.0.1:3000/checkuptime?websiteName=' + websiteName).then(res => res.json())
            .then(json => {
                console.log(json);
                document.getElementById("result").innerHTML = json.data;
            });
    } else {
        console.log("interner not working");
        var db = openDatabase('websiteDb1', '1.0', 'DB', 2 * 1024 * 1024);

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS websiteData (id unique, websiteName)');
            tx.executeSql('INSERT INTO websiteData (id, websiteName) VALUES (3, ?)',[websiteName]);
            tx.executeSql('INSERT INTO websiteData (id, websiteName) VALUES (4, ?)',[websiteName]);
            //msg = '<p>Log message created and row inserted.</p>';
            //document.querySelector('#status').innerHTML =  msg;
        });

        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM websiteData', [], function (tx, result) {
                console.log("result",result);
                var len = result.rows.length, i;
                console.log("len",len);
                //msg = "<p>Found rows: " + len + "</p>";
                //document.querySelector('#status').innerHTML +=  msg;

                //for (i = 0; i < len; i++){
                //    msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                //    document.querySelector('#status').innerHTML +=  msg;
                //}
            }, null);
        });
    }
}