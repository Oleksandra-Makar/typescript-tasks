/* const calc = (initialInput) => {
    const report = []

    const add = (num) => {
        report.push(2)
        return calc(initialInput + num)
        //report.push({action: 'add', value: num, result: initialInput + num})

    }
    const subtract = (num) => {
        return calc(initialInput - num)
    }
    const multiply = (num) => {
        return calc(initialInput * num)
    }
    const divide = (num) => {
        return calc(initialInput / num)
    }
    const round = (num) => {
        if(num) {
            return calc(Math.round(num))
        }
        return calc(Math.round(initialInput))
    }

    const result = () => {
        console.log(initialInput)
        console.log(report)
        return report
    }
    return { add, subtract, multiply, divide, round, result }
}*/

interface ICalculator {
    add(num: number): this;
    subtract(num: number): this;
    divide(num: number): this;
    multiply(num: number): this;
    round(num: number): this;
    result(): void
}

enum CalculatorOperations {
    add = 'add',
    subtract = 'subtract',
    multiply = 'multiply',
    divide = 'divide',
    round = 'round',
}

interface IReport {
    action: CalculatorOperations
    value: number
    result: number
}

function calc( initialInput: number ): ICalculator {
    let accumulator = initialInput
    const report:IReport[] = []

    this.add = function add(num){
        let result = accumulator += num
        report.push({ action: CalculatorOperations.add, value: num, result })
        return this;
    }

    this.subtract = function subtract(num){
        let result = accumulator -= num
        report.push({ action: CalculatorOperations.subtract, value: num, result })
        return this
    }

    this.multiply = function multiply(num){
        let result = accumulator *= num
        report.push({action: CalculatorOperations.multiply, value: num,  result})
        return this;
    }

    this.divide = function divide(num){
        let result = accumulator /= num;
        report.push({action: CalculatorOperations.divide, value: num,  result})
        return this;
    }

    this.round = function round(num)  {
        let result = accumulator = Math.round(num)
        report.push({action: CalculatorOperations.round, value: num,  result})
        return this
    }

    this.result = function val(){
        console.log(report)
        return accumulator;
    }
    return this;
}

calc(0).add(5).multiply(2).add(3.3432).multiply(2).round(3).result()

// Додати віднімання, множення, ділення, округлення, очищення на якесь значення
// кожен результат має записатись та залогуватись
// calc(1).add(2).minus(4).result()
// Actions: [{ action: 'add', value: 2, result: 3}, {action: 'minus', value: 4, result: -1}]


// *відміна останнього action (calc(1).add(2).minus(4).add(-1).cancel()
// Параметри 'cancel' кількість кроків які відмінити

/*calc(0).add(1).add(2).add(3).result()

calc(1).add(2).add(4).result()*/
