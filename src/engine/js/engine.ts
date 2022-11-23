import axios from "axios";

interface operaFace {
    name: String,
    info: String,
    author: String,
    chapter: [
        {
            name: String,
            info: String,
            material: {
                roleList: [
                    {
                        name?: String,
                        img?: String,
                        headImg?: String
                    }
                ],
                backgroundList: [
                    {
                        name?: String,
                        src?: String
                    }
                ],
                musicList: {
                    role?: [
                        {
                            name?: String,
                            src?: String
                        }
                    ],
                    background: [
                        {
                            name?: String,
                            src?: String
                        }
                    ],
                    material: [
                        {
                            name?: String,
                            src?: String
                        }
                    ]
                }
            },
            node: [
                {
                    id?: String,
                    dialogue: {
                        name?: String,
                        headImg?: String,
                        content?: String
                    },
                    role: [
                        {
                            name?: String,
                            status?: String,
                            position?: String
                        }
                    ],
                    background: {
                        name?: String
                    },
                    music: {
                        backgroundMusic?: {
                            name?: String
                        },
                        roleMusic?: {
                            name?: String
                        }
                    }
                }
            ]
        }
    ]
}

//剧本
let operaJson: operaFace;

class Dom {
    //最底层画布（背景）
    public main: HTMLElement = document.getElementById("main") as HTMLElement;
    //左画布
    public canvasLeft: HTMLElement = document.getElementById("canvas-left") as HTMLElement;
    //右画布
    public canvasRight: HTMLElement = document.getElementById("canvas-right") as HTMLElement;
    //中画布
    public canvasMiddle: HTMLElement = document.getElementById("canvas-middle") as HTMLElement;
    //底部头图
    public footerHeaderImg: HTMLElement = document.getElementById("footer-header-img") as HTMLElement;
    //文字
    public footerMain: HTMLElement = document.getElementById("footer-main") as HTMLElement;
    //背景音乐
    public bgAudio: HTMLElement = document.getElementById("bg-audio") as HTMLElement;
    //人物音乐
    public roleAudio: HTMLElement = document.getElementById("role-audio") as HTMLElement;
}

class Material {
    //所有节点
    public allNode: any;
    //人物列表
    public roleList: any;

    /**
     * 根据人物名获取人物信息
     * @param name 人物名
     */
    getRoleInfo(name: String): any {
        for (let item of this.roleList) {
            if (item['name'] === name) {
                return item
            }
        }
    }

    //背景列表
    public backgroundList: any;

    /**
     * 根据背景名获取背景信息
     * @param name 背景名
     */
    getBackgroundInfo(name: String) {
        for (let item of this.backgroundList) {
            if (item['name'] === name) {
                return item
            }
        }
    }

    //人物音乐列表
    public roleMusicList: any;
    /**
     * 根据人物音乐名获取音乐信息
     * @param name 音乐名
     */
    getRoleMusicInfo(name: String) {
        for (let item of this.roleMusicList) {
            if (item['name'] === name) {
                return item
            }
        }
    }
    //背景音乐列表
    public backgroundMusicList: any;
    /**
     * 根据背景音乐名获取音乐信息
     * @param name 音乐名
     */
    getBackgroundMusicInfo(name: String) {
        for (let item of this.backgroundMusicList) {
            if (item['name'] === name) {
                return item
            }
        }
    }
}

//当前节点
let nodeIndex: number = 0;
//游戏dom
let gameDom: Dom;
//游戏素材
let gameMaterial: Material
export const initEngine = async function () {
    //获取节点;
    gameDom = new Dom()
    gameMaterial = new Material()
    //-------------载入剧本---------------
    await axios.get("/assets/测试剧本.json").then((res: any) => {
        operaJson = JSON.parse(JSON.stringify(res.data));
        gameMaterial.allNode = operaJson['chapter'][0]['node'];
        gameMaterial.roleList = operaJson['chapter'][0]['material']['roleList'];
        gameMaterial.backgroundList = operaJson['chapter'][0]['material']['backgroundList'];
        gameMaterial.roleMusicList = operaJson['chapter'][0]['material']['musicList']['role'];
        gameMaterial.backgroundMusicList = operaJson['chapter'][0]['material']['musicList']['background'];
    }).catch((err) => {
        console.log(err)
        return;
    })
    //-------------载入剧本---------------
    nextNode()
    gameDom.footerMain.onclick = () => {
        nextNode()
    }
    document.onclick = function () {
        //页面加载时可播放音频
        // @ts-ignore
        gameDom.bgAudio.play();
    }
    //-------------载入剧本---------------
}
const nextNode = function () {
    if (nodeIndex >= gameMaterial.allNode.length) {
        alert("剧本已完成");
        return
    }
    //对话人物名
    let nodeRoleName = gameMaterial.allNode[nodeIndex].dialogue.name;
    //背景
    let nodeBackgroundName = gameMaterial.allNode[nodeIndex].background.name;
    //背景音乐
    let nodeBackgroundMusicName = gameMaterial.allNode[nodeIndex].music.backgroundMusic.name;
    //人物
    let nodeRoleList = gameMaterial.allNode[nodeIndex].role
    if(nodeIndex === 0 || nodeBackgroundName !== gameMaterial.getBackgroundInfo(nodeBackgroundName)['name']){
        //如果前后两个的背景音乐相同，就不修改了
        //加载背景音乐
        // @ts-ignore
        gameDom.bgAudio.src = gameMaterial.getBackgroundMusicInfo(nodeBackgroundMusicName).src;
    }
    //渲染背景图
    gameDom.main.style.backgroundImage = `url(${gameMaterial.getBackgroundInfo(nodeBackgroundName)['src']})`
    //渲染文字
    gameDom.footerMain.innerText = gameMaterial.allNode[nodeIndex].dialogue.content;
    //渲染头图
    gameDom.footerHeaderImg.style.backgroundImage = `url(${gameMaterial.getRoleInfo(nodeRoleName)['headImg']})`;
    //渲染人物
    nodeRoleList.forEach((item:any)=>{
        if (item.position === "left"){
            //左边人物
            gameDom.canvasLeft.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg']})`;
        }else if(item.position === "right"){
            //右边人物
            gameDom.canvasRight.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg']})`;
        }
    })
    nodeIndex++
}
