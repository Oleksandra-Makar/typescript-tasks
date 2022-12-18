interface IReport {
    action: CalculatorOperations;
    value: number;
    result: number;
}
interface IActionResult {
    state: number;
}
interface ICalculator {
    add(num: number): ICalculator;
    subtract(num: number): ICalculator;
    divide(num: number): ICalculator;
    multiply(num: number): ICalculator;
    round(num: number): ICalculator;
    result(): IReport[];
    undo(steps?: number): ICalculator;
}

enum CalculatorOperations {
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    divide = "divide",
    round = "round"
}

const calc = (
    initialInput: number,
    report: IReport[] = [],
    actionResults: IActionResult[] = []
): ICalculator => {
    const setState = (state: number): IActionResult[] => {
        actionResults.push({ state });
        return actionResults;
    };
    const restore = (state: IActionResult) => state.state;

    const undo = (steps: number = 1) => {
        const lastActionResult = actionResults.splice(-steps, steps);
        const result =
            lastActionResult && actionResults.length > 0
                ? restore(actionResults[actionResults.length - 1])
                : restore({ state: initialInput });

        report.splice(-steps, steps);
        return calc(result, report, actionResults);
    };

    const add = (num: number) => {
        const result: number = (initialInput += num);
        report.push({ action: CalculatorOperations.add, value: num, result });
        return calc(result, report, setState(result));
    };

    const subtract = (num: number) => {
        const result = (initialInput -= num);
        report.push({ action: CalculatorOperations.subtract, value: num, result });
        return calc(result, report, setState(result));
    };

    const multiply = (num: number) => {
        const result = (initialInput *= num);
        report.push({ action: CalculatorOperations.multiply, value: num, result });
        return calc(result, report, setState(result));
    };

    const divide = (num: number) => {
        const result = (initialInput /= num);
        report.push({ action: CalculatorOperations.divide, value: num, result });
        return calc(result, report, setState(result));
    };

    const round = (num: number) => {
        const result = num ? Math.round(num) : Math.round(initialInput);
        report.push({ action: CalculatorOperations.round, value: num, result });
        return calc(result, report, setState(result));
    };

    const result = () => {
        return report;
    };

    return { add, subtract, multiply, divide, round, result, undo };
};
const calc1 = calc(3).add(2).subtract(4).add(2).result();
console.log(calc1);