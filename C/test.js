const assert = require('assert').strict;
const printTree = require('./index');

/**
 * @typedef Data
 * @type {Number}
 */

class BinaryTreeNode {
    /**
     * @param {Data} data
     */
    constructor(data) {
        /**
         * @type {Data}
         */
        this.data = data;
        /**
         * @type {BinaryTreeNode | null}
         */
        this.left = null;
        /**
         * @type {BinaryTreeNode | null}
         */
        this.right = null;
    }

    /**
     * @param {Data} data
     * @returns {BinaryTreeNode}
     */
    insert(data) {
        if (data < this.data) {
            if (this.left === null) {
                this.left = new BinaryTreeNode(data);
            } else {
                this.left.insert(data);
            }
        } else {
            if (this.right === null) {
                this.right = new BinaryTreeNode(data);
            } else {
                this.right.insert(data);
            }
        }

        return this;
    }

    toString() {
        if (this.data === undefined || this.data === null) {
            return '<null>';
        }

        return String(this.data);
    }
}

const root = new BinaryTreeNode(3);
const output = printTree(root.insert(2).insert(5).insert(4).insert(6));

const answer = `>            3
>      0000000000000
>      2           5
>               0000000
>               4     6
`;

assert.equal(answer, output);
console.log('OK!');
