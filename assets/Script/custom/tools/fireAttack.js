cc.Class({
    extends: cc.Component,

    properties: {
        attack: 50
    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        console.log('on collision enter');

        // ��ײϵͳ��������ײ�������������ϵ�µ���ص�ֵ�����ŵ� world �����������
        var world = self.world;

        // ��ײ����� aabb ��ײ��
        var aabb = world.aabb;

        // �ڵ���ײǰ��һ֡ aabb ��ײ���λ��
        var preAabb = world.preAabb;

        // ��ײ����������
        var t = world.transform;

        // ��������ΪԲ����ײ�����������
        var r = world.radius;
        var p = world.position;

        // ��������Ϊ ���� �� ����� ��ײ�����������
        var ps = world.points;
    }
});
