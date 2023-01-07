const  axios = require("axios")
const cheerio = require("cheerio")
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

var regex = /\d+/g;

function tryFindElement(elem)
{
	if(elem.find("small").eq(0).html())
	{
		return parseInt(elem.find("small").eq(0).html().match(regex)[0]);
	}
	
	return 0;
}

function formatDate(date)
{
	var parts = date.split('.')
	
	return parts[2] + '-' + parts[1] + '-' + parts[0];
}

function formatDayId(date)
{
	var parts = date.split('.')
	
	return Number(parts[2] + parts[1] + parts[0]);
}

const URL = 'https://index.minfin.com.ua/ua/russian-invading/casualties/'

var articles = []

exports.handler =  async function(event, context) {

    console.log("Lambda start");

    await axios(URL).then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)    
  
        $('.gold:first', htmlData).each((index, element) => {
            let obj = {
              day: formatDayId($(element).find("span").html()),
              date: formatDate($(element).find("span").html()),
              personnel: parseInt($(element).find('li').eq(12).html().match(regex)[0]),
              personnelDetla: tryFindElement($(element).find("li").eq(12)),
              tanks: parseInt($(element).find("li").eq(0).html().match(regex)[0]),
              tanksDelta: tryFindElement($(element).find("li ").eq(0)),
              afv: parseInt($(element).find("li").eq(1).html().match(regex)[0]),
              afvDelta: tryFindElement($(element).find("li ").eq(1)),
              artillery: parseInt($(element).find("li").eq(2).html().match(regex)[0]),
              artilleryDelta: tryFindElement($(element).find("li ").eq(2)),
              mlrs: parseInt($(element).find("li").eq(3).html().match(regex)[0]),
              mlrsDelta: tryFindElement($(element).find("li").eq(3)),
              adf: parseInt($(element).find("li").eq(4).html().match(regex)[0]),
              adfDelta: tryFindElement($(element).find("li").eq(4)),
              jets: parseInt($(element).find("li").eq(5).html().match(regex)[0]),
              jetsDelta: tryFindElement($(element).find("li").eq(5)),
              helicopters: parseInt($(element).find("li").eq(6).html().match(regex)[0]),
              helicoptersDelta: tryFindElement($(element).find("li").eq(6)),
              uav: parseInt($(element).find("li").eq(7).html().match(regex)[0]),
              uavDelta: tryFindElement($(element).find("li").eq(7)),
              cruiseMissiles: parseInt($(element).find("li").eq(8).html().match(regex)[0]),
              cruiseMissilesDelta: tryFindElement($(element).find("li").eq(8)),
              warShips: parseInt($(element).find("li").eq(9).html().match(regex)[0]),
              warShipsDelta: tryFindElement($(element).find("li").eq(9)),
              vehicles: parseInt($(element).find("li").eq(10).html().match(regex)[0]),
              vehiclesDelta: tryFindElement($(element).find("li").eq(10)),
              specialEquipment: parseInt($(element).find("li").eq(11).html().match(regex)[0]),
              specialEquipmentDelta: tryFindElement($(element).find("li").eq(11))	
            };
  
            articles.push(obj)
        })
      }).catch(err => console.error(err))

      console.log(articles[0]);

      let payload = {};
      
      payload.Item = articles[0];

      payload.TableName = "lossesTestWithDayId";

      setTimeout(function(){
            console.log("Executed after 5 second");
        }, 10000);

      await dynamo.put(payload, function(err,data) {
        if(err){
        console.log("err",err);
        }
        else{
        console.log("data",data)
        }
        }).promise().then(function(res){ console.log("DynamoDB result: " + res)});
        
      console.log("Lambda finish");

    return context.logStreamName;
  }