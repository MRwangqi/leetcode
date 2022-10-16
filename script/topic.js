const request = require('request');
const fs = require('fs'); // 引入文件系统模块


getTopicProblems()

function getTopicProblems() {
    fs.readFile("../topic/index.json", function (err, data) {
        var json = JSON.parse(data.toString('utf8'))
        json.forEach((item) => {
            fetchTopicProblems(item)
        })
    })
}

function fetchTopicProblems(item) {
    console.log(item)
    var json = { "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    hasMore\n    total\n    questions {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId\n      isFavor\n      paidOnly\n      solutionNum\n      status\n      title\n      titleCn\n      titleSlug\n      topicTags {\n        name\n        nameTranslated\n        id\n        slug\n      }\n      extra {\n        hasVideoSolution\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n  }\n}\n    ", "variables": { "categorySlug": "", "filters": { "listId": item.id }, "limit": 1000 } }
    request({
        method: 'POST',
        url: 'https://leetcode-cn.com/graphql',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(json)
    }, function (error, response, body) {
        var json = JSON.parse(body);
        saveFile(item, json.data.problemsetQuestionList.questions)
    });
}

function saveFile(item, questions) {
    // 以 item id 名称为文件夹
    var path = "../topic/" + item.id + "/index.json"
    var data = []
    questions.forEach((q) => {
        // todo 删除一些用不到的元素
        delete q.codeSnippets
        delete q.topicTags
        delete q.extra
        delete q.stats
        data.push(q)
    })
    // 格式化将 data 转成 string
    const buffer = JSON.stringify(data, "", "\t");
     // 将 buffer 保存到文件中
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
