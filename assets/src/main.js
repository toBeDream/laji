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
        this.itemPool = new cc.NodePool("itemTemplate");
        this.items = [];
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

        for(let i = 0; i < 100; i++)
        {
            let item = cc.instantiate(this.itemTemplate);
            this.itemPool.put(item);
        }
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
        }

        for(var i in this.items)
        {
            this.itemPool.put(this.items[i]);
        }
        this.items = [];
        this.content.height = this.itemTemplate.height * searchs.length;
        for(let key in searchs)
        {
            let item = this.itemPool.get();
            if(!item)
            {
                item = cc.instantiate(this.itemTemplate);
            }
            item.active = true;
            item.parent = this.content;
            item.setPosition(0, -item.height * (0.5 + parseInt(key)))
            item.getComponent("itemTemplate").init(searchs[key].name, searchs[key].type, searchs[key].introduce);
            this.items.push(item);
        }
    },

    // update (dt) {},
});
