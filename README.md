# leetcode

#### 介绍
leetcode 数据获取：
- 题目分类获取
- 分类题目列表

clone 项目后，启动 gitee pages，当前仓库启动的 gitee 服务为 https://codelang.gitee.io/leetcode
下面的请求链接以 `~` 代替

## 一、 获取分类题目

#### request

> ~/tags/index.json

例如： https://codelang.gitee.io/leetcode/tags/index.json

#### response

```
[
	{
		"tag": "栈",
		"title": "stack",
		"nums": 160,
		"path": "tags/stack/index.json"
	},
	...
]
```

## 二、获取分类题目列表

#### request

path 为 `分类题目` 中返回的 path 值

> ~/{path}.json

例如 https://codelang.gitee.io/leetcode/tags/stack/index.json

#### response
```
[
	{
		"questionId": "20",
		"questionFrontendId": "20",
		"questionType": "Main",
		"categoryTitle": "Algorithms",
		"title": "Valid Parentheses",
		"titleSlug": "valid-parentheses",
		"difficulty": "Easy",
		"isPaidOnly": false,
		"translatedTitle": "有效的括号",
		"isNewQuestion": false,
		"frequency": "3I8DJGg"
	}
    ....
]
```

## 三、获取精选分类

#### request

> ~/topic/index.json

例如： https://codelang.gitee.io/leetcode/topic/index.json

#### response

```
[
    {
        "name": "🔥 LeetCode 热题 HOT 100",
        "icon": "topic/img/2cktkvj.png",
        "id": "2cktkvj"
    },
    {
        "name": "💙 LeetCode 精选数据库 70 题",
        "icon": "topic/img/qgq7m9e.png",
        "id": "qgq7m9e"
    }
    ...
]
```


## 四、获取精选类型下的题目列表



#### request

id 为 `获取精选分类` 中返回的 id 值

> ~/topic/{id}/index.json

例如 https://codelang.gitee.io/leetcode/topic/2cktkvj/index.json


#### response

```
[
	{
		"__typename": "QuestionLightNode",
		"acRate": 0.21274395931225032,
		"difficulty": "EASY",
		"freqBar": 0,
		"paidOnly": false,
		"status": "NOT_STARTED",
		"frontendQuestionId": "剑指 Offer II 001",
		"isFavor": false,
		"solutionNum": 400,
		"title": "整数除法",
		"titleCn": "整数除法",
		"titleSlug": "xoh6Oh"
	},
	...
]
```