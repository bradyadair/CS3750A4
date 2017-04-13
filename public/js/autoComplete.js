var input = document.getElementById("mySearch");

var awesomplete = new Awesomplete(input, {
	list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"],
    minChars: 1
});