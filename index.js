class Html
{
    
    /**
     *
     * new Html JS
     *
     * Class to make HTML tags.
     * and more to come soon
     *
     * See "how-to-use.md"
     * for explanation for each function
     *
     * Written by Nathanel (@shagiss, Linux Monkey on GitHub.com)
     * Released under GNU GPL v2
     * 
     */

    #ns;
    #html;
    constructor(tagName, nameSpace)
    {
        
        // tagName is a must;
        // If tagName is missing
        // then the entire class won't function.
        if (!this.#processTagName(tagName))
        {
            return console.error("invalid tagname");
        }

        // In case of namespaces,
        // Define allowed namespaces in a dict
        this.#ns = {
            "xhtml": "http://www.w3.org/1999/xhtml",
            "svg": "http://www.w3.org/2000/svg",
            "math": "http://www.w3.org/1998/Math/MathML",
        };
        // Now check if the namespace is valid.
        if (nameSpace != undefined)
        {

            // Make sure to convert the value into a string
            nameSpace = nameSpace.toString().toLowerCase();
            // In case of "MathML"
            if (nameSpace == "mathml") nameSpace = "math";
            // Now validate
            if (!this.#validateNameSpace(nameSpace)) return console.error("invalid namespace");

        }
        else
        {
            
            // In case of `svg' and `math' tags
            if (tagName == "svg" || tagName == "math") nameSpace = tagName;

        }

        // Return namespace
        this.#ns = this.#processNameSpace(nameSpace);
        // construct HTML
        this.#html = this.#buildHtmlTag(tagName);

    }

    /**
     * 
     * Private functions
     * for internal use only
     *
     */

    #processTagName(tagName)
    {
        // If variable is undefined
        if (tagName === undefined) return false;
        // If variable is not a string
        if (typeof tagName != "string") return false;
        // If variable is empty
        if (tagName == "") return false;
        // If variable contains whitespaces
        if (tagName.indexOf(" ") > -1) return false;
        // Otherwise
        return true;
    }

    #validateNameSpace(nameSpace)
    {
        // If your namespace exists in the keys
        // or in the values of this.#ns,
        // then it is a valid namespace.
        return Object.keys(this.#ns).includes(nameSpace) || Object.values(this.#ns).includes(nameSpace);
    }

    #processNameSpace(nameSpace)
    {
        // If this namespace exists in values,
        // simply return it.
        // otherwise, look for the right key
        return nameSpace in this.#ns ? this.#ns[nameSpace] : nameSpace;
    }

    #buildHtmlTag(tagName)
    {
        // Build that HTML tag
        return this.#ns ? document.createElementNS(this.#ns, tagName) : document.createElement(tagName);
    }

    #attrHandle(attrName, attrValue = true)
    {

        // This function is equivalent to:
        // HTMLElement.attribute = value
        // HTMLElement.setAttribute(attribute, value)
        // HTMLElement.dataset.attribute = value
        // HTMLElement.style.styleAttribute = value
        // HTMLElement.ariaAttribute = value
        // and so on...

        // If the value is an object:
        if (! (typeof attrValue == "string" || typeof attrValue == "number" || typeof attrValue == "boolean"))
        {
            // Is Object
            // could be:
            // dataset, style, etc.
            //
            switch (attrName)
            {
                case attrName == "data" || attrName == "dataset":
                    // dataset 
                    for (let i in attrValue) this.#html.dataset[i] = attrValue[i];
                    break;
                case "aria":
                    // ARIA
                    for (let i in attrValue) {
                        let attr = i.split("");
                        attr[0] = attr[0].toUpperCase();
                        attr = "aria" + attr.join("");
                        this.#html[attr] = attrValue[i];
                    }
                    break;
                case attrName == "style" || attrName == "css":
                    // CSS
                    for (let i in attrValue) this.#html.style[i] = attrValue[i];
                    break;
                default:
                    // Do nothing for now
            }

        }
        else
        {

            // If the value is a string, number or boolean:
            // Try to set this attribute in two different ways:
            try
            {
                this.#html[attrName] = attrValue;
            }
            catch (e)
            {
                this.#html.setAttribute(attrName, attrValue);
            }

        }

        return this;
    }

    /**
     *
     * Public functions
     * (or: "API")
     *
     */
    children()
    {
        // From where do we get the arguments...
        let args = arguments;
        if (args[1] == "REF-BY-ALIAS") args = args[0];

        for (let i = 0; i < args.length; i++)
        {

            // You can append child only under the following conditions:
            // It is of HTMLElement type:
            if (args[i] instanceof HTMLElement)
            {
                this.#html.appendChild(args[i]);
            }
            // Or it is an instance of this very class
            else if (args[i].constructor === Html)
            {
                this.#html.appendChild(args[i].#html);
            }

        }

        return this;
    }

    attributes()
    {
        // Attributes can be an object or a string.
        // What does this means?
        // here's an example.
        // if an attribute is a string, e.g.:
        // 'disabled', 'readOnly', etc.
        // then we set it to true.
        // if an attribute is an object,
        // e.g.: { name: "firstName", type: "text" ... }
        // then we set it through `setAttribute(...)'.
        let args = arguments;
        if (args[1] == "REF-BY-ALIAS") args = args[0];

        // Now do:
        for (let i = 0; i < args.length; i++)
        {
            // If this argument is a string
            if (typeof args[i] == "string") this.#attrHandle(args[i]);
            else if (args[i].constructor === Object)
            {
                for (let x in args[i]) this.#attrHandle(x, args[i][x]);
            }

        }
    
        return this;
    }

    text(string = "")
    {
        if (string == undefined) string = "";
        if (typeof string != "string") string = string.toString();
        this.#html.appendChild(document.createTextNode(string));
        return this;
    }

    parent(parentElement, insertBeforeIndex = -1)
    {
        // Give a unique identifier
        const htmlJsId = "_" + (new Date).getMilliseconds();
        this.#html.dataset.htmlJsId = htmlJsId;

        // If parentElement exists...
        if (parentElement instanceof Html) parentElement = parentElement.#html;
        if (parentElement instanceof HTMLElement)
        {
            // If the value of insertBeforeIndex is bigger than the amount of child elements
            // of the current parent,
            // set it to the last child
            if (insertBeforeIndex > parentElement.children.length) insertBeforeIndex = parentElement.children.length - 1;

            // Then set it.
            insertBeforeIndex > -1 ? parentElement.insertBefore(this.#html, parentElement.children[insertBeforeIndex]) : parentElement.appendChild(this.#html);

            // Then refer to it.
            this.#html = document.querySelector('[data-html-js-id="' + htmlJsId + '"]');
        }

        delete this.#html.dataset.htmlJsId;
        return this;
    }

    outer()
    {
        // Print `.outerHTML'
        return this.#html.outerHTML;
    }

    return() 
    {
        // Return reference of this object
        return this.#html;
    }

    /**
     * 
     * Aliases
     * 
     * Instead of writing:
     * children, attributes, etc.
     * 
     * Write:
     * child, attr, etc.
     *
     */
    child() { return this.children(arguments, "REF-BY-ALIAS") }
    attr() { return this.attributes(arguments, "REF-BY-ALIAS") }
    attrs() { return this.attributes(arguments, "REF-BY-ALIAS") }
    outerHTML() { return this.outer() }
    outerHtml() { return this.outer() }
    ref() { return this.return() }

}
