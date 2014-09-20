
BXR.grid.Items = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'bxr-grid-items'
        ,url: BXR.config.connectorUrl
        ,baseParams: {
            action: 'mgr/item/getlist'
        }
        ,save_action: 'mgr/item/updatefromgrid'
        ,autosave: true
        ,fields: ['id','name','description']
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 70
        },{
            header: _('name')
            ,dataIndex: 'name'
            ,width: 200
            ,editor: { xtype: 'textfield' }
        },{
            header: _('description')
            ,dataIndex: 'description'
            ,width: 250
            ,editor: { xtype: 'textfield' }
        }]
        ,tbar: [{
            text: _('bxr.item_create')
            ,handler: this.createItem
            ,scope: this
        },'->',{
            xtype: 'textfield'
            ,id: 'bxr-search-filter'
            ,emptyText: _('bxr.search...')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        }]
    });
    BXR.grid.Items.superclass.constructor.call(this,config);
};
Ext.extend(BXR.grid.Items,MODx.grid.Grid,{
    windows: {}

    ,getMenu: function() {
        var m = [];
        m.push({
            text: _('bxr.item_update')
            ,handler: this.updateItem
        });
        m.push('-');
        m.push({
            text: _('bxr.item_remove')
            ,handler: this.removeItem
        });
        this.addContextMenuItem(m);
    }
    
    ,createItem: function(btn,e) {
        var createItem = MODx.load({
            xtype: 'bxr-window-item'
            ,title: _('bxr.item_create')
            ,listeners: {
                'success': {fn:function() { this.refresh(); },scope:this}
            }
        });

        createItem.show(e.target);
    }

    ,updateItem: function(btn,e) {
        var updateItem = MODx.load({
            xtype: 'bxr-window-item'
            ,title: _('bxr.item_update')
            ,record: this.menu.record
            ,listeners: {
                'success': {fn:function() { this.refresh(); },scope:this}
            }
        });

        updateItem.fp.getForm().reset();
        updateItem.fp.getForm().setValues(this.menu.record);
        updateItem.show(e.target);
    }

    ,removeItem: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('bxr.item_remove')
            ,text: _('bxr.item_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/item/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }

    ,search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }

});
Ext.reg('bxr-grid-items',BXR.grid.Items);