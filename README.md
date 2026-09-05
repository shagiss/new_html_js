# new Html JS
Say goodbye to `document.createElement` / `document.createElementNS`, and say hello to `new Html`!

## What is this?

A new JS class to create HTML elements easily, Released under GNU GPL v2.
**How easy it is? That easy:**
```
let search = new Html("search");
```

The exact same code, two different ways.
**The old, native way:**
```
let search, form, input, button, label;
search = document.createElement("search");
form = document.createElement("form");
input = document.createElement("input");
button = document.createElement("button");
label = document.createElement("label");

button.type = "submit";
button.appendChild(document.createTextNode("Search!"));
input.type = "search";
input.name = "q";
label.appendChild(document.createTextNode("What's on your mind?"));
label.appendChild(input);
form.appendChild(label);
form.appendChild(button);
form.method = "GET";
form.action = "/search";
search.appendChild(form);
document.body.appendChild(search);
```

**The new, clean, elegant way**
```
search = new Html("search");
form = new Html("form");
input = new Html("input");
button = new Html("button");
label = new Html("label");

button.text("Search!");
label.text("What's on your mind?");

form.attrs({ method: "get", action: "/search" });
button.attrs({ type: "submit" });
input.attrs({ type: "search", name: "q" });

label.child(input);
form.child(label, button);
search.child(form);
```

Now you tell me which one you prefer more ;)

## Requirements
- A modern web browser

### Using Frameworks
- none. Pure JavaScript

## How to use?
For a comprehensive tutorial refer to "how-to-use.md" file in this repository.

Simply `git clone` this repository (or copy the contents of `index.js`) and then link to it in your html like this, at the bottom of your `<head>` tag:
```
    <!-- your head codes goes here -->
    <script src="new_html_js/index.js"></script>
</head>
```

Once it's linked to the webpage you can write your scripts in a separate file, or within body itself. for example:
```
        <script>
            let search = new Html("search");
            search.parent(document.body);
        </script>
        <!-- or -->
        <script src="/path/to/your/new_html_js_code.js"></script>
    </body>
</html>
```

### What if I want to create SVG and MathML elements? Is this supported?
**Of course it is!**
Here's an example for SVG:
```
// Create some example elements
const svg = new Html("svg");
const rect = new Html("rect", "svg");
const circle = new Html("circle", "svg");
svg.attrs({
    viewBox: "0 0 20 20",
    style: {
        width: "30px"
    }
});
rect.attrs({
    x: 0,
    y: 0,
    style: {
        width: "100%",
        height: "100%",
        fill: "#000"
    }
});
circle.attrs({
    cx: "50%",
    cy: "50%",
    r: 5,
    style: {
        fill: "unset",
        stroke: "rgb(255,255,255)",
        strokeWidth: "3px"
    }
});
svg.child(rect, circle);
svg.parent(document.body);
```

### I want to make it even easier. Can I use JSON with it?
**YES!** Here's an example:
```
const elements = {
    "math": {
        "child": {
            "mfrac": {
                "child": [
                    { "mn": { "text": 1 } },
                    { "mn": { "text": 3 } },
                ],
            },
        },
    },
};

for (let html in elements)
{

    let ns, ref;
    ns = html;
    ref = elements[html];

    // Create the element
    html = new Html(html);
    for (let child in ref.child)
    {

        let ref2 = ref.child[child];

        // Create the new element
        child = new Html(child, ns);
        // and append it as a new child of the parent
        html.child(child);

        // Now let's get even deeper
        for (let i = 0; i < ref2.child.length; i++)
        {

            for (let grandChild in ref2.child[i])
            {

                console.log(grandChild)
                let ref3 = ref2.child[i][grandChild];

                // Create a 3rd level child element
                grandChild = new Html(grandChild, ns);
                // Add text to it
                grandChild.text(ref3.text);
                // Append it to its parent
                child.child(grandChild);

            }
        }

    }
    html.parent(document.body);
}
```
Or in any other way you can think of!

## Need help?
See: `how-to-use.md` (and the source code)!

## If you loved it,
Let me know! I want to hear your opinion!
