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

例如 https://codelang.gitee.io/leetcode/problems/index.json

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


## 五、获取题目详情

#### request

titleSlug 为题目数据中获取，该值可以从 topic、tags 等接口中都能拿到

> ~/problems/{titleSlug}/index.json

例如 https://codelang.gitee.io/leetcode/problems/add-two-numbers/index.json

#### response

返回的 html 内容

```
<ul>
	<li>不相交：每个 <code>seq[i]</code> 只能分给 <code>A</code> 和 <code>B</code> 二者中的一个，不能既属于 <code>A</code> 也属于 <code>B</code> 。</li>
	<li><code>A</code> 或 <code>B</code> 中的元素在原字符串中可以不连续。</li>
	<li><code>A.length + B.length = seq.length</code></li>
	<li>深度最小：<code>max(depth(A), depth(B))</code>&nbsp;的可能取值最小。&nbsp;</li>
</ul>

```