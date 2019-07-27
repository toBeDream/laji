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
    
    ctor : function(){
        this.guide = undefined;
        this.test = ["可回收垃圾", "有害垃圾", "湿垃圾", "干垃圾"];
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

        itemTemplate : cc.Node,
        content : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.guide = require("refuseGuide");
    },

    start () {

    },

    onTextChanged : function(text, editbox)
    {
        let dic = this.guide.dic;
        let keys = dic[text];
        let searchs = [];
        for(let key in keys)
        {
            let k = keys[key] & 0xffff;
            searchs.push(this.guide.content[k]);
            // cc.log(this.guide.content[k].name);
        }

        this.content.destroyAllChildren();
        this.content.height = this.itemTemplate.height * searchs.length;
        for(let key in searchs)
        {
            let item = cc.instantiate(this.itemTemplate);
            item.active = true;
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + parseInt(key)))
            // item.getChildByName("labelName").getComponent(cc.Label).string = searchs[key].name;
            // item.getChildByName("labelType").getComponent(cc.Label).string = this.test[searchs[key].type - 1];
        }
    },

    // update (dt) {},
});
