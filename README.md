# serverless-plugin-aws-contributor-insights

This plugin allows to use serverless framework to deploy contributor insights for AWS CloudWatch.

To use this plugin, please specify the following

```
plugins:
  - serverless-plugin-aws-contributor-insights

custom:
  contributor-insights:
    - ruleBody: "{\"Schema\":{\"Name\":\"CloudWatchLogRule\",\"Version\":1},\"AggregateOn\":\"Count\",\"Contribution\":{\"Filters\":[{\"Match\":\"$.status\",\"GreaterThan\":500}],\"Keys\":[\"$.path\",\"$.status\"]},\"LogFormat\":\"JSON\",\"LogGroupNames\":[\"\/aws\/apigateway\/*\"]}" #REQUIRED
      ruleName: rule-1 #REQUIRED
      ruleId: ruleid1 #OPTIONAL
      ruleState: ENABLED #REQUIRED
      tags: #OPTIONAL
        - Key: key1
          Value: value1
        - Key: Key2
          Value: value2
    - ruleBody: "{\"Schema\":{\"Name\":\"CloudWatchLogRule\",\"Version\":1},\"AggregateOn\":\"Count\",\"Contribution\":{\"Filters\":[{\"Match\":\"$.status\",\"GreaterThan\":500}],\"Keys\":[\"$.path\",\"$.status\"]},\"LogFormat\":\"JSON\",\"LogGroupNames\":[\"\/aws\/api-gateway\/*\"]}"
      ruleName: rule-2
      ruleId: ruleid2
      ruleState: ENABLED
      tags:
        - Key: key3
          Value: value3
        - Key: key4
          Value: value4
    
```
