# How to use?

Start by downloading the `index.js` file in one of the following ways:
1. `git clone` this repository;
2. Copy the contents of `index.js` and save it on your local machine/server.

Then, call it like this:
```
        <script src="new_html_js/index.js"></script>
    </head>
```

Once it's loaded, you can use it.

## 1. Create a variable
You can create a variable that will refer to the object, like this:
```
const div = new Html("div")
```

If you're using any namespace object (such as child elements of `svg` and `math`), You should set the second argument to the root element name.
e.g., for creating a `<circle>` or `<rect>` object (or any other svg-child object), you should do:
```
const rect = new Html("rect", "svg");
const circle = new Html("circle", "svg");
const path = new Html("path", "svg");
```
Note that the second argument is SVG, which means it will be created using `document.createElementNS`, with the relevant namespace.

If it was MathML object then:
```
const mfrac = new Html("mfrac", "math");
```
The class "translates" that "math"/"svg" parameter into a `namespaceURI`, which is being appended to the object during the creation (`document.createElementNS(...)`).

## 2. Use properties
There are several properties available. They are:

`.children(child1, child2, child3, ...)`

`.child(...)` _(alias)_

Appending children elements. There is no limit for how much you can add.
child elements can be new instances of this object, or HTMLElement.
Examples:

```
const div = new Html("div");
const p = new Html("p");
const h1 = new Html("h1");
div.child(h1, p);
```

**Note** that the order matters.

----
`.attributes(json, text, ...)`

`.attr(...)` _(alias)_

`.attrs(...)` _(alias)_

Creates attributes.

If an attribute is just text (e.g.: `.attributes("readOnly")`), then it treats it as boolean set to 'true' (e.g.: `html.readOnly = true`).
If an attribute is JSON, then it takes a `key: value` pair and sets it as it should be.

Available options:
- All attributes;
- `style`/`css`, `aria` and `data`/`dataset`: creates something like: `div.style.yourProperty = yourValue;`, `div.ariaProperty = value`, etc.

----
`.parent(element, insertBefore)`

Appending / inserting before a child element of the parent, to the parent element.
Element can be an existing element, such as:
```
div.parent(document.body)
```
and element can be an instance of Html, like this:
```
const parent = new Html("main");
div.parent(parent);
```
But the last option is not recommended; When it comes to `new Html` instances, prefer the `child` method instead.

----
`.text(string)`

Creates text nodes within that element. (like `HTMLElement.innerText = ...`)

----
`.outer()`

`.outerHTML()` _(alias)_

`.outerHtml()` _(alias)_

returns the outer html of the element. (returns `string`)
for example:

```
const form = new Html("form");
const outerhtml = form.child(...).attrs(...).outer();
// Will return: '<form ...>...</form>'
```

----
`.return()`

`.ref()` _(alias)_

Returns a reference to the created HTML object. (returns `HTMLElement`)
it is useful if you wish to attach events, and do more things.
for example:

```
const form = new Html("form");
form.child( (new Html("button")).text("Send").attrs({ type: "submit" }) )
    .return()
    .addEventListener("submit", function(e) {
        e.preventDefault();
        alert("This form is prevented from acting by default behavior!");
        return false;
    });
form.parent(document.body);
```

## 3. Chain properties
Unless your last property is `.return()` or `.outer()`, you can chain all properties. examples:

```
const html = new Html("div");
html.child( (new Html("h1")).text("Hello World!"), (new Html("p")).text("Hello World!") )
    .attrs({ style: { backgroundColor: "#000", color: "#fff" })
    .parent(document.body)
```

You can do:
```
html.attrs( .. more attributes )
    .child( .. more child elements )
    .return()
```

But you can't do:
```
html.attrs(...)
    .child(...)
    .return()
    .text("This will not work!!!")
    .child(...)
```

That's because `.return()` will return the HTML object.

You can, however, chain the native `.addEventListener` to return:
```
html...
    .return()
    .addEventListener(event, function)
```
And you can also access that HTMLElement through the native properties, such as:
```
const div = new Html("div");
const reference = div.child(...).attrs(...).return();
reference.whatever = "whatever";
```

## 4. If you're using `dataset`, Inline CSS and more
You can set some HTML properties JS-style, like this:
```
// Native JS
...
e.style.backgroundColor = "#000";

// new Html way
e.attrs({
    ...
    css: {
        backgroundColor: "#000"
    }
    ...
});
```

It also works for aria-related stuff such as:
```
// Native JS
...
e.ariaHidden = true;

// new Html way
e.attrs({
    ...
    aria: {
        hidden: true
    }
    ...
});
```

and as you can tell, you can combine them with other attributes.
let's demonstrate `dataset` with the others, in two different ways:
```
let form;
// Native JS
form = document.createElement("form");
form.action = "/search";
form.method = "get";
form.style.backgroundColor = "#000";
form.style.color = "#fff";
form.dataset.formName = "search";
form.ariaHidden = true;

// new Html way
form = new Html("form");
form.attrs({ 
    action: "/search", 
    method: "get", 
    css: { backgroundColor: "#000", color: "#fff" },
    data: { formName: "search" },
    aria: { hidden: true }
});
```

## See the source code!
Learn more by reading the source code. It can help you understand how things work and how to use it.

# What's next?
I plan to create new class, named "`Rdyblock`" ("Ready Block"), which will prepare valid HTML blocks such as forms ("contact us", "search" and more) without the needing of creating all these things.
the idea is to make things faster, clean and easy. All you need is to call "Rdyblock" with the requested block, and it'll do the rest for you.
