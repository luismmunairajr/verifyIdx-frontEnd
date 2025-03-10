export const evaluateCondition = (condition, context) => {
    const { leftOperand, operator, rightOperand } = condition;
  
    // Substitua os operandos pelos valores do contexto (se necessário)
    const leftValue = context[leftOperand] || leftOperand;
    const rightValue = context[rightOperand] || rightOperand;
  
    // Avalie a condição
    switch (operator) {
      case '>':
        return leftValue > rightValue;
      case '<':
        return leftValue < rightValue;
      case '==':
        return leftValue == rightValue;
      case '!=':
        return leftValue != rightValue;
      default:
        return false;
    }
  };