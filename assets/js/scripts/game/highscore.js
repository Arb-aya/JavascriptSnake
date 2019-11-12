"use strict";

const hs_loaded = true;

export default hs_loaded;

/**
 * Manages the scores of the current session in an ordered list.
 */
export class HighscoreTable {
    /**
     * 
     * @param {number} maxNumOfScores How many scores to keep track of
     */
    constructor(maxNumOfScores = 5) {
        this._scores = [];
        this.MAX_LENGTH = maxNumOfScores;
    }

    /**
     * Adds a number to highscore list
     * @param {number} score Score to add to the highscore list
     */
    add(score) {
        /**
         * If we have no scores, add the score to the array and 
         * exit the function
         */
        if (this._scores.length === 0) {
            this._scores.push(score);
        }
        else {
            /**
             * Otherwise we do have scores:
             * Find the index of where to insert the new score
             */
            let index = this._scores.findIndex(function (currentScore) {
                return score >= currentScore;
            });

            //If the index is -1, then add the element at the end of the array
            if (index < 0) {
                this._scores.push(score);
                //Otherwise insert it at index
            } else {
                this._scores.splice(index, 0, score);
            }
        }

        /**
         * If after adding the score, the number of scores we are tracking
         * is greater than the max length. Remove the last score.
         */
        if (this._scores.length > this.MAX_LENGTH) {
            this._scores.pop();
        }
    }


    /**
     * Return the the scores as an ordered list
     */
    getScoresList() {
        return this._scores;
    }

}