# leetcode

本仓库只用于个人学习研究使用，所有数据来源于 leetcode-cn 获取，如果想动态请求获取，可查看 script 脚本中的请求

#### 介绍
leetcode 数据获取：
1. 题目分类获取
2. 分类题目列表
3. 获取精选分类
4. 获取精选类型下的题目列表
5. 获取所有题目
7. 获取题目详情
7. 获取题目题解

clone 项目后，开通 github pages，当前仓库启动的 github 服务为 https://mrwangqi.github.io/leetcode/
下面的请求链接以 `~` 代替


## 

## 一、 获取分类题目

#### request

> ~/tags/index.json

例如： https://mrwangqi.github.io/leetcode/tags/index.json

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

例如 https://mrwangqi.github.io/leetcode/tags/stack/index.json

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

例如： https://mrwangqi.github.io/leetcode/topic/index.json

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

例如 https://mrwangqi.github.io/leetcode/topic/2cktkvj/index.json


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

## 五、获取所有题目

目前拿到的所有题目是通过 leetcode 的 graphql 进行查询 allQuestionUrls 文件，具体可查看 script/problem.js 脚本，目前查询返回的内容如下，可以将 questionUrl 放置到浏览器下载查看：
```
{
  data: {
    allQuestionUrls: {
      questionUrl: 'https://questions.leetcode.cn/production/20221016220552_questions_include_main_regular_user.json',
      __typename: 'QuestionURLNode'
    }
  }
}
```

*** 注意：尽量不要调用该接口，数据量太大了 ***

#### request


> ~/problems/index.json

例如 https://mrwangqi.github.io/leetcode/problems/index.json

#### response

```
[
	{
		"questionId": "2",
		"questionFrontendId": "2",
		"questionType": "Main",
		"categoryTitle": "Algorithms",
		"title": "Add Two Numbers",
		"titleSlug": "add-two-numbers",
		"difficulty": "Medium",
		"translatedTitle": "两数相加",
		"frequency": "311UVcg"
	}
]

```


## 六、获取题目详情

#### request

titleSlug 为题目数据中获取，该值可以从 topic、tags 等接口中都能拿到

> ~/problems/{titleSlug}/index.json

例如 https://mrwangqi.github.io/leetcode/problems/add-two-numbers/index.html

#### response

返回的 html 内容

```
<ul>
	<li>不：每个</li>
</ul>

```


## 七、获取题目题解

#### request

titleSlug 为题目数据中获取，该值可以从 topic、tags 等接口中都能拿到

> ~/solution/{titleSlug}/index.json

例如 https://mrwangqi.github.io/leetcode/solution/add-two-numbers/index.json

#### response


```
{
	"titleSlug": "add-two-numbers",
	"slug": "hua-jie-suan-fa-2-liang-shu-xiang-jia-by-guanpengc",
	"url": "https://leetcode-cn.com/problems/add-two-numbers/solution/hua-jie-suan-fa-2-liang-shu-xiang-jia-by-guanpengc/",
	"content": "### 思路\n\n- 标签：链表\n- 将两个链表看成是相同长度的进行遍历，...."
}
```

题解内容 content 为 markdown 格式
