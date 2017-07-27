import Ember from 'ember';
const ajv = require('npm:ajv');

export default Ember.Component.extend({
  init: function(){
    this._super(...arguments);
    var self = this;

    this.get('actionFetcher').attributes(this.get('availableActions')[0]).then(function(attributes){
      self.set('payload_attributes', attributes);
    });
    this.get('ajax').request(
      'http://json-schema.org/draft-04/schema',
      { method: 'GET' }
    ).then(function(metaSchema){
      self.get('validator').addMetaSchema(metaSchema, undefined, true);
      self.get('ajax').request(
        'http://json-schema.org/draft-04/hyper-schema',
        { method: 'GET' }
      ).then(function(metaHyperSchema){
        self.get('validator').addMetaSchema(metaHyperSchema, undefined, true);
        self.get('validator').removeKeyword('propertyNames');
        self.get('validator').removeKeyword('contains');
        self.get('validator').removeKeyword('const');

        self.get('validator')._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/hyper-schema';

        self.set('isLoaded', true);
      });
    });
  },
  validator: ajv.default({
    allErrors: true,
    meta: false,
    extendRefs: true
  }),
  actionFetcher: Ember.inject.service('sdk-action-fetcher'),
  ajax: Ember.inject.service(),
  availableActions: Ember.computed(function(){
    return this.get('actionFetcher').keys();
  }),
  loadSchema: function(uri){
    return this.ajax.request(uri, { method: 'GET' });
  },
  actions: {
    validateSchema: function(){
      var apiAction = this.get('apiAction') || this.get('availableActions')[0],
          apiVerb = this.get('apiVerb') || 'GET',
          apiURL = this.get('apiURL'),
          self = this;

      this.get('actionFetcher').schema(apiAction).then(function(schema){
        self.get('actionFetcher').attributes(apiAction).then(function(attributes){
          self.get('ajax').request(apiURL, {
            method: apiVerb, data: attributes
          }).then(function(response){
            var sch = {
              $schema: 'http://json-schema.org/draft-04/hyper-schema',
              title: '/catalog_get_config_v1',
              description: 'catalog_get_config_v1',
              stability: 'draft',
              additionalProperties: true,
              type: 'object',
              properties: schema.links[0]
            };

            var validate = self.get('validator').compile(schema.links[0].targetSchema);

            console.log(validate(response));
            console.log(validate.errors);
          });
        });
      });
    }
  }
});
