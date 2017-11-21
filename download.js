var express = require('express');
var app = express();
var http = require("http");


// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  var options = {
  host: 'www.google.com',
  port: 80,
  path: '/index.html'
};
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");

//var url = "http://www.bloglovin.com/en/blogs/1/2/all";
var myArray = [];
var a = 0;

var getLinks = function(url){
  download(url, function(data) {
  if (data) {
     console.log(data);
    var $ = cheerio.load(data);
  }else{
      console.log("no data");
  }
  //  $(".content").each(function(i, e) {

  //    var blogName = $(e).find(".blog-name").text();
  //    var followLink = $(e).find("a").attr("href");
  //    var blogSite = $(e).find(".description").text();

  //    myArray[a] = [a];
  //    myArray[a]["blogName"] = blogName;
  //    myArray[a]["followLink"] = "http://www.bloglovin.com"+followLink;
  //    myArray[a]["blogSite"] = blogSite;

  //    a++;

//      console.log($(".table_deathrow")[0]);

    //});

});
}

//request("http://www.tdcj.state.tx.us/death_row/dr_info/cardenasruben.html", function (error, response, html) {
//if (!error && response.statusCode == 200) {/
//  var $ = cheerio.load(html);/
//  console.log($(".table_deathrow"));
//}



var url = require('url');
var request = require('request');

app.get('/download', function (req, res) {
  url = req.query.q;

var scraper = require('table-scraper');
scraper.get(url)
  .then(function(tableData) {

if(tableData.length > 0){
    var datos = {
      "educationLevel": tableData[0][5]['1'],
      "gender": tableData[0][10]['2'],
      "nativeCounty":tableData[0][15]['2'],
      "nativeState":tableData[0][16]['2']
    };

    var salida = [
      tableData[0][5]['1'],
      tableData[0][10]['2'],
      tableData[0][15]['2'],
      tableData[0][16]['2']
    ];

}
   console.log(datos);
    res.status(200).send(salida);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
