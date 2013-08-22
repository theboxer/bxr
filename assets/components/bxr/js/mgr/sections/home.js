Ext.onReady(function() {
    MODx.load({ xtype: 'bxr-page-home'});
});

BXR.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        formpanel: 'bxr-panel-home'
        ,id: 'bxr-panel-home'
        ,components: [{
            xtype: 'bxr-panel-home'
            ,renderTo: 'bxr-panel-home-div'
        }]
    });
    BXR.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(BXR.page.Home,MODx.Component);
Ext.reg('bxr-page-home',BXR.page.Home);