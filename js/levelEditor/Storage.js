function Storage() {
  this.getItem = function(itemName) {
    let item = localStorage.getItem(itemName);

    return item;
  };

  this.getLength = function() {
    let length = localStorage.length;

    return length;
  };

  this.getItemName = function(keyValue) {
    let name = localStorage.key(keyValue);

    return name;
  };

  this.setItem = function(itemName, itemData) {
    localStorage.setItem(itemName, JSON.stringify(itemData));
  };

  this.clear = function() {
    localStorage.clear();
  };
}
