/*global app, jasmine, describe, it, beforeEach, expect */

describe("controller", function() {
  "use strict";

  var subject, model, view;

  var setUpModel = function(todos) {
    model.read.and.callFake(function(query, callback) {
      callback = callback || query;
      callback(todos);
    });

    model.getCount.and.callFake(function(callback) {
      var todoCounts = {
        active: todos.filter(function(todo) {
          return !todo.completed;
        }).length,
        completed: todos.filter(function(todo) {
          return !!todo.completed;
        }).length,
        total: todos.length
      };

      callback(todoCounts);
    });

    model.remove.and.callFake(function(id, callback) {
      callback();
    });

    model.create.and.callFake(function(title, callback) {
      callback();
    });

    model.update.and.callFake(function(id, updateData, callback) {
      callback();
    });
  };

  var createViewStub = function() {
    var eventRegistry = {};
    return {
      render: jasmine.createSpy("render"),
      bind: function(event, handler) {
        eventRegistry[event] = handler;
      },
      trigger: function(event, parameter) {
        eventRegistry[event](parameter);
      }
    };
  };

  beforeEach(function() {
    model = jasmine.createSpyObj("model", [
      "read",
      "getCount",
      "remove",
      "create",
      "update"
    ]);
    view = createViewStub();
    subject = new app.Controller(model, view);
  });

  it("should show entries on start-up", function() {
    var todo = { title: "my todo" };
    setUpModel([todo]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
  });

  describe("routing", function() {
    it("should show all entries without a route", function() {
      var todo = { title: "my todo" };
      setUpModel([todo]);

      subject.setView("");

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });

    it('should show all entries without "all" route', function() {
      var todo = { title: "my todo" };
      setUpModel([todo]);

      subject.setView("#/");

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });

    it("should show active entries", function() {
      var todo = { title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("#/active");

      expect(model.read).toHaveBeenCalledWith(
        { completed: false },
        jasmine.any(Function)
      );

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });

    it("should show completed entries", function() {
      var todo = { title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("#/completed");

      expect(model.read).toHaveBeenCalledWith(
        { completed: true },
        jasmine.any(Function)
      );

      expect(view.render).toHaveBeenCalledWith("showEntries", [todo]);
    });
  });

  it("should show the content block when todos exists", function() {
    setUpModel([{ title: "my todo", completed: true }]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
      visible: true
    });
  });

  it("should hide the content block when no todos exists", function() {
    setUpModel([]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("contentBlockVisibility", {
      visible: false
    });
  });

  it("should check the toggle all button, if all todos are completed", function() {
    setUpModel([{ title: "my todo", completed: true }]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("toggleAll", {
      checked: true
    });
  });

  it('should set the "clear completed" button', function() {
    var todo = { id: 42, title: "my todo", completed: true };
    setUpModel([todo]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("clearCompletedButton", {
      completed: 1,
      visible: true
    });
  });

  it('should highlight "All" filter by default', function() {
    setUpModel([]);

    subject.setView("");

    expect(view.render).toHaveBeenCalledWith("setFilter", "");
  });

  it('should highlight "Active" filter when switching to active view', function() {
    setUpModel([]);

    subject.setView("#/active");

    expect(view.render).toHaveBeenCalledWith("setFilter", "active");
  });

  describe("toggle all", function() {
    beforeEach(function() {
      var todos = [
        { title: "one todo", completed: false, id: 42 },
        { title: "another todo", completed: false, id: 43 }
      ];
      setUpModel(todos);

      subject.setView("");

      view.trigger("toggleAll", { completed: true });
    });

    it("should toggle all todos to completed", function() {
      expect(model.update).toHaveBeenCalledWith(
        42,
        { completed: true },
        jasmine.any(Function)
      );
      expect(model.update).toHaveBeenCalledWith(
        43,
        { completed: true },
        jasmine.any(Function)
      );
    });

    it("should update the view", function() {
      expect(view.render).toHaveBeenCalledWith("elementComplete", {
        id: 42,
        completed: true
      });
      expect(view.render).toHaveBeenCalledWith("elementComplete", {
        id: 43,
        completed: true
      });
    });
  });

  describe("new todo", function() {
    beforeEach(function() {
      setUpModel([]);
      subject.setView("");
    });

    it("should add a new todo to the model", function() {
      view.trigger("newTodo", "a new todo");

      expect(model.create).toHaveBeenCalledWith(
        "a new todo",
        jasmine.any(Function)
      );
    });

    it("should add a new todo to the view", function() {
      view.render.calls.reset();
      model.read.calls.reset();
      model.read.and.callFake(function(callback) {
        callback([
          {
            title: "a new todo",
            completed: false
          }
        ]);
      });

      view.trigger("newTodo", "a new todo");

      expect(model.read).toHaveBeenCalled();

      expect(view.render).toHaveBeenCalledWith("showEntries", [
        {
          title: "a new todo",
          completed: false
        }
      ]);
    });

    it("should clear the input field when a new todo is added", function() {
      view.trigger("newTodo", "a new todo");

      expect(view.render).toHaveBeenCalledWith("clearNewTodo");
    });
  });

  describe("element removal", function() {
    beforeEach(function() {
      setUpModel([{ title: "my todo", completed: true, id: 37 }]);
      subject.setView("");
      view.trigger("itemRemove", { id: 37 });
    });

    it("should remove an entry from the model", function() {
      expect(model.remove).toHaveBeenCalledWith(37, jasmine.any(Function));
    });

    it("should remove an entry from the view", function() {
      expect(view.render).toHaveBeenCalledWith("removeItem", 37);
    });

    it("should update the element count", function() {
      expect(view.render).toHaveBeenCalledWith("updateElementCount", 0);
    });
  });

  describe("remove completed", function() {
    beforeEach(function() {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);

      subject.setView("");
      view.trigger("removeCompleted");
    });

    it("should remove a completed entry from the model", function() {
      expect(model.read).toHaveBeenCalledWith(
        { completed: true },
        jasmine.any(Function)
      );
      expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
    });

    it("should remove a completed entry from the view", function() {
      expect(view.render).toHaveBeenCalledWith("removeItem", 42);
    });
  });

  describe("element complete toggle", function() {
    it("should update the model", function() {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);
      subject.setView("");

      view.trigger("itemToggle", { id: 21, completed: true });

      expect(model.update).toHaveBeenCalledWith(
        21,
        { completed: true },
        jasmine.any(Function)
      );
    });

    it("should update the view", function() {
      var todo = { id: 42, title: "my todo", completed: true };
      setUpModel([todo]);
      subject.setView("");

      view.trigger("itemToggle", { id: 42, completed: false });

      expect(view.render).toHaveBeenCalledWith("elementComplete", {
        id: 42,
        completed: false
      });
    });
  });

  describe("edit item", function() {
    beforeEach(function() {
      var todo = { id: 21, title: "my todo", completed: false };
      setUpModel([todo]);

      subject.setView("");
    });

    it("should switch to edit mode", function() {
      view.trigger("itemEdit", { id: 21 });

      expect(view.render).toHaveBeenCalledWith("editItem", {
        id: 21,
        title: "my todo"
      });
    });

    it("should leave edit mode on done", function() {
      view.trigger("itemEditDone", { id: 21, title: "new title" });

      expect(view.render).toHaveBeenCalledWith("editItemDone", {
        id: 21,
        title: "new title"
      });
    });

    it("should persist the changes on done", function() {
      view.trigger("itemEditDone", { id: 21, title: "new title" });

      expect(model.update).toHaveBeenCalledWith(
        21,
        { title: "new title" },
        jasmine.any(Function)
      );
    });

    it("should remove the element from the model when persisting an empty title", function() {
      view.trigger("itemEditDone", { id: 21, title: "" });

      expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
    });

    it("should remove the element from the view when persisting an empty title", function() {
      view.trigger("itemEditDone", { id: 21, title: "" });

      expect(view.render).toHaveBeenCalledWith("removeItem", 21);
    });

    it("should leave edit mode on cancel", function() {
      view.trigger("itemEditCancel", { id: 21 });

      expect(view.render).toHaveBeenCalledWith("editItemDone", {
        id: 21,
        title: "my todo"
      });
    });

    it("should not persist the changes on cancel", function() {
      view.trigger("itemEditCancel", { id: 21 });

      expect(model.update).not.toHaveBeenCalled();
    });
  });
});
