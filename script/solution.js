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
        var start = 2500
        var end = 2821// 2821

        for (let i = start, len = end; i < end; ++i) {
            var problem = json[i]
            console.log("index=" + i + " titleSlug= " + problem.titleSlug + " lenght=" + json.length)
            fetchSolutionList(problem.titleSlug)
        }
    });
}

function fetchSolutionList(titleSlug) {
    var json = {
        "operationName": "questionSolutionArticles",
        "variables": {
            "questionSlug": titleSlug,
            "first": 10,
            "skip": 0,
            "orderBy": "DEFAULT"
        },
        "query": "query questionSolutionArticles($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {\n  questionSolutionArticles(questionSlug: $questionSlug, skip: $skip, first: $first, orderBy: $orderBy, userInput: $userInput, tagSlugs: $tagSlugs) {\n    totalNum\n    edges {\n      node {\n        ...solutionArticle\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment solutionArticle on SolutionArticleNode {\n  rewardEnabled\n  canEditReward\n  uuid\n  title\n  slug\n  sunk\n  chargeType\n  status\n  identifier\n  canEdit\n  canSee\n  reactionType\n  reactionsV2 {\n    count\n    reactionType\n    __typename\n  }\n  tags {\n    name\n    nameTranslated\n    slug\n    tagType\n    __typename\n  }\n  createdAt\n  thumbnail\n  author {\n    username\n    profile {\n      userAvatar\n      userSlug\n      realName\n      __typename\n    }\n    __typename\n  }\n  summary\n  topic {\n    id\n    commentCount\n    viewCount\n    __typename\n  }\n  byLeetcode\n  isMyFavorite\n  isMostPopular\n  isEditorsPick\n  hitCount\n  videosInfo {\n    videoId\n    coverUrl\n    duration\n    __typename\n  }\n  __typename\n}\n"
    }

    request({
        method: 'POST',
        url: 'https://leetcode-cn.com/graphql',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(json)
    }, function (error, response, body) {
        if (body == null) {
            return
        }
        var json = JSON.parse(body);
        var data = json.data
        // 获取解答列表的第一个题解
        if (data.questionSolutionArticles.edges[0] != null) {
            var slug = data.questionSolutionArticles.edges[0].node.slug
            var title = data.questionSolutionArticles.edges[0].node.title
            solutionDetails(titleSlug, slug)
        }
    });
}


function solutionDetails(titleSlug, slug) {
    var json = {
        "operationName": "solutionDetailArticle",
        "variables": {
            "slug": slug,
            "orderBy": "DEFAULT"
        },
        "query": "query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {\n  solutionArticle(slug: $slug, orderBy: $orderBy) {\n    ...solutionArticle\n    content\n    question {\n      questionTitleSlug\n      __typename\n    }\n    position\n    next {\n      slug\n      title\n      __typename\n    }\n    prev {\n      slug\n      title\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment solutionArticle on SolutionArticleNode {\n  rewardEnabled\n  canEditReward\n  uuid\n  title\n  slug\n  sunk\n  chargeType\n  status\n  identifier\n  canEdit\n  canSee\n  reactionType\n  reactionsV2 {\n    count\n    reactionType\n    __typename\n  }\n  tags {\n    name\n    nameTranslated\n    slug\n    tagType\n    __typename\n  }\n  createdAt\n  thumbnail\n  author {\n    username\n    profile {\n      userAvatar\n      userSlug\n      realName\n      __typename\n    }\n    __typename\n  }\n  summary\n  topic {\n    id\n    commentCount\n    viewCount\n    __typename\n  }\n  byLeetcode\n  isMyFavorite\n  isMostPopular\n  isEditorsPick\n  hitCount\n  videosInfo {\n    videoId\n    coverUrl\n    duration\n    __typename\n  }\n  __typename\n}\n"
    }

    request({
        method: 'POST',
        url: 'https://leetcode-cn.com/graphql',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(json)
    }, function (error, response, body) {
        if (body == null) {
            return
        }
        var json = JSON.parse(body);
        // 题解内容
        var content = json.data.solutionArticle.content
        // 题解的 url
        var urls = "https://leetcode-cn.com/problems/" + titleSlug + "/solution/" + slug + "/"

        console.log("urls= " + urls)

        // 写文件
        var data = {
            "titleSlug": titleSlug,
            "slug": slug,
            "url": urls,
            "content": content
        }
        const buffer = JSON.stringify(data, "", "\t");
        // 以 slug 名称创建文件夹
        var path = "../solution/" + titleSlug + "/index.json"
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
