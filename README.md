# leetcode

#### 介绍
leetcode 数据获取：
- 题目分类获取
- 分类题目列表

clone 项目后，启动 gitee pages，当前仓库启动的 gitee 服务为 https://codelang.gitee.io/leetcode，下面的请求链接以 `~` 代替
### 获取分类题目

#### request

> ~/problems/index.json

例如： https://codelang.gitee.io/leetcode/problems/index.json


#### response

```
[
	{
		"tag": "栈",
		"title": "stack",
		"nums": 160,
		"path": "problems/tags/stack.json"
	},
	...
]
```

### 获取分类题目列表

#### request

> ~/{path}.json

例如 https://codelang.gitee.io/leetcode/problems//tags/stack.json

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
