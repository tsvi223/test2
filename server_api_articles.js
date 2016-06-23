var q       = require('q');
var request = require('request');
var fs = require("fs");
var noodle = require('noodlejs');
var xray = require('x-ray');
var cheerio = require("cheerio");
var osmosis = require('osmosis');
var scrape  = require("scrape");

//deMarker
function getDeMarker(url){
    var d = q.defer();
    var result = {};
 var queries = {
        "url" : url,
    
         "type": "html",
         "map": {
             
              "article_head": {
            "selector": "h1.h-mb--xxtight",
            "extract": "text"
        },
        
          "article_sub_head": {
            "selector": "p.t-delta",
            "extract": "text"
        },
        "article1": {
            "selector": "article p",
            "extract": "text"
        },
        "article2": {
            "selector": "section.article__entry p",
            "extract": "text"
        }
         }
           
       
    }
  // דה מרקר
noodle.query(queries).then(function (results) {
                                 
        result.article = "";
         result.title = results.results[0].results.article_head[0];
         result.sub_title = results.results[0].results.article_sub_head[0];
         try {
             results.results[0].results.article1.forEach(function(item){
              result.article =   result.article  + item + " ";
         });     
         } catch (e) {
              results.results[0].results.article2.forEach(function(item){
              result.article =   result.article  + item + " ";
         }); 
             
         }
         
           console.log(result);
             var to_replace = /\t|\r|\n/g;
          result.article = result.article.replace(to_replace, "");
          result.article = result.article.replace(" לכתבה המלאה בשליחת תגובה זו הנני מצהיר שאני מסכים/מסכימה עם תנאי השימוש של אתר הארץ תגובתך נקלטה בהצלחה, ותפורסם על פי מדיניות המערכת אנא נסה שנית במועד מאוחר יותר","")
                return d.resolve(result);

        })

    return d.promise;
} 

//ynet
function getYnet(url){
    var d = q.defer();
       var string_final = "" ,  text = ""
        
            var result = {}
        var result_article = '';    
        scrape.request(url, function (err, $) {
            if (err) return console.error(err);
            
            $('div.art_header_title').each(function(div){ console.log(div);
                result.title =  div.children[0].data;
            })
            
            $('div.art_header_sub_title').each(function(div){ console.log(div);
                result.sub_title =  div.children[0].data;
            })
            
            $('div.text14').each(function (div) {   
                div.children[0].children.forEach(function(di){
                    
                    //console.log(di.name,"  ",di.data);
                    if(di.data)// && result_article.indexOf(di.name) == -1)
                         result_article  = result_article + di.data + " ";
                  try {
                      
                      if(di.name == 'p' || di.name == 'font'){
//console.log(di.children[0].data);
                        di.children.forEach(function(item_child){
                            try {
                                if(item_child.name == "font" )//&&result_article.indexOf(item_child.children[0].data) == -1)
                                    result_article = result_article + item_child.children[0].data + " " ;
                                   // console.log(item_child.children[0].data);
                            } catch (e) {}
                           if(item_child.data )//&& result_article.indexOf(item_child.data) == -1)
                               {  
                                   result_article = result_article + item_child.data + " " ;
                               //console.log(item_child.name," ",item_child.data);
                               }
                           //   if(item_child.name == 'font') {
                             //     console.log(item_child.children[0].data);
                                
                                
                            //}
                        
                        })
                          
                      }
                 
                  } catch (e) {
                      
                  }
                       
                })
               while(result_article.indexOf("&nbsp;") != -1){
                result_article = result_article.replace("&nbsp;","")}
                while(result_article.indexOf("&quot;") != -1){
                result_article = result_article.replace("&quot;","")}
                result.article = result_article;
                return d.resolve(result);
                    console.log(result);
             })
          
    }); 
         
         
  return d.promise;
}

//walla 
function getWalla(url){
    
      var d = q.defer();
       var string_final = "" ,  text = ""
        
            var result = {}
        var result_article = '';    
        scrape.request(url, function (err, $) {
            if (err) return console.error(err);
            $('h1.title').each(function(div){
                result.title =  div.children[0].data;
            })
            
            $('h2.subtitle').each(function(div){
                result.sub_title =  div.children[0].data;

            })
            
            $('section.article-content').each(function(div){// console.log(div.children[0]);
              // console.log(div)
                div.children.forEach(function(di){
                    
                    //console.log(di.name,"  ",di.data);

                        
                 try {
                      //  console.log(di.name );
                      if(di.name == 'section'){
//console.log(di.children[0].data);
                        di.children.forEach(function(item_child){
                            try {
                                if(item_child.name == "p" )//&&result_article.indexOf(item_child.children[0].data) == -1)
                                if(item_child.children[0].data == "לקריאה נוספת:"){
                                 return;
                                }
                            
                                item_child.children.forEach(function(child){
                                    if(child.name == "a" && child.children && child.children[0] && child.children[0].data)
                                        result_article  = result_article + child.children[0].data + " ";
                    
                                     else {if(child.data)
                                         result_article  = result_article + child.data + " ";
                                     }
                                })
                             
                                
                                   
                            } catch (e) {}
                          // if(item_child.data )//&& result_article.indexOf(item_child.data) == -1)
                            //   {  
                              //     result_article = result_article + item_child.data + " " ;
                               //console.log(item_child.name," ",item_child.data);
                               //}
                           //   if(item_child.name == 'font') {
                             //     console.log(item_child.children[0].data);
                                
                                
                            //}
                         
                        })
                        
                          
                      }
                
                 
                }
               catch(rr){
                   
               } 
            
             })
             
             
             while(result_article.indexOf("undefined") != -1){
                result_article = result_article.replace("undefined","")}
                result.article = result_article;
              console.log(result)
                 return d.resolve(result);
    }); 
         
        })
  return d.promise;
}

exports.API = function(req, res, next){
    var chec_type = req.body.url.split(".");
    console.log(chec_type);
    if(chec_type[1] == 'ynet'){
        getYnet(req.body.url).then(function(result){
            res.render("index",{result,result});
        })
    }
     if(chec_type[1] == 'themarker'){
        getDeMarker(req.body.url).then(function(result){
            res.render("index",{result,result});
        })
    }
     if(chec_type[1] == 'walla'){
        getWalla(req.body.url).then(function(result){
            res.render("index",{result,result});
        })
    }
    
    
}


