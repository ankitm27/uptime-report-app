function checkStatus(){
    var websiteName = document.getElementById("websitename").value;
    fetch('http://127.0.0.1:3000/checkuptime?websitename=' + websiteName).then(res => res.json())
        .then(json => {
            console.log(json)
            document.getElementById("result").value = json.data;
        });
}