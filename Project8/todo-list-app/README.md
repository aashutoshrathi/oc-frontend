# OC Project 8

In this project, an already existing codebase is provided by OpenClassroom.
The codebase belongs to the famous [TodoMVC](http://todomvc.com/) Project, the language they chose was Vanilla JS.

## Bugs

- /js/controller.js: Line 95

    ```diff
    +Controller.prototype.addItem = function (title) {
    -Controller.prototype.adddItem = function (title) {
    ```

## Loops optimized

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
