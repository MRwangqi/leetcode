const request = require('request');
const fs = require('fs'); // 引入文件系统模块

getAllProblems()

/***
 * 脚本分类步骤：
 * 1、获取 leetcode 所有题型
 * 2、获取 leetcode tags 分类
 * 3、根据分类 tags 下列出所有题目，从所有题型中取出来
 * 4、给每个分类创建一个文件，每个分类下的文件都是从题型中提取出来的题目
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
    request({
        method: 'GET',
        url: url,
        headers: {
            'content-type': 'application/json',
        }
    }, function (error, response, body) {
        var json = JSON.parse(body);
        fetchAllTags(json)
    });
}

function fetchAllTags(problemJson) {
    request({
        method: 'GET',
        url: "https://leetcode.cn/problems/api/tags",
        headers: {
            'content-type': 'application/json',
        }
    }, function (error, response, body) {
        var json = JSON.parse(body);
        var topics = json.topics
        executeProblem(problemJson, topics)
    });
}

/**
 * 
 * 将 tag 下的 questions 关联到 problemJson，并存储到本地文件中
 * 
@param {*} tagJson 
 *  [{
            "slug": "stack",
            "name": "Stack",
            "questions": [
                1000316
            ],
            "translatedName": "栈"
        }],

 @param {} problemJson  
[{
  "questionId": "1",
  "questionFrontendId": "1",
  "questionType": "Main",
  "categoryTitle": "Algorithms",
  "title": "Two Sum",
  "titleSlug": "two-sum",
  "difficulty": "Easy",
  "isPaidOnly": false,
  "codeSnippets": [],
  "topicTags": [
    {
      "id": "VG9waWNUYWdOb2RlOjU0MA==",
      "name": "Array",
      "slug": "array",
      "tagType": {
        "name": "Question Tags",
        "slug": "question-tags"
      },
      "createdAt": "2018-02-08T02:09:03.429527+00:00",
      "isEnabled": true,
      "keywords": "[]",
      "imgUrl": null,
      "translatedName": "\u6570\u7ec4"
    }
  ],
  "translatedTitle": "\u4e24\u6570\u4e4b\u548c",
  "stats": "",
  "extra": {},
  "isNewQuestion": false,
  "frequency": "3V6u1Lg"
}]
 */
function executeProblem(problemJson, tagJson) {

    // 生成文件
    tagJson.forEach((item) => {
        // 获取分类 tag 名称(translatedName 可能会为 null)
        var tag = item.translatedName != null ? item.translatedName : item.name
        // 获取 slug title
        var title = item.slug
        // 获取 tag 下的所有题目
        var questions = item.questions


        var problemMap = new Map()
        // 将 problemJson 转成 map
        problemJson.forEach((problem) => {
            // todo 删除一些用不到的元素
            delete problem.codeSnippets
            delete problem.topicTags
            delete problem.extra
            delete problem.stats
            problemMap.set(parseInt(problem.questionId), problem)
        })

        // 从 questions 取出 id，并从 problemJson 拿到 problem，保存到 data 中
        var data = []
        questions.forEach((q) => {
            var problem = problemMap.get(q)
            data.push(problem)
        })

        // 以 slug 名称创建文件夹
        var path = "../problems/tags/" + title + ".json"
        // 格式化将 data 转成 string
        const buffer = JSON.stringify(data,"","\t");
        // 将 buffer 保存到文件中
        writeFileRecursive(path, buffer, function (err) {
            if (err) console.error(err);
            console.info("write success");
        })
    });

    // 生成 index 文件索引表
    var data = []
    tagJson.forEach((item) => {
        // 获取分类 tag 名称(translatedName 可能会为 null)
        var tagName = item.translatedName != null ? item.translatedName : item.name
        // 获取 slug title
        var title = item.slug
        // 题目数量
        var nums = item.questions.length
        // 文件路径
        var path = "problems/tags/" + title + ".json"
        var json = {
            tag: tagName,
            title: title,
            nums: nums,
            path:path
        }
        data.push(json)
    })

     // 以 slug 名称创建文件夹
     var path = "../problems/index.json"
     // 将 data 转成 string
     const buffer = JSON.stringify(data);
     // 将 data 保存到文件中
     writeFileRecursive(path, buffer, function (err) {
         if (err) console.error(err);
         console.info("write success");
     })
}

const writeFileRecursive = function (path, buffer, callback) {
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, { recursive: true }, (err) => {
        if (err) return callback(err);
        fs.writeFile(path, buffer, function (err) {
            if (err) return callback(err);
            return callback(null);
        });
    });
}
