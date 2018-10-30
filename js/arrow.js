function Arrow(){
    this.x = 0;
    this.y = 0;
    this.color = 'lightskyblue';
    this.rotation = 0;
}
Arrow.prototype.draw = function(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);  //旋转当前绘图
    context.lineWidth = 1;      //重新映射画布上的 (0,0) 位置
    context.fillStyle = this.color;
    context.beginPath();    //绘制箭头
    context.moveTo(-50, -25);
    context.lineTo(0, -25);
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.lineTo(-50, -25);
    context.closePath();
    context.fill();     //填充当前绘图
    context.stroke();   //绘制已定义的路径
    context.restore();  //返回之前保存过的路径状态和属性
}