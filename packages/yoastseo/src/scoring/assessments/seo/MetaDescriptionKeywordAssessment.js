import { merge } from "lodash-es";

import Assessment from "../assessment";
import { createAnchorOpeningTag } from "../../../helpers/shortlinker";
import AssessmentResult from "../../../values/AssessmentResult";

/**
 * Assessment for checking the keyword matches in the meta description.
 */
class MetaDescriptionKeywordAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} [config] The configuration to use.
	 * @param {number} [config.parameters.recommendedMinimum] The recommended minimum of keyword occurrences in the meta description.
	 * @param {number} [config.scores.good] The score to return if there are enough keyword occurrences in the meta description.
	 * @param {number} [config.scores.bad] The score to return if there aren't enough keyword occurrences in the meta description.
	 * @param {string} [config.url] The URL to the relevant article on Yoast.com.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMinimum: 1,
			},
			scores: {
				good: 9,
				ok: 6,
				bad: 3,
			},
			urlTitle: "",
			urlCallToAction: "",
		};

		this.identifier = "metaDescriptionKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the metaDescriptionKeyword researcher and based on this, returns an assessment result with score.
	 *
	 * @param {Paper}      paper      The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Jed}        i18n       The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this._keyphraseCounts = researcher.getResearch( "metaDescriptionKeyword" );
		const assessmentResult = new AssessmentResult();
		const calculatedResult = this.calculateResult( i18n, researcher );

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Returns the result object based on the number of keyword matches in the meta description.
	 *
	 * @param {Jed} i18n The object used for translations.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @returns {Object} Result object with score and text.
	 */
	calculateResult( i18n, researcher ) {
		let urlTitle = this._config.urlTitle;
		let urlCallToAction = this._config.urlCallToAction;
		// Get the links
		const links = researcher.getData( "links" );
		// Check if links for the assessment is available in links data
		if ( links[ "shortlinks.metabox.SEO.metadescription_keyword" ] && links[ "shortlinks.metabox.SEO.metadescription_keywordCall_to_action" ] ) {
			// Overwrite default links with links from configuration
			urlTitle = createAnchorOpeningTag( links[ "shortlinks.metabox.SEO.metadescription_keyword" ] );
			urlCallToAction = createAnchorOpeningTag( links[ "shortlinks.metabox.SEO.metadescription_keywordCall_to_action" ] );
		}

		// GOOD result when the meta description contains a keyphrase or synonym 1 or 2 times.
		if ( this._keyphraseCounts === 1 || this._keyphraseCounts === 2 ) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(
					/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%1$sKeyphrase in meta description%2$s: Keyphrase or synonym appear in the meta description. Well done!"
					),
					urlTitle,
					"</a>"
				),
			};
		}

		// BAD if the description contains every keyword term more than twice.
		if ( this._keyphraseCounts >= 3 ) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(
					/**
					 * Translators:
					 * %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag,
					 * %3$s expands to the number of sentences containing the keyphrase,
					 * %4$s expands to a link on yoast.com, %5$s expands to the anchor end tag.
					 */
					i18n.dgettext(
						"js-text-analysis",
						"%1$sKeyphrase in meta description%2$s: The meta description contains the keyphrase %3$s times, " +
						"which is over the advised maximum of 2 times. %4$sLimit that%5$s!"
					),
					urlTitle,
					"</a>",
					this._keyphraseCounts,
					urlCallToAction,
					"</a>"
				),
			};
		}

		// BAD if the keyphrases is not contained in the meta description.
		return {
			score: this._config.scores.bad,
			resultText: i18n.sprintf(
				/**
				 * Translators:
				 * %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag.
				 * %3$s expands to a link on yoast.com, %4$s expands to the anchor end tag.
				 */
				i18n.dgettext(
					"js-text-analysis",
					"%1$sKeyphrase in meta description%2$s: The meta description has been specified, " +
					"but it does not contain the keyphrase. %3$sFix that%4$s!"
				),
				urlTitle,
				"</a>",
				urlCallToAction,
				"</a>"
			),
		};
	}

	/**
	 * Checks whether the paper has a keyword and a meta description.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True if the paper has a keyword and a meta description.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasDescription();
	}
}

export default MetaDescriptionKeywordAssessment;
