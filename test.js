require("./xml2jsObj.js").convert(
	'<r>\
		<a>A1</a>\
		<b c="d">B</b>\
		<a>\
			A2\
			<e />\
		</a>\
	</r>',
	function(err, result) {
		console.log(JSON.stringify(result, null, 4));
	}
);
