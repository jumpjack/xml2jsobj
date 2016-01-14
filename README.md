# xml2jsobj
Convert XML string to JS object.

## Install
`npm install xml2jsobj`

## Usage
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
{	"name": "R",
	"children": [
		{	"name": "A",
			"children": ["A1"]
		},
		{
			"name": "B",
			"attributes": {"C": "d"},
			"children": ["B"]
		},
		{
			"name": "A",
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
* Maintain the order of the children. The `<a>` tags are not combined as an array.
* Even with only one child, the node would still have a `children` member as an array.
