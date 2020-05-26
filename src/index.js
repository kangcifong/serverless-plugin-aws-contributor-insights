'use strict';
const _ = require('lodash/fp');
class ContributorInsights {
  constructor(serverless, options){
    this.serverless = serverless;
    this.provider = this.serverless.getProvider('aws');
    this.config = _.get('service.custom.contributor-insights', serverless);
    this.hooks = {
          'before:aws:package:finalize:mergeCustomProviderResources': this.generate.bind(this)
    };
  }
  generate(){
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;
    this.config.forEach( function(element){
      if (typeof element.ruleBody ==='object'){
        element.ruleBody = JSON.stringify(element.ruleBody).replace(/"/g,"\"");
      }
      const ruleId = ( element.hasOwnProperty('ruleId'))? element.ruleId : this.provider.naming.normalizeNameToAlphaNumericOnly(element.ruleName);
      template.Resources[ruleId] = {
        Type:'AWS::CloudWatch::InsightRule',
        Properties:{
          RuleBody: element.ruleBody,
          RuleName: element.ruleName,
          RuleState: element.ruleState
        }
      }
      if (element.hasOwnProperty('tags')){
        template.Resources[ruleId].Properties.Tags = element.tags;
      }
    },this);
  }
}
module.exports = ContributorInsights;
