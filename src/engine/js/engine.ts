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

//??????
let operaJson: operaFace;

class Dom {
    //???????????????????????????
    public main: HTMLElement = document.getElementById("main") as HTMLElement;
    //?????????
    public canvasLeft: HTMLElement = document.getElementById("canvas-left") as HTMLElement;
    //?????????
    public canvasRight: HTMLElement = document.getElementById("canvas-right") as HTMLElement;
    //?????????
    public canvasMiddle: HTMLElement = document.getElementById("canvas-middle") as HTMLElement;
    //????????????
    public footerMain: HTMLElement = document.getElementById("footer-main") as HTMLElement;
    //????????????
    public footerHeaderImg: HTMLElement = document.getElementById("footer-header-img") as HTMLElement;
    //??????
    public footerMainText: HTMLElement = document.getElementById("footer-main-text") as HTMLElement;
    //????????????
    public bgAudio: HTMLElement = document.getElementById("bg-audio") as HTMLElement;
    //????????????
    public roleAudio: HTMLElement = document.getElementById("role-audio") as HTMLElement;
    //??????
    public maxScreen: HTMLElement = document.getElementById("max-screen") as HTMLElement;
}

class Material {
    //????????????
    public allNode: any;
    //????????????
    public roleList: any;

    /**
     * ?????????????????????????????????
     * @param name ?????????
     */
    getRoleInfo(name: string): any {
        for (let item of this.roleList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //????????????
    public backgroundList: any;

    /**
     * ?????????????????????????????????
     * @param name ?????????
     */
    getBackgroundInfo(name: string) {
        for (let item of this.backgroundList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //??????????????????
    public roleMusicList: any;

    /**
     * ???????????????????????????????????????
     * @param name ?????????
     */
    getRoleMusicInfo(name: string) {
        for (let item of this.roleMusicList) {
            if (item['name'] === name) {
                return item
            }
        }
        return ""
    }

    //??????????????????
    public backgroundMusicList: any;

    /**
     * ???????????????????????????????????????
     * @param name ?????????
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

//????????????
let nodeIndex: number = 0;
//??????dom
let gameDom: Dom;
//????????????
let gameMaterial: Material
export const initEngine = async function () {
    //????????????;
    gameDom = new Dom()
    gameMaterial = new Material()
    //-------------????????????---------------
    await axios.get("/assets/????????????.json").then((res: any) => {
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
    //----------???????????????-----------
    let loadAudioDom = () => {};
    //????????????
    let loadAudio: any[] = [];
    gameMaterial.roleMusicList.forEach((item: any, index: number) => {
        loadAudio[index] = new Audio();
        loadAudio[index].src = item.src;
    })
    //??????????????????
    let loadBackgroundImg:any[] = [];
    gameMaterial.backgroundList.forEach((item: any, index: number) => {
        loadBackgroundImg[index] = new Image();
        loadBackgroundImg[index].src = item.src;
    })
    //??????????????????
    let loadRoleImg:any[] = [];
    gameMaterial.roleList.forEach((item: any, index: number)=>{
        loadRoleImg[index] = new Image();
        loadRoleImg[index].src = item.roleImg;


    })
    //????????????
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
            //????????????
            clearInterval(intervalNumber)
            hideMaxScreen()
        }
        gameDom.maxScreen.innerText = `
        ??????????????????${loadAudioOkNum}/${loadAudio.length}
        ???????????????${loadBackgroundOkNum}/${loadBackgroundImg.length}
        ????????????????????????${loadRoleImgOkNum}/${loadRoleImg.length}
        `;

    }, 100);
    //----------???????????????-----------

    //-------------????????????---------------
    nextNode()
    gameDom.footerMain.onclick = () => {
        nextNode()
    }
    document.onclick = function () {
        //??????????????????????????????
        // @ts-ignore
        gameDom.bgAudio.play();
    }

    //-------------????????????---------------
}
//??????????????????
let textIndex: number = 0;
const nextNode = function () {
    if (nodeIndex >= gameMaterial.allNode.length) {
        alert("???????????????");
        return
    }
    let nowNodeInfo = gameMaterial.allNode[nodeIndex];
    //???????????????
    let nodeRoleName = nowNodeInfo.dialogue.name;
    //??????
    let nodeBackgroundName = nowNodeInfo.background.name;
    //????????????
    let nodeBackgroundMusicName = nowNodeInfo.music.backgroundMusic.name;
    //????????????
    let nodeRoleMusicList = nowNodeInfo.music.roleMusic;
    //??????
    let nodeRoleList = nowNodeInfo.role;

    // @ts-ignore
    if (String(gameDom.bgAudio.src).indexOf(gameMaterial.getBackgroundMusicInfo(nodeBackgroundMusicName)['src']) === -1) {
        //?????????????????????????????????????????????????????????
        //??????????????????
        // @ts-ignore
        gameDom.bgAudio.src = gameMaterial.getBackgroundMusicInfo(nodeBackgroundMusicName)['src'] || "";
        //???????????????0.4
        // @ts-ignore
        gameDom.bgAudio.volume = 0.4
    }


    //???????????????
    gameDom.main.style.backgroundImage = `url(${gameMaterial.getBackgroundInfo(nodeBackgroundName)['src'] || ""})`


    //????????????
    gameDom.footerHeaderImg.style.backgroundImage = `url(${gameMaterial.getRoleInfo(nodeRoleName)['headImg'] || ""})`;
    //????????????
    nodeRoleList.forEach((item: any) => {
        if (item.position === "left") {
            //????????????
            if (String(gameDom.canvasLeft.style.backgroundImage).indexOf(gameMaterial.getRoleInfo(item.name)['roleImg']) === -1) {
                gameDom.canvasLeft.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg'] || ""})`;
                addAnimation(gameDom.canvasLeft, "animate__fadeIn")
            }
        } else if (item.position === "right") {
            //????????????
            if (String(gameDom.canvasRight.style.backgroundImage).indexOf(gameMaterial.getRoleInfo(item.name)['roleImg']) === -1) {
                gameDom.canvasRight.style.backgroundImage = `url(${gameMaterial.getRoleInfo(item.name)['roleImg'] || ""})`;
                addAnimation(gameDom.canvasRight, "animate__fadeIn")

            }
        }

    })
    //??????????????????
    // @ts-ignore
    gameDom.roleAudio.src = gameMaterial.getRoleMusicInfo(nodeRoleMusicList[textIndex])['src'] || "";
    //?????????????????????????????????????????????
    gameDom.footerMainText.innerText = nowNodeInfo.dialogue.content[textIndex];
    addAnimation(gameDom.footerMainText, "animate__fadeIn")
    textIndex++
    if (textIndex < nowNodeInfo.dialogue.content.length) {
        //???????????????????????????????????????node??????
        return;
    }
    //????????????
    textIndex = 0;
    nodeIndex++
}

/**
 * ???DOM????????????
 * @param dom
 * @param animationName ?????????
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
 * ????????????
 */
const showMaxScreen = async function () {
    console.log("????????????")
    await addAnimation(gameDom.maxScreen, "animate__fadeIn")
    gameDom.maxScreen.style.zIndex = "10";
}

/**
 * ????????????
 */
const hideMaxScreen = async function () {
    console.log("????????????")
    await addAnimation(gameDom.maxScreen, "animate__fadeIn")
    gameDom.maxScreen.style.zIndex = "-1";
}
