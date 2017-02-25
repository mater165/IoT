var req = new XMLHttpRequest();

req.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var response = JSON.parse(this.responseText);
    var things   = response.things;
    console.log("Response:", this.responseText);
  }
});

req.open("GET", "https://api.disruptive-technologies.com/v1/things");
req.setRequestHeader("authorization", "ApiKey <token>");
req.setRequestHeader("accept", "text/json");
req.setRequestHeader("cache-control", "no-cache");

req.send(null);