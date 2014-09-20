BXR.window.Item = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        closeAction: 'close'
        ,url: BXR.config.connectorUrl
        ,action: (config.isUpdate)? 'mgr/item/update' : 'mgr/item/create'
        ,fields: [{
            xtype: 'textfield'
            ,name: 'id'
            ,id: this.ident+'-id'
            ,hidden: true
        },{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,anchor: '100%'
        },{
            xtype: 'textarea'
            ,fieldLabel: _('description')
            ,name: 'description'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,name: 'position'
            ,hidden: true
        }]
    });
    BXR.window.Item.superclass.constructor.call(this,config);
};
Ext.extend(BXR.window.Item,MODx.Window);
Ext.reg('bxr-window-item',BXR.window.Item);

