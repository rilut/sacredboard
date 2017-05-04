/*global QUnit*/ //for eslint to ignore missing QUnit
define(["runs/dictionaryBrowser/DictEntry"],
    function (DictEntry) {
        QUnit.module("dictionaryBrowser/DictEntry");
        QUnit.test("Test toggleCollapse",
            function (assert) {
                var entry = new DictEntry("", []);
                assert.ok(entry.contentCollapsed());
                entry.toggleCollapse();
                assert.notOk(entry.contentCollapsed());
                entry.toggleCollapse();
                assert.ok(entry.contentCollapsed());
            });
        QUnit.test("Test hasChildren",
            function (assert) {
                var entry = new DictEntry("", 123);
                assert.notOk(entry.hasChildren());

                entry = new DictEntry("", "text");
                assert.notOk(entry.hasChildren());

                entry = new DictEntry("", [1, 2, 3]);
                assert.ok(entry.hasChildren());

                entry = new DictEntry("", []);
                assert.ok(entry.hasChildren());

                entry = new DictEntry("", {});
                assert.ok(entry.hasChildren());

                entry = new DictEntry("", {"name": "I don't know"});
                assert.ok(entry.hasChildren());
            });

        QUnit.test("Test getDisplayName",
            function (assert) {
                var entry = new DictEntry("This is my name", []);
                assert.equal(entry.name, "This is my name");
            });
        QUnit.test("Test getDisplayValue",
            function (assert) {
                var entry = new DictEntry("asdf", "str");
                assert.equal(entry.getDisplayValue(), "str");
                entry = new DictEntry("asdf", 123);
                assert.equal(entry.getDisplayValue(), 123);

                entry = new DictEntry("asdf", {});
                assert.equal(entry.getDisplayValue(), "{...}");

                entry = new DictEntry("asdf", {"content": "something"});
                assert.equal(entry.getDisplayValue(), "{...}");

                entry = new DictEntry("asdf", []);
                assert.equal(entry.getDisplayValue(), "[]");

                entry = new DictEntry("asdf", [1]);
                assert.equal(entry.getDisplayValue(), "[1]");


                entry = new DictEntry("asdf", ["1"]);
                assert.equal(entry.getDisplayValue(), "[1]");

                entry = new DictEntry("asdf", ["1", 2, "str"]);
                assert.equal(entry.getDisplayValue(), "[1, 2, str]");

                entry = new DictEntry("asdf", [{"obj": "object"}, 2, "str"]);
                assert.equal(entry.getDisplayValue(), "[{...}, 2, str]");

                entry = new DictEntry("asdf", [1, 2, null]);
                assert.equal(entry.getDisplayValue(), "[1, 2, null]");


                var date = new Date(2017, 3, 4, 11, 25, 0, 0);
                entry = new DictEntry("asdf", date);
                assert.equal(entry.getDisplayValue(), date.toLocaleString());
            });

        QUnit.test("Test getChildren",
            function (assert) {
                var entry = new DictEntry("asdf", "nothing");
                assert.deepEqual(entry.getChildren(), []);

                entry = new DictEntry("asdf", null);
                assert.deepEqual(entry.getChildren(), []);

                entry = new DictEntry("asdf", 12);
                assert.deepEqual(entry.getChildren(), []);

                entry = new DictEntry("asdf", [{"obj": "object"}, 2, "str"]);
                var children = entry.getChildren();
                assert.ok(children instanceof Array);
                assert.equal(children.length, 3);
                for (var i = 0; i < children.length; i++) {
                    //For arrays, each of the children's name must be its index
                    assert.equal(children[i].getDisplayName(), i);
                    assert.ok(children[i].contentCollapsed());
                }
                assert.equal(children[0].getDisplayValue(), "{...}");
                assert.equal(children[1].getDisplayValue(), "2");
                assert.equal(children[2].getDisplayValue(), "str");

                entry = new DictEntry("asdf", {"obj": {}, "arr": [1,2], "str": "string"});
                children = entry.getChildren();
                assert.ok(children instanceof Array);
                assert.equal(children.length, 3);
                assert.equal(children[0].getDisplayName(), "obj");
                assert.equal(children[1].getDisplayName(), "arr");
                assert.equal(children[2].getDisplayName(), "str");
                assert.equal(children[0].getDisplayValue(), "{...}");
                assert.equal(children[1].getDisplayValue(), "[1, 2]");
                assert.equal(children[2].getDisplayValue(), "string");

            });

    });