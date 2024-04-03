export class Primary{
    constructor(num1, num2){
        this.INIT = [num1, num2];
        this.sum(num1, num2);
        this.subtract(num1, num2)
    };
    sum(val1, val2){
        this.SUM = (val1+val2)
    };
    subtract(val1,val2){
        this.SUBTRACT = (val1-val2)
    }
};

export class Secondary extends Primary{
    constructor(num1, num2){
        super(num1, num2);
        this.times(num1, num2);
        this.divide(num1, num2)
    };
    times(val1, val2){
        this.TIMES = (val1*val2)
    };
    divide(val1, val2){
        this.DIVIDE = (parseFloat((val1/val2).toFixed(2)))
    }
}

export class Terciary extends Secondary{
    constructor(num1, num2){
        super(num1, num2);
        this.powerof(num1, num2);
        this.square(num1, num2)
    };
    powerof(val1, val2){
        this.SQR_POW = [val1**2,val2**2]
    };
    square(val1,val2){
        this.SQR_ROOT = [Math.sqrt(val1),Math.sqrt(val2)] 
    }
}