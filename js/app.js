$(document).addClass('loader');

$(document).ready(function () {

  //hide loading page
  $(document).removeClass('loader');
  $(document).addClass('loader hidden');

  //pull artilces source #1
//  var fourFourTwoUrl = "https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v1/articles?source=four-four-two&sortBy=top&apiKey=a2338a9170cc47568d71f04f33d03d6d";
  var fourFourTwoUrl = "https://newsapi.org/v1/articles?source=four-four-two&sortBy=top&apiKey=a2338a9170cc47568d71f04f33d03d6d";
  $.get(fourFourTwoUrl, function(results){
  console.log(results);
    results.articles.forEach(function(result){
      var $newArticle = $('<article>').addClass('article');

      //section for the image
      var $newArticleImage = $('<section>').addClass('featuredImage');
      var $theImage = $('<img>').attr('src', result.urlToImage).attr('alt', '');
      $newArticleImage.append($theImage);

      //section for the content
      var $newArticleContent = $('<section>').addClass('articleContent');
      var articleHref = '#';
      var $newArticleA = $('<a>').attr('href', articleHref);
      $newArticleA.append('<h3>'+result.title+'</h3>');
      $newArticleContent.append($newArticleA);
      $newArticleContent.append('<h6>' + 'Soccer, because source is four-four-two' + '</h6>');

      //section for the impressions
      var $newArticleImpressions = $('<section>').addClass('impressions');
      var numImpressions = 123; // can't find a value in the APIs :(
      $newArticleImpressions.append(numImpressions);

      //div for clearfix
      var $newArticleDiv = $('<div>').addClass('clearfix');

      $newArticle.append($newArticleImage, $newArticleContent, $newArticleImpressions, $newArticleDiv);






  //    var articleTitle = result.title;
//      $newArticle.append('<h3>'+articleTitle+'</h3>');


      $('#main').append($newArticle);
    //  $("ul").append("<li>"+result.content.title+"</li>")


    })
  })
});

$('a h3').click(function() {
  console.log("Clicked a title");
  $('#popUp').removeClass('loader hidden');

  $('.closePopUp').click(function(){
    $('#popUp').addClass('loader hidden');

  });
});
