var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var baseUrl = 'http://read.qidian.com/BookReader/vRiaIsGCoOM1.aspx';
var request = require('superagent-charset')(require('superagent'));

//GetDetail('http://www.bilibili.com/video/av6600247/');

async.waterfall([
    function (cb) {
        var tasks = new Array();
        request.get(baseUrl).end(function (err, res) {
            var $ = cheerio.load(res.text);
            $('a[itemprop=url]').each(function (i, e) {
                //console.log($(e).attr("href"))
                tasks.push($(e).attr("href"));
            });
            tasks.splice(0, 1);
            cb(null, tasks)
        });
    },
    function (tasks, cb) {
        /*小说详情页爬取*/
        async.map(tasks, function (i, cb) {
            request.get(i).end(function (err,res) {
               var $=cheerio.load(res.text);
                var id=$("#chaptercontent > script:nth-child(2)").attr('src');
                //console.log(id);
                cb(null, id)
            });

        }, function (err, res) {
            console.log(res)
        });
        cb(null, "sdsd")
    }
], function (err, res) {

})


function DealText(text) {
    var length = text.length;
    text = text.substring(16, length - 4);
    return text;
}
