
/**
 * @param callback(ruleList) callback function to handle rules
 */
function getRules(callback) {
    $.ajax({
        url: '/api/IPsec:rule-all',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            console.log("===> JSON.stringify(data): " + JSON.stringify(data));
            console.log("===> data.output.result: " + data.output.result);
            //var tmp = JSON.parse(data.output.result)
            //var rule_valid = tmp[0]
            var rule_valid = JSON.parse(data.output.result)
            console.log("===> JSON.stringify(rule_valid): " + JSON.stringify(rule_valid))
            var ruleList = JSON.parse(rule_valid.RULES)
            var validList = JSON.parse(rule_valid.VALIDS)
            callback(ruleList, validList)
        }
    });
}

/**
 * @param callback(aclInfo) callback function to output aclInfo
 */
function getAclInfo(callback) {
    $.ajax({
        url: '/api/IPsec:aclInfo',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            var aclInfo = data.output.result
            callback(aclInfo)
        }
    });
}

/**
 * add a rule to the end of the rule list
 * @param rule rule to be added
 * @param callback(result) callback function to handle result
 */
function addRule(rule, callback) {
    var jsonInput = {input: rule};
    $.ajax({
        url: '/api/IPsec:rule-add',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    });
}


/**
 * insert a rule to the given position of the rule list
 * @param rule rule to be added
 * @param pos position to insert
 * @param callback(result) callback function to handle result
 */
function insertRule(rule, pos, callback) {
    rule.pos = pos;
    addRule(rule, callback);
}

/**
 * delete a rule in the given position of the rule list
 * @param pos position to delete
 * @param callback(result) callback function to handle result
 */
function deleteRule(pos, callback) {
    var jsonInput = {input: {position: pos}};
    $.ajax({
        url: '/api/IPsec:rule-del',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    });
}

/**
 * @param callback(gatewayList) callback function to handle conns
 */
function getGateways(callback) {
    $.ajax({
        url: '/api/IPsec:gateway-all',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            var gatewayList = JSON.parse(data.output.result)
            callback(gatewayList)
        }
    });
}

