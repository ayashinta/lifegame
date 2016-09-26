/*
作者：罗皓天
班级：软件41
名称：lifeGame
功能：完成作业并用此程序练习单元测试
时间2016.9.26
*/


var life;
var lifes = [];
var lifeTimer = 0;

function lifeGame(size) {
    this.size = size;
    this.box = [];
    if (this.size > 100) return false;
}

//初始化生命游戏棋盘
function init()
{
    var rect = new fabric.Rect({width:700,height:700,fill:'black'});
    canvas.add(rect);
    canvas.renderAll();
    life = new lifeGame(50);
    life.Random(25);
    var width  = 700/life.size;
    var height = 700/life.size;
    for(var i=0;i<life.size;i++)
    {
        lifes[i] = [];
        for(var j=0;j<life.size;j++)
        {
            lifes[i][j] = new fabric.Rect({
            top:    i*height,
            left:   j*width,
            width:  width,
            height: height,
            fill:   'red',
            selectable: false,
            stroke: 'blue',
            strokeWidth: 0.3
            });
            canvas.add(lifes[i][j]);
        }
    }
}

//绘制每个细胞的生存状态
function drawLife()
{
    for(var i=0;i<life.size;i++)
    {
        for(var j=0;j<life.size;j++)
        {
            if (life.box[i][j].now === 1)
            {
                lifes[i][j].visible = true;
            }
            else
            {
                lifes[i][j].visible = false;
            }
        }
    }
    canvas.renderAll();
    life.nextAll();
    life.newstate();
}

//按percent百分比初始化初始细胞个数
lifeGame.prototype.Random = function(percent) {
    for(var i=0;i<this.size;i++)
    {
        this.box[i] = [];
        for(var j=0;j<this.size;j++)
        {
            if (Math.random() <= percent / 100)
            {
                this.box[i][j] = {'now':1, 'next':1};
            }
            else
            {
                this.box[i][j] = {'now':0, 'next':0};
            }
        }
    }
};

//计算周围细胞存活个数
lifeGame.prototype.countAround = function(x,y) {
    return  this.box[this.toBeUlimited(x-1)][this.toBeUlimited(y-1)].now +
            this.box[this.toBeUlimited(x-1)][this.toBeUlimited(y+1)].now +
            this.box[this.toBeUlimited(x+1)][this.toBeUlimited(y-1)].now +
            this.box[this.toBeUlimited(x+1)][this.toBeUlimited(y+1)].now +
            this.box[this.toBeUlimited(x+1)][y].now +
            this.box[this.toBeUlimited(x-1)][y].now +
            this.box[x][this.toBeUlimited(y-1)].now +
            this.box[x][this.toBeUlimited(y+1)].now;
};

//计算边界格子时需要处理成上下左右连接的来实现棋盘无限延展
lifeGame.prototype.toBeUlimited = function(x) {
    if (x < 0) return (x+this.size);
    else if (x >= this.size) return (x-this.size);
    else return x;
};

//计算一个细胞下一时间的状态
lifeGame.prototype.next = function(x,y) {
    if (this.countAround(x,y) >= 4)
    {
        return 0;
    }
    else if(this.countAround(x,y) === 3)
    {
        return 1;
    }
    else if(this.countAround(x,y) >= 2)
    {
        return this.box[x][y].next;
    }
    else
    {
        return 0;
    }
};

//计算所有细胞下一时间的状态
lifeGame.prototype.nextAll = function() {
    for(var i=0;i<this.size;i++)
    {
        for(var j=0;j<this.size;j++)
        {
            this.box[i][j].next = this.next(i, j);
        }
    }
};

//更新所有细胞状态
lifeGame.prototype.newstate = function() {
    for(var i=0;i<this.size;i++)
    {
        for(var j=0;j<this.size;j++)
        {
            this.box[i][j].now = this.box[i][j].next;
        }
    }
};