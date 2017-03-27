
$(document).ready(function () {


// Pull artilces source #1: FourFourTwo
 var apiKeyAppend = "&apiKey=a2338a9170cc47568d71f04f33d03d6d";

 var hackerNewsUrl = 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top';
 var nytUrl ='https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top';
 var fourFourTwoUrl = 'https://newsapi.org/v1/articles?source=four-four-two&sortBy=top';

 var allUrls = [hackerNewsUrl, nytUrl, fourFourTwoUrl];

//generic request to fetch articles from a source and add to page
var requestArticles = function(results, status){
   if (status !== "success") {
     alert('Could not pull results');
   } else {
     results.articles.forEach(function(result){
       var $newArticle = $('<article>').addClass('article');

       //section for the image
       var $newArticleImage = $('<section>').addClass('featuredImage');
       if (result.urlToImage === null) {
         var $theImage = $('<img>').attr('src', 'images/article_placeholder_1.jpg').attr('alt', '');
       } else {
         var $theImage = $('<img>').attr('src', result.urlToImage).attr('alt', '');
       }
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
       $('#popUp').addClass('hidden');

       //prepare the popUp content
       //title for popUp
       var $newPopUpTitle = $('<h1>'+result.title+'</h1>').addClass('hidden');

       //description for popUp
       if (result.description === null) {
         var $newPopUpDescription = $('<p>').text("No description available :(").addClass('hidden');
       } else {
         var $newPopUpDescription = $('<p>'+result.description+'</p>').addClass('hidden');
       }

       //link for popUp
       var articleUrl = result.url;
       var $newPopUpLink = $('<a target="_blank">'+'Read more from source'+'</a>').attr('href', articleUrl).addClass('popUpAction hidden');

       $('#popUp .container').append($newPopUpTitle, $newPopUpDescription, $newPopUpLink);

     })
   }
 };

//Populate feed with articles from all 3 sources
 allUrls.forEach(function(sourceUrl) {
    $.get(sourceUrl + apiKeyAppend, requestArticles);
 });







//Clicking on articles
$('#main').click('article', function() {
  //clear any existing content
  $("#popUp .container").children().addClass('hidden');
//  $("#popUp .container h1").addClass('hidden');
  //$("#popUp .container p").addClass('hidden');
  //$("#popUp .container a").addClass('hidden');

  //identify the index of the h3 clicked
  var articleIndex = $(event.target).index('h3');

  //show that exact article
  $("#popUp .container h1:nth-of-type(" + (articleIndex + 2) + ")").removeClass("hidden");
  $("#popUp .container p:nth-of-type(" + (articleIndex + 2) + ")").removeClass("hidden");
  $("#popUp .container a:nth-of-type(" + (articleIndex + 2) + ")").removeClass("hidden");

  //reveal the populated popUp
  $('#popUp').removeClass('loader hidden');

  //close the popUp
  $('.closePopUp').click(function(){
    $('#popUp').addClass('hidden');
  });

});


  //Dropdown filter for each source
  $('#hacker').click(function() {
    $('#popUp').removeClass('hidden');
    $('.article').remove();
    $.get(hackerNewsUrl + apiKeyAppend, requestArticles);
  });

  $('#nytimes').click(function() {
    $('#popUp').removeClass('hidden');
    $('.article').remove();
    $.get(nytUrl + apiKeyAppend, requestArticles);
  });

  $('#fourfour').click(function() {
    $('#popUp').removeClass('hidden');
    $('.article').remove();
    $.get(fourFourTwoUrl + apiKeyAppend, requestArticles);
  });

  //Search button functionality
  $('#search').click(function(){
    $(this).toggleClass('active');
  })

  //Clicking the Feedr logo displays the default feed
  $('#title').click(function(){
    $('#popUp .container').empty();
    $('#popUp').removeClass('hidden');
    $('.article').remove();
    allUrls.forEach(function(sourceUrl) {
       $.get(sourceUrl + apiKeyAppend, requestArticles);
    });
  })

});
