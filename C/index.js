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

/**
 *
 * @param {BinaryTreeNode} root
 * @returns {String}
 */
function printTree(root) {
    /**
     * @type {(String | null)[][]}
     */
    const lines = [];

    /**
     * @type {(BinaryTreeNode | null)[]}
     */
    let level = [root];

    let counter = 1;
    let widest = 0;

    while (counter !== 0) {
        /**
         * @type {(String | null)[]}
         */
        const line = [];
        /**
         * @type {(BinaryTreeNode | null)[]}
         */
        const next = [];

        counter = 0;

        level.forEach((node) => {
            if (node === null) {
                line.push(null);

                next.push(null, null);
            } else {
                const data = node.toString();
                line.push(data);

                widest = Math.max(data.length, widest);

                next.push(node.left, node.right);

                if (node.left !== null) {
                    counter += 1;
                } else if (node.right !== null) {
                    counter += 1;
                }
            }
        });

        if (widest % 2 === 1) {
            widest += 1;
        }

        lines.push(line);

        level = next;
    }

    return lines.reduce((output, line, i) => {
        const nodeWidth = lines[lines.length - 1].length * (widest + 4) / Math.pow(2, i);

        if (i !== 0) {
            // Добавляет границу в виде ASCII.
            output += line.reduce((result, data, j) => {
                // Разделяет текущую ноду.
                let cornerChar = ' ';
                if (j % 2 === 1) {
                    if (line[j - 1] !== null) {
                        // cornerChar = data !== null ? '┴' : '┘';
                        cornerChar = data !== null ? '0' : '0';
                    } else if (j < line.length && data !== null) {
                        // cornerChar = '└';
                        cornerChar = '0';
                    }
                }
                result += cornerChar;

                // Добавляет линии и пробелы.
                if (data === null) {
                    result += ' '.repeat(nodeWidth - 1);
                } else {
                    const middle = nodeWidth / 2 - 1;

                    // const leftChar = j % 2 === 0 ? ' ' : '─';
                    const leftChar = j % 2 === 0 ? ' ' : '0';
                    result += leftChar.repeat(Math.ceil(middle));

                    // result += j % 2 === 0 ? '┌' : '┐';
                    result += j % 2 === 0 ? '0' : '0';

                    if (j !== line.length - 1) {
                        // const rightChar = j % 2 === 0 ? '─' : ' ';
                        const rightChar = j % 2 === 0 ? '0' : ' ';
                        result += rightChar.repeat(Math.floor(middle));
                    }
                }

                return result;
            }, '>') + '\n';
        }

        // Добавляет строки с данным нод.
        return output + line.reduce((result, data, j) => {
            data = data || '';
            const middle = nodeWidth / 2 - data.length / 2;

            result += ' '.repeat(Math.ceil(middle));

            result += data;

            // Пробелы не нужны после последнего числа в строке.
            if (j !== line.length - 1) {
                result += ' '.repeat(Math.floor(middle));
            }

            return result;
        }, '>') + '\n';
    }, '');
}

module.exports = printTree;
