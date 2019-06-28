class Spreads {
  static removeFromArray(arr, item) {
    return arr.filter(match => match !== item);
  }
  static addToArray(arr, item) {
    return [...arr, item];
  }
}

export default Spreads;
