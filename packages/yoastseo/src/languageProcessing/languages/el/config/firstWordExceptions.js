/**
 * Returns an array with exceptions for the sentence beginning research.
 * @type {Array} The array filled with exceptions.
 */
const firstWords = [
	// Definite articles:
	"o", "του", "τον ", "ο", "των", "τους", "η", "της", "την", "τις", "το", "τα",
	// Indefinite articles:
	"ένας", "ενός", "έναν", "μία", "μίας", "μία", "ένα", "μια", "μιας", "μια",
	// Numbers 1-10:
	"ένα", "δύο", "τρία", "τέσσερα", "πέντε ", "έξι", "επτά", "εφτά", "οκτώ", "οχτώ", "εννέα", "εννιά", "δέκα",
	// Demonstratives:
	"αυτός", "αυτού", "αυτόν", "αυτοί", "αυτών", "αυτούς", "αυτή", "αυτής", "αυτή", "αυτό", "αυτά", "εκείνος", "εκείνου",
	"εκείνον", "εκείνοι", "εκείνων", "εκείνη", "εκείνης", "εκείνη", "εκείνες", "εκείνο", "εκείνα", "τέτοιος", "τέτοιου",
	"τέτοιον", "τέτοιοι", "τέτοιων", "τέτοιους", "τέτοια", "τέτοιας", "τέτοιαν", "τέτοιες", "τέτοιο", "τέτοια", "τόσος",
	"τόσου", "τόσον", "τόσοι", "τόσων", "τόσους", "τόση", "τόσης", "τόσες", "τόσο", "τόσα", "τούτος", "τούτου", "τούτον",
	"τούτοι", "τούτων", "τούτους", "τούτη ", "τούτης", "τούτην ", "τούτες", "τούτο", "τούτα", "εδώ", "εκεί",
];

/**
 * Returns an array of words that can occur after demonstrative pronouns.
 *
 * @type {string[]} The array filled with exceptions.
 */
const secondWords = [
	// Definite articles and relative pronouns
	"o",
	"του",
	"τον ",
	"ο",
	"των",
	"τους",
	"η",
	"της",
	"την",
	"τις",
	"το",
	"τα",
	"που",
	"τον",
	"οι",
];

export default {
	firstWords: firstWords,
	secondWords: secondWords,
};
