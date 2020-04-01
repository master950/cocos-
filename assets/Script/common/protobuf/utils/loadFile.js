let Type = protobuf.Type,
    Field = protobuf.Field,
    OneOf = protobuf.OneOf,
    that = this;

function load(config) {
    let params = config.params,
        funcParam = config.funcParam,
        funcs = config.funcs

    let main = function(property){
        protobuf.Message.call(this, property);
    }

    for (let i = 0; i < funcParam.length; i++) {
        (funcs[i].prototype = Object.create(protobuf.Message)).constructor = funcs[i];
        funcParam[i].forEach((parms, ind) => {
            let parm = parms.split(',');
            let type = parm[0],
                option = parm[1],
                name = parm[2];
            Field.d(ind + 1, type, option)(funcs[i].prototype, name);
        });
    }

    (main.prototype = Object.create(protobuf.Message)).constructor = main;
    params.forEach((param, index) => {
        console.log(param)
        var parm = param.split(',');
        var type = parm[0],
            option = parm[1],
            name = parm[2];
        Field.d(index+1, type, option)(main.prototype, name);
    });
    console.log(protobuf)
    return main;
}

module.exports = load