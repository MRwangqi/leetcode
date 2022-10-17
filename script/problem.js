const request = require('request');
const fs = require('fs'); // 引入文件系统模块

getAllProblems()

/***
 * 脚本分类步骤：
 * 1、获取 leetcode 所有题型
 * 2、获取每个题型的题目详情
 * 3、将题目详情以 slugTitle 作为文件夹存储到本地
 */

function getAllProblems() {
    var json = { "operationName": "allQuestionUrls", "variables": {}, "query": "query allQuestionUrls {\n  allQuestionUrls {\n    questionUrl\n    __typename\n  }\n}\n" }
    request({
        method: 'POST',
        url: 'https://leetcode-cn.com/graphql',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(json)
    }, function (error, response, body) {
        var json = JSON.parse(body);
        console.log(json)
        var url = json.data.allQuestionUrls.questionUrl
        console.log(url)
        fetchAllProblems(url)
    });
}


function fetchAllProblems(url) {
    console.log(url)

    request({
        method: 'GET',
        url: url,
        headers: {
            'content-type': 'application/json',
        }
    }, function (error, response, body) {
        var json = JSON.parse(body);

        // length 为 2821，leetcode 做了 ip 调用次数校验，不能频繁请求，需要手动做分段请求
        var start = 0
        var end = 500// 2821

        for (let i = start, len = end; i < end; ++i) {
            var problem = json[i]
            // todo 删除一些用不到的元素
            delete problem.codeSnippets
            delete problem.topicTags
            delete problem.extra
            delete problem.stats
            delete problem.isPaidOnly
            delete problem.isNewQuestion
           
            console.log("index="+i+" titleSlug = " + problem.titleSlug)
            fetchProblemDetails(problem.titleSlug)
        }

        var data = []
        for (let i = start, len = json.length; i < end; ++i) {
            data.push(problem)
        }
        console.log(json.length)
        // 以 slug 名称创建文件夹
        var path = "../problems/index.json"
        // 将 data 转成 string
        const buffer = JSON.stringify(data, "", "\t");
        // 将 data 保存到文件中
        writeFileRecursive(path, buffer, function (err) {
            if (err) console.error(err);
            console.info("write success");
        })
    });
}

function fetchProblemDetails(titleSlug) {

    var json = {
        "operationName": "questionData",
        "variables": {
            "titleSlug": titleSlug
        },
        "query": "query questionData($titleSlug: String!) {  question(titleSlug: $titleSlug) {    questionId    questionFrontendId        title    titleSlug      translatedTitle    translatedContent        difficulty    }}"
    }

    request({
        method: 'POST',
        url: 'https://leetcode-cn.com/graphql',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(json)
    }, function (error, response, body) {
        if (error) console.error(error);

        var json = JSON.parse(body);
        // 以 slug 名称创建文件夹
        var path = "../problems/" + titleSlug + "/index.html"
        var buffer = json.data.question.translatedContent
        if (buffer == null) {
            buffer = "plus 会员题"
        }
        // 将 data 保存到文件中
        writeFileRecursive(path, buffer, function (err) {
            if (err) console.error(err);
            console.info("write success " + titleSlug);
        })
    });
}


const writeFileRecursive = function (path, buffer, callback) {
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, { recursive: true }, (err) => {
        if (err) return callback(err);
        fs.writeFileSync(path, buffer, function (err) {
            if (err) return callback(err);
            return callback(null);
        });
    });
}
