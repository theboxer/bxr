var BXR = function(config) {
    config = config || {};
    BXR.superclass.constructor.call(this,config);
};
Ext.extend(BXR,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}, extra:{}
});
Ext.reg('bxr',BXR);
BXR = new BXR();