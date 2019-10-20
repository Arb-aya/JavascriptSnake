const input_loaded = true;

export default input_loaded;

export class KeyMappings {
    //Default mapped to the arrow keys
    constructor(upKey = 38, downKey = 40, leftKey = 37, rightKey = 39) {
        this._up = upKey;
        this._down = downKey;
        this._left = leftKey;
        this._right = rightKey;
    }

    /* If the given keycode matches any of the mapped
     * up, down, left or right keys it returns a string
     * with the given direction. Otherwise returns false
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

            default:
                return false;
        }
    }

    //Setters and getters
    set up(key) {
        this._up = key;
    }

    get up() {
        return this._up;
    }

    set down(key) {
        this._down = key;
    }

    get down() {
        return this._down;
    }

    set left(key) {
        this._left = key;
    }

    get left() {
        return this._left;
    }

    set right(key) {
        this._right = key;
    }

    get right() {
        return this._right;
    }
}