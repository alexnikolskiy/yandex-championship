const assert = require('assert').strict;
const printTree = require('./index');
const { default: BinaryTreeNode } = require('./index');
import BinaryTreeNodeType from './index';

const root: BinaryTreeNodeType = new BinaryTreeNode(3);
const output: string = printTree(root.insert(2).insert(5).insert(4).insert(6));
const answer: string = `>            3
>      0000000000000
>      2           5
>               0000000
>               4     6
`;

assert.equal(answer, output);
console.log('OK!');
