import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  jsonSchemaList: {
    catalog_get_config: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/catalog_get_config_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/catalog_get_config_v1_ex_1.json',
        value: {}
      }
    },
    catalog_push: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/catalog_push_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/catalog_push_config_v1_ex_1.json',
        value: {}
      }
    },
    inventory_push: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/inventory_push_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/inventory_push_v1_ex_1.json',
        value: {}
      }
    },
    order_pull: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_pull_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_pull_v1_ex_1.json',
        value: {}
      }
    },
    order_acknowledge: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_acknowledge_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/oprder_acknowledge_v1_ex_1.json',
        value: {}
      }
    },
    order_update: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_update_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_update_v1_ex_1.json',
        value: {}
      }
    },
    order_cancel: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_cancel_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_cancel_v1_ex_1.json',
        value: {"integration_auth_token": "MOCK_SDK_INTEGRATIONKEY","version": 1,"client_id": 497,"channel_info":{"id": 21},"order":{"retailops_order_id": 100,"channel_order_refnum": "496"}}
      }
    },
    order_shipment_submit: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_shipment_submit_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_shipment_submit_v1_ex_1.json',
        value: {}
      }
    },
    order_complete: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_complete_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_complete_v1_ex_1.json',
        value: {}
      }
    },
    order_settle_payment: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_settle_payment_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_settle_payment_v1_ex_1.json',
        value: {}
      }
    },
    order_returned: {
      schema: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/schema/order_returned_v1.json',
        value: {}
      },
      attributes: {
        address: 'https://raw.githubusercontent.com/gudTECH/retailops-sdk/master/verify/tests/order_returned_v1_ex_1.json',
        value: {}
      }
    }
  },
  keys: function(){
    return Object.keys(this.get('jsonSchemaList'));
  },
  _attrFetcher: function(type, obj, index){
    var self = this;

    if (Object.keys(obj[type].value).length === 0 &&
        obj[type].value.constructor === Object){
      return new Ember.RSVP.Promise(function(resolve) {
        self.get('ajax').request(obj[type].address, { method: 'GET' }).
          then(function(response){
            self.set(`jsonSchemaList.${index}.${type}.value`, response);
            resolve(response);
          });
      });
    }else{
      return new Ember.RSVP.Promise(function(resolve) {
        resolve(obj[type].value);
      });
    }
  },
  schema: function(index){
    let obj = this.get(`jsonSchemaList.${index}`);
    return this._attrFetcher('schema', obj, index);
  },
  attributes: function(index){
    let obj = this.get(`jsonSchemaList.${index}`);
    return this._attrFetcher('attributes', obj, index);
  }
});
