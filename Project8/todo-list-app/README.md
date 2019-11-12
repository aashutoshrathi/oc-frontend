# Bugs

- /js/controller.js: Line 95

    ```diff
    +Controller.prototype.addItem = function (title) {
    -Controller.prototype.adddItem = function (title) {
    ```

- /js/app.js: Line 14

    ```diff
    +this.view = new app.View(this.template);
    -this.fview = new app.View(this.template);
    ```

# Loops optimized

- /js/controller.js: Line 165
  
  ```diff
  -     items.forEach(function(item) {
  -          if (item.id === id) {
  -               console.log("Element with ID: " + id + " has been removed.");
  -          }
  -     });
  -
  -     self.model.remove(id, function () {
  -         self.view.render('removeItem', id);
  -     });
  -
  -     self._filter();
  +     var found = items.find(function(item) {
  +			return item.id === id;
  +		})
  +
  +		if(found) {
  +			console.log("Element with ID: " + id + " has been removed.");
  +		    self.model.remove(id, function () {
  +				self.view.render('removeItem', id);
  +			});
  +	
  +		    self._filter();
  +		}
  ```
