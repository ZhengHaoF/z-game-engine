import axios from "axios";

interface operaFace {
    name: string,
    info: string,
    author: string,
    chapter: [
        {
            name: string,
            info: string,
            material: {
                roleList: [
                    {
                        name?: string,
                        img?: string,
                        headImg?: string
                    }
                ],
                backgroundList: [
                    {
                        name?: string,
                        src?: string
                    }
                ],
                musicList: {
                    role?: [
                        {
                            name?: string,
                            src?: string
                        }
                    ],
                    background: [
                        {
                            name?: string,
                            src?: string
                        }
                    ],
                    material: [
                        {
                            name?: string,
                            src?: string
                        }
                    ]
                }
            },
            node: [
                {
                    id?: string,
                    dialogue: {
                        name?: string,
                        headImg?: string,
                        content?: []
                    },
                    role: [
                        {
                            name?: string,
                            status?: string,
                            position?: string
                        }
                    ],
                    background: {
                        name?: string
                    },
                    music: {
                        backgroundMusic?: {
                            name?: string
                        },
                        roleMusic?: {
                            name?: string
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
    //整个底部
    public footerMain: HTMLElement = document.getElementById("footer-main") as HTMLElement;
    //底部头图
    public footerHeaderImg: HTMLElement = document.getElementById("footer-header-img") as HTMLElement;
    //文字
    public footerMainText: HTMLElement = document.getElementById("footer-main-text") as HTMLElement;
    //背景音乐
    public bgAudio: HTMLElement = document.getElementById("bg-audio") as HTMLElement;
    //人物音乐
    public roleAudio: HTMLElement = document.getElementById("role-audio") as HTMLElement;
    //黑幕
    public maxScreen: HTMLElement = document.getElementById("max-screen") as HTMLElement;
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
    getRoleInfo(name: string): any {
        for (let item of this.roleList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //背景列表
    public backgroundList: any;

    /**
     * 根据背景名获取背景信息
     * @param name 背景名
     */
    getBackgroundInfo(name: string) {
        for (let item of this.backgroundList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //人物音乐列表
    public roleMusicList: any;

    /**
     * 根据人物音乐名获取音乐信息
     * @param name 音乐名
     */
    getRoleMusicInfo(name: string) {
        for (let item of this.roleMusicList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //背景音乐列表
    public backgroundMusicList: any;

    /**
     * 根据背景音乐名获取音乐信息
     * @param name 音乐名
     */
    getBackgroundMusicInfo(name: string) {
        for (let item of this.backgroundMusicList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
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


    await showMaxScreen()
    //----------预载入素材-----------
    let loadAudioDom = () => {};
    //载入人声
    let loadAudio: any[] = [];
    gameMaterial.roleMusicList.forEach((item: any, index: number) => {
        loadAudio[index] = new Audio();
        loadAudio[index].src = item.src;
    })
    //载入背景图片
    let loadBackgroundImg:any[] = [];
    gameMaterial.backgroundList.forEach((item: any, index: number) => {
        loadBackgroundImg[index] = new Image();
        loadBackgroundImg[index].src = item.src;
    })
    //载入人物立绘
    let loadRoleImg:any[] = [];
    gameMaterial.roleList.forEach((item: any, index: number)=>{
        loadRoleImg[index] = new Image();
        loadRoleImg[index].src = item.roleImg;


    })
    //加载进度
    let intervalNumber = setInterval(() => {
        let loadAudioOkNum = 0;
        let loadBackgroundOkNum = 0;
        let loadRoleImgOkNum = 0;
        loadAudio.forEach((item: any, index: number) => {
            if (item.readyState === 4) {
                loadAudioOkNum++
            }
        })
        loadBackgroundImg.forEach((item:any,index:number)=>{
            if(item.complete){
                loadBackgroundOkNum++
            }
        })
        loadRoleImg.forEach((item:any,index:number)=>{
            if(item.complete){
                loadRoleImgOkNum++
            }
        })
        if (
            loadAudioOkNum >= loadAudio.length - 1 &&
            loadBackgroundOkNum >= loadBackgroundImg.length -1 &&
            loadRoleImgOkNum >= loadRoleImg.length -1
        ) {
            //加载完成
            clearInterval(intervalNumber)
            hideMaxScreen()
        }
        gameDom.maxScreen.innerText = `
        人声音频载入${loadAudioOkNum}/${loadAudio.length}
        背景图载入${loadBackgroundOkNum}/${loadBackgroundImg.length}
        人物素材立绘载入${loadRoleImgOkNum}/${loadRoleImg.length}
        `;

    }, 100);
    //----------预载入素材-----------

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
//当前文字节点
let textIndex: number = 0;
const nextNode = function () {
    if (nodeIndex >= gameMaterial.allNode.length) {
        alert("剧本已完成");
        return
    }
    let nowNodeInfo = gameMaterial.allNode[nodeIndex];
    //对话人物名
    let nodeRoleName = nowNodeInfo.dialogue.name;
    //背景
    let nodeBackgroundName = nowNodeInfo.background.name;
    //背景音乐
    let nodeBackgroundMusicName = nowNodeInfo.music.backgroundMusic.name;
    //人物音乐
    let nodeRoleMusicList = nowNodeInfo.music.roleMusic;
    //人物
    let nodeRoleList = nowNodeInfo.role;

    // @ts-ignore
    if (String(gameDom.bgAudio.src).indexOf(gameMaterial.getBackgroundMusicInfo(nodeBackgroundMusicName)['src']) === -1) {
        //如果前后两个的背景音乐相同，就不修改了
        //加载背景音乐
        // @ts-ignore
        gameDom.bgAudio.src = gameMaterial.getBackgroundMusicInfo(nodeBackgroundMusicName)['src'] || "";
        //音量调整为0.4
        // @ts-ignore
        gameDom.bgAudio.volume = 0.4
    }


    //渲染背景图
    gameDom.main.style.backgroundImage = `url(${gameMaterial.getBackgroundInfo(nodeBackgroundName)['src'] || ""})`


    //渲染头图
    gameDom.footerHeaderImg.style.backgroundImage = `url(${gameMaterial.getRoleInfo(nodeRoleName)['headImg'] || ""})`;
    //渲染人物
    nodeRoleList.forEach((item: any) => {
        if (item.position === "left") {
            //左边人物
            if (String(gameDom.canvasLeft.style.backgroundImage).indexOf(gameMaterial.getRoleInfo(item.name)['roleImg']) === -1) {
                gameDom.canvasLeft.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg'] || ""})`;
                addAnimation(gameDom.canvasLeft, "animate__fadeIn")
            }
        } else if (item.position === "right") {
            //右边人物
            if (String(gameDom.canvasRight.style.backgroundImage).indexOf(gameMaterial.getRoleInfo(item.name)['roleImg']) === -1) {
                gameDom.canvasRight.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg'] || ""})`;
                addAnimation(gameDom.canvasRight, "animate__fadeIn")

            }
        }

    })
    //加载人物音乐
    // @ts-ignore
    gameDom.roleAudio.src = gameMaterial.getRoleMusicInfo(nodeRoleMusicList[textIndex])['src'] || "";
    //渲染文字（文字内容可以有多个）
    gameDom.footerMainText.innerText = nowNodeInfo.dialogue.content[textIndex];
    addAnimation(gameDom.footerMainText, "animate__fadeIn")
    textIndex++
    if (textIndex < nowNodeInfo.dialogue.content.length) {
        //如果当前文字还没现实完，则node不加
        return;
    }
    //文字复位
    textIndex = 0;
    nodeIndex++
}

/**
 * 给DOM添加动画
 * @param dom
 * @param animationName 动画名
 */
const addAnimation =  function (dom: HTMLElement, animationName: string) {
    dom.classList.add("animate__animated", animationName)
    gameDom.footerMain.onclick = null;
    setTimeout(() => {
        dom.classList.remove("animate__animated", animationName);
        gameDom.footerMain.onclick = () => {
            nextNode()
        }
    }, 500)
}

/**
 * 黑幕升起
 */
const showMaxScreen = async function () {
    console.log("开始显示")
    await addAnimation(gameDom.maxScreen, "animate__fadeIn")
    gameDom.maxScreen.style.zIndex = "10";
}

/**
 * 黑幕降落
 */
const hideMaxScreen = async function () {
    console.log("结束显示")
    await addAnimation(gameDom.maxScreen, "animate__fadeIn")
    gameDom.maxScreen.style.zIndex = "-1";
}
