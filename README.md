# xml2jsobj
Convert XML string to JS object and maintain the order.

## Install
`npm install xml2jsobj`

## Example
```javascript
require("./xml2jsobj.js").convert(
    '<r>\
        <a>A1</a>\
        <b c="d">B</b>\
        <a>\
            A2\
            <e />\
        </a>\
    </r>',
    function(err, result) {
        console.dir(result);
    }
);
```

### Output
```javascript
{   "name": "R",
    "children": [
        {   "name": "A",
            "children": ["A1"]
        },
        {   "name": "B",
            "attributes": {"C": "d"},
            "children": ["B"]
        },
        {   "name": "A",
            "children": [
                "A2",
                {"name": "E"}
            ]
        }
    ]
}
```

## Idea: just be stupid
* There are at most three member for each node: `name`, `attributes`, `children`.
* Maintain the order of the children. In the example above, the `<a>` tags are NOT combined as an array (which most other packages such as `xml2js` and its dependents do), and therefore the result object still knows that the second `<a>` tag is after the `<b>` tag.
* Even with only one child, the node would still have a `children` member as an array.

## Usage
Call `<obj>.init` for initialization if you need. The arguments are just like that for [sax](https://www.npmjs.com/package/sax)'s parser, except that `trim` is default to `true`.
