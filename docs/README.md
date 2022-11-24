# Z Game Engine

> 市面上的文字游戏引擎或多或少都需要写一点代码或伪代码，非常不友好。<br>通用游戏引擎功能繁杂，上手难度大<br>我们想做一款上手简单，无需代码的文字游戏引擎。

她由 **剧本编辑器** 、 **剧本渲染器** 和 **剧本** 组成

## 剧本构成

一个文字游戏的画面一般由以下几个部分组成
- 人物类
  - 人物立绘
  - 人物头图
  - 人物表情
- 音乐类
  - 背景音乐
  - 人物语音
  - 场景音效
  - 特殊音效
- 背景类
  - 背景图片
  - 背景特效
- 文字类
  - 对话
  - 旁白


所以，我们把游戏剧本分为几个层级，依次是 `剧本 -> 章节 -> 节点`。

- 章节内存放所需的游戏素材

### 剧本
剧本是所有章节的集合，是对整个游戏的描述

下面是一个剧本的简化示例

```json
{
  "name":"剧本名",
  "info":"剧本信息",
  "author":"作者",
  "chapter":[
    ···
  ]
}
```

### 章节
章节是所有节点的集合，还索引了本章内的所有素材

章节主要存储了以下几种素材
- 人物
  - 名称
  - 头图
  - 立绘
- 背景
  - 名称
  - 位置
- 音乐
  - 背景音乐
  - 人物音乐
  - 素材音乐

下面是一个章节简化示例
```json
        {
            "name":"章节名",
            "info":"章节信息",
            "material":{
                "roleList":[
                    {
                        "name":"姓名",
                        "img":"立绘",
                        "headImg":"头图"
                    }
                ],
                "backgroundList":[
                    {
                        "name":"名称",
                        "src":"位置"
                    }
                ],
                "musicList":{
                    "role":[
                        {
                            "name":"名称",
                            "src":"位置"
                        }
                    ],
                    "background":[
                        {
                            "name":"名称",
                            "src":"位置"
                        }
                    ],
                    "source":[
                        {
                            "name":"名称",
                            "src":"位置"
                        }
                    ]
                }
            },
            "node":[
                ···
            ]
        }
```
### 节点

节点是控制游戏渲染的指令，包含当前游戏画面内的所有内容。

下面是一个节点的例子

```json
{
  "id": "id",
  "dialogue": {
    "name": "名称",
    "content": [
      "文字内容1",
      "文字内容2",
      "文字内容3"
    ]
  },
  "role": [
    {
      "name": "人物名称",
      "status": "状态(in,out,unchange)",
      "position": "方位(left,right)"
    }
  ],
  "background": {
    "name": "背景名称"
  },
  "music": {
    "backgroundMusic": {
      "name": "背景音乐名"
    },
    "roleMusic": {
      "name": "人物音乐名"
    }
  }
}
```


### 完整示例
下面是一个完整的剧本示例

```json
{
  "name": "剧本名",
  "info": "剧本信息",
  "author": "作者",
  "chapter": [
    {
      "name": "测试章节",
      "info": "测试用的章节",
      "material": {
        "roleList": [
          {
            "name": "ZHF",
            "roleImg": "/assets/roleImg/栞那a_0_1891.png",
            "headImg": "/assets/headImg/extra_stand_dialog+pimg+6513.png"
          },
          {
            "name": "ZHF2",
            "roleImg": "/assets/roleImg/栞那a_0_1891.png",
            "headImg": "/assets/headImg/extra_stand_dialog+pimg+6513.png"
          }
        ],
        "backgroundList": [
          {
            "name": "bg1",
            "src": "/assets/backgroundImg/その他_プールA.png"
          }
        ],
        "musicList": {
          "role": [
            {
              "name": "ogg1",
              "src": "/assets/music/roleMusic/asumi111_019.ogg"
            }
          ],
          "background": [
            {
              "name": "bgm1",
              "src": "/assets/music/backgroundMusic/BGM01.mp3"
            }
          ],
          "material": [
            {
              "name": "名称",
              "src": "位置"
            }
          ]
        }
      },
      "node": [
        {
          "id": "1",
          "dialogue": {
            "name": "ZHF",
            "headImg": "",
            "content": [
              "你好世界",
              "我是ZHF",
              "这是一个测试项目",
              "我将在这里演示z-game-engine引擎的一些功能",
              "那个泳池是背景图",
              "对话左边的是我的头图（headImage）"
            ]
          },
          "role": [
            {
              "name": "ZHF",
              "status": "状态",
              "position": "right"
            }
          ],
          "background": {
            "name": "bg1"
          },
          "music": {
            "backgroundMusic": {
              "name": "bgm1"
            },
            "roleMusic": {
              "name": "人物音乐名"
            }
          }
        },
        {
          "id": "2",
          "dialogue": {
            "name": "ZHF",
            "headImg": "",
            "content": ["现在出现的是我的立绘（roleImage）"]
          },
          "role": [
            {
              "name": "ZHF",
              "status": "状态",
              "position": "left"
            }
          ],
          "background": {
            "name": "bg1"
          },
          "music": {
            "backgroundMusic": {
              "name": "bgm1"
            },
            "roleMusic": {
              "name": "人物音乐名"
            }
          }
        },
        {
          "id": "3",
          "dialogue": {
            "name": "ZHF",
            "headImg": "",
            "content": ["当然，右边也有一个人物位置"]
          },
          "role": [
            {
              "name": "ZHF",
              "status": "in",
              "position": "left"
            },
            {
              "name": "ZHF2",
              "status": "in",
              "position": "right"
            }
          ],
          "background": {
            "name": "bg1"
          },
          "music": {
            "backgroundMusic": {
              "name": "bgm1"
            },
            "roleMusic": {
              "name": "人物音乐名"
            }
          }
        },
        {
          "id": "4",
          "dialogue": {
            "name": "ZHF",
            "headImg": "",
            "content": ["现在播放的是人物语音测试，我也不知道讲的是啥"]
          },
          "role": [
            {
              "name": "ZHF",
              "status": "unchanged",
              "position": "left"
            },
            {
              "name": "ZHF2",
              "status": "unchanged",
              "position": "right"
            }
          ],
          "background": {
            "name": "bg1"
          },
          "music": {
            "backgroundMusic": {
              "name": "bgm1"
            },
            "roleMusic": {
              "name": "ogg1"
            }
          }
        },
        {
          "id": "5",
          "dialogue": {
            "name": "ZHF",
            "headImg": "",
            "content": [
              "好了，到这里就结束了",
              "感谢你的观看",
              "拜拜~"
            ]
          },
          "role": [
            {
              "name": "ZHF",
              "status": "unchanged",
              "position": "left"
            },
            {
              "name": "ZHF2",
              "status": "out",
              "position": "right"
            }
          ],
          "background": {
            "name": "bg1"
          },
          "music": {
            "backgroundMusic": {
              "name": "bgm1"
            },
            "roleMusic": {
              "name": ""
            }
          }
        }
      ]
    }
  ]
}
```

## 正在编写中
