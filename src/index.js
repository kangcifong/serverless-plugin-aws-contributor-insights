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
      template.Resources[element.ruleId] = {
        Type:'AWS::CloudWatch::InsightRule',
        Properties:{
          RuleBody: element.ruleBody,
          RuleName: element.ruleName,
          RuleState: element.ruleState,
          Tags: element.tags
        }
      }});
  }
}
module.exports = ContributorInsights;
