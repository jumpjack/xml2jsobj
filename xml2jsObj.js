var sax = require("sax");
var result;
var parser, stack, cur;
var inited = false;

function isEmpty(obj) {
	for(var i in obj) return false;
	return true;
}

exports.init = function(strict, options) {
	/// Defaults are like those in `sax` except `trim`.
	switch(arguments.length) {
		case 0: options = {strict: false}; break;
		case 1: options = {strict: strict}; break;
		case 2: options.strict = strict; break;
		default: console.error("Too many arguments.");
	}
	if(typeof options.trim == "undefined") options.trim = true;
	parser = sax.parser(options.strict, options);

	stack = [];
	parser.onopentag = function(node) {
		cur = node;
		cur.children = [];
		stack.push(cur);
	}
	parser.ontext = parser.oncdata = function(text) {
		if(!cur) {
			/// Maybe it's BOM?
			console.error("Warning: texts before the first tag.");
			return;
		}
		if(options.trim) text = text.trim();
		if(text && cur) {
			/// CDATA blocks may be broken up into multiple parts.
			/// @see https://www.npmjs.com/package/sax
			var c = cur.children.length;
			if(c && typeof cur.children[c - 1] == "string")
				cur.children[c - 1] += text;
			else cur.children.push(text);
		}
	}
	parser.onclosetag = function() {
		stack.pop();
		delete cur.isSelfClosing;
		if(isEmpty(cur.attributes)) delete cur.attributes;
		if(!cur.children.length) delete cur.children;
		if(stack.length) {
			var last = stack[stack.length - 1];
			last.children.push(cur);
			cur = last;
		}
		else result = cur;
	}
	inited = true;
};

exports.convert = function(str, callback) {
	if(!inited) this.init();
	parser.onend = function() {
		callback(null, result);
	}
	parser.write(str).close();
};
