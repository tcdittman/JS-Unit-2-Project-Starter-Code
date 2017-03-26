$(document).addClass('loader');


$(document).ready(function () {

  //hide loading page
  $(document).removeClass('loader');
  $(document).addClass('loader hidden');




// Pull artilces source #1: FourFourTwo
 var apiKeyAppend = "&apiKey=a2338a9170cc47568d71f04f33d03d6d";

 var hackerNewsUrl = 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top';
 var nytUrl ='https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top';
 var fourFourTwoUrl = 'https://newsapi.org/v1/articles?source=four-four-two&sortBy=top';

 var allUrls = [hackerNewsUrl, nytUrl, fourFourTwoUrl];

//generic request to fetch articles from a source and add to page
var requestArticles = function(results, status){
   console.log(status);
   if (status !== "success") {
     alert('Could not pull results from FourFourTwo');
   } else {
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
       $newArticleContent.append('<h6>' + results.source + '</h6>');

       //section for the impressions
       var $newArticleImpressions = $('<section>').addClass('impressions');
       var numImpressions = 123; // can't find a value in the APIs :(
       $newArticleImpressions.append(numImpressions);

       //div for clearfix
       var $newArticleDiv = $('<div>').addClass('clearfix');

       $newArticle.append($newArticleImage, $newArticleContent, $newArticleImpressions, $newArticleDiv);

       $('#main').append($newArticle);
     })
   }
 };

// fetch all articles
 allUrls.forEach(function(sourceUrl) {
    $.get(sourceUrl + apiKeyAppend, requestArticles);
 });







//Clicking on articles
$('.articleContent').click('a', function() {
  console.log("Clicked a title");


  $('#popUp').removeClass('loader hidden');

  $('.closePopUp').click(function(){
    $('#popUp').addClass('loader hidden');
  });

});

  $('#hacker').click(function() {
    $('.article').remove();
    $.get(hackerNewsUrl + apiKeyAppend, requestArticles);
  });

  $('#nytimes').click(function() {
    $('.article').remove();
    $.get(nytUrl + apiKeyAppend, requestArticles);
  });

  $('#fourfour').click(function() {
    $('.article').remove();
    $.get(fourFourTwoUrl + apiKeyAppend, requestArticles);
  });


});
