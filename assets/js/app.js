// store results from ajax response
var resultsArray = [];


var articleDiv = $("#articleDiv");

$("#submit").on("click", function () {
  event.preventDefault();


  console.log("hello meg");

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var searchTerm = $("#searchTerm").val();
  var beginDate = $("#startYear").val();
  var endDate = $("#endYear").val();

  clearInputs();





  var apiKey = "api-key=13f66eaf1f7c4fb0a904aca253257c12";
  $.ajax({
    type: "get",
    url: url + apiKey + "&q=" + searchTerm + "&begin_date=" + beginDate + "0101" + "&end_date=" + endDate + "1231",
    success: function (response) {
      var len = response.response.docs.length;
      for (var i = 0; i < len; i++) {
        resultsArray.push(response.response.docs[i]);
      }
      displayResults(len);
    },
    fail: function (error) {
      console.log(error);
    }
  });


});


function displayResults(len) {
  for (var i = 0; i < len; i++) {
    var header = resultsArray[i].headline.main;
    var link = resultsArray[i].web_url;
    var blankDiv = $("<div>");
    blankDiv.addClass("articleContainer");
    var headerEle = $("<h2 class='myHeader'>");
    console.log(headerEle);
    headerEle.text(header);
    blankDiv.append(headerEle);
    var linkEle = $("<a>");
    linkEle.attr({
      "href": link,
      "target": "_blank",
      "class": "generic"
    });
    linkEle.text(link);
    blankDiv.append(linkEle);
    articleDiv.append(blankDiv);

  }
}

function clearInputs() {
  $("#searchTerm").val("");
  $("#startYear").val("");
  $("#endYear").val("");
}

$("#clear").on("click", function () {
  $("#articleDiv").empty();

})