const input_loaded = true;

export default input_loaded;

/**
 * Class used to map keycodes and return a direction string
 * based on a keycode
 */
export class KeyMappings {
    /**
     * 
     * @param {number} upKey    Keycode value for up
     * @param {number} downKey  Keycode value for down
     * @param {number} leftKey  Keycode value for left 
     * @param {number} rightKey Keycode value for right
     */
    constructor(upKey = 38, downKey = 40, leftKey = 37, rightKey = 39) {
        this._up = upKey;
        this._down = downKey;
        this._left = leftKey;
        this._right = rightKey;
    }

    /**
     * Turns keycode to direction it is mapped to.
     * @param {number} key Keycode we want to turn into a direction string
     * @return {string} "UP,DOWN,LEFT,RIGHT" if matched, false if no match.
     */
    getDirection(key) {
        switch (key) {
            case this._up:
                return "UP";

            case this._down:
                return "DOWN";

            case this._left:
                return "LEFT";

            case this._right:
                return "RIGHT";
        }
    }

    /**
     * @param {number} key keycode to map to up
     */
    set up(key) {
        this._up = key;
    }

    /**
     * Get keycode mapped to up
     */
    get up() {
        return this._up;
    }

    /**
     * @param {number} key keycode to map to down
     */
    set down(key) {
        this._down = key;
    }

    /**
     * Get keycode mapped to down
     */
    get down() {
        return this._down;
    }

    /**
     * @param {number} key keycode to map to left
     */
    set left(key) {
        this._left = key;
    }

    /**
     * Get keycode mapped to left
     */
    get left() {
        return this._left;
    }

    /**
     * @param {number} key keycode to map to right
     */
    set right(key) {
        this._right = key;
    }

    /**
     * Get keycode mapped to right
     */
    get right() {
        return this._right;
    }
}