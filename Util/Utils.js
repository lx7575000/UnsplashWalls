export default {
  uniqueRandomNumbers(numRandomNumbers, lowerLimit, upperLimit){
    var uniqueNubmers = [];
    while (uniqueNubmers.length != numRandomNumbers) {
      let currentRandomNumber = this.randomNumberInRange(lowerLimit, upperLimit);
      if(uniqueNubmers.indexOf(currentRandomNumber) === -1)
        uniqueNubmers.push(currentRandomNumber);
    }
    return uniqueNubmers;
  },
  randomNumberInRange(lower, upper){
    return Math.floor( Math.random() * (1 + upper - lower) ) + lower;
  },
  distance(x0, y0, x1, y1){
    return Math.sqrt(Math.pow(( x1 - x0 ), 2) + Math.pow(( y1 - y0 ), 2) );
  }
}
