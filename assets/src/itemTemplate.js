// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    ctor : function()
    {
        this.lajiType = ["可回收垃圾", "有害垃圾", "湿垃圾", "干垃圾"];
        this.name = "";
        this.type = 1;
        this.introduce = "";
    },

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this);
    },

    start () {

    },

    init : function(name, type, introduce)
    {
        this.name = name;
        this.type = type;
        this.introduce = introduce;

        this.node.getChildByName("labelName").getComponent(cc.Label).string = this.name;
        this.node.getChildByName("labelType").getComponent(cc.Label).string = this.lajiType[this.type - 1];
    },

    onClick : function(event)
    {
        // cc.systemEvent.emit()
    }

    // update (dt) {},
});
