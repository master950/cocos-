let Func0 = function (property) {
    protobuf.Message.call(this, property);
}

module.exports = {
    funcParam: [
        [
            'int32,optional,x',
            'int32,optional,y'
        ]
    ],
    params: [
        'string,optional,name',
        'int32,optional,score',
        'int32,optional,hp',
        'bool,optional,isJump',
        'bool,optional,isDead',
        'bool,optional,isBigger',
        'bool,optional,isAttact',
        'int32,optional,jumpLevel',
        'Func0,optional,position'
    ],
    funcs: [
        Func0
    ]
}