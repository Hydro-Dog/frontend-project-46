// import generateDiffTree from '../src/utils/generateDiffTree.js';
// import path from 'node:path';

// test('compare nested values', () => {
//   expect(generateDiffTree(json3, json4)).toEqual(
//   {
//     "key": "common",
//     "children": [
//       {
//         "key": "follow",
//         "status": "added",
//         "value": false,
//         "type": "leaf"
//       },
//       {
//         "key": "setting1",
//         "status": "same",
//         "value": "Value 1",
//         "type": "leaf"
//       },
//       {
//         "key": "setting2",
//         "status": "removed",
//         "value": 200,
//         "type": "leaf"
//       },
//       {
//         "key": "setting3",
//         "status": "updated",
//         "prevValue": true,
//         "newValue": null,
//         "type": "leaf"
//       },
//       {
//         "key": "setting4",
//         "status": "added",
//         "value": "blah blah",
//         "type": "leaf"
//       },
//       {
//         "key": "setting5",
//         "status": "added",
//         "value": {
//           "key5": "value5"
//         },
//         "type": "leaf"
//       },
//       {
//         "key": "setting6",
//         "children": [
//           {
//             "key": "doge",
//             "children": [
//               {
//                 "key": "wow",
//                 "status": "updated",
//                 "prevValue": "",
//                 "newValue": "so much",
//                 "type": "leaf"
//               }
//             ],
//             "status": "changed",
//             "type": "tree"
//           },
//           {
//             "key": "key",
//             "status": "same",
//             "value": "value",
//             "type": "leaf"
//           },
//           {
//             "key": "ops",
//             "status": "added",
//             "value": "vops",
//             "type": "leaf"
//           }
//         ],
//         "status": "changed",
//         "type": "tree"
//       }
//     ],
//     "status": "changed",
//     "type": "tree"
//   },
//   {
//     "key": "group1",
//     "children": [
//       {
//         "key": "baz",
//         "status": "updated",
//         "prevValue": "bas",
//         "newValue": "bars",
//         "type": "leaf"
//       },
//       {
//         "key": "foo",
//         "status": "same",
//         "value": "bar",
//         "type": "leaf"
//       },
//       {
//         "key": "nest",
//         "status": "updated",
//         "prevValue": {
//           "key": "value"
//         },
//         "newValue": "str",
//         "type": "leaf"
//       }
//     ],
//     "status": "changed",
//     "type": "tree"
//   },
//   {
//     "key": "group2",
//     "status": "removed",
//     "value": {
//       "abc": 12345,
//       "deep": {
//         "id": 45
//       }
//     },
//     "type": "leaf"
//   },
//   {
//     "key": "group3",
//     "status": "added",
//     "value": {
//       "deep": {
//         "id": {
//           "number": 45
//         }
//       },
//       "fee": 100500
//     },
//     "type": "leaf"
//   }
//   )
// });


// // [
// //   {
// //     "key": "common",
// //     "children": [
// //       {
// //         "key": "follow",
// //         "status": "added",
// //         "value": false,
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting1",
// //         "status": "same",
// //         "value": "Value 1",
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting2",
// //         "status": "removed",
// //         "value": 200,
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting3",
// //         "status": "updated",
// //         "prevValue": true,
// //         "newValue": null,
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting4",
// //         "status": "added",
// //         "value": "blah blah",
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting5",
// //         "status": "added",
// //         "value": {
// //           "key5": "value5"
// //         },
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "setting6",
// //         "children": [
// //           {
// //             "key": "doge",
// //             "children": [
// //               {
// //                 "key": "wow",
// //                 "status": "updated",
// //                 "prevValue": "",
// //                 "newValue": "so much",
// //                 "type": "leaf"
// //               }
// //             ],
// //             "status": "changed",
// //             "type": "tree"
// //           },
// //           {
// //             "key": "key",
// //             "status": "same",
// //             "value": "value",
// //             "type": "leaf"
// //           },
// //           {
// //             "key": "ops",
// //             "status": "added",
// //             "value": "vops",
// //             "type": "leaf"
// //           }
// //         ],
// //         "status": "changed",
// //         "type": "tree"
// //       }
// //     ],
// //     "status": "changed",
// //     "type": "tree"
// //   },
// //   {
// //     "key": "group1",
// //     "children": [
// //       {
// //         "key": "baz",
// //         "status": "updated",
// //         "prevValue": "bas",
// //         "newValue": "bars",
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "foo",
// //         "status": "same",
// //         "value": "bar",
// //         "type": "leaf"
// //       },
// //       {
// //         "key": "nest",
// //         "status": "updated",
// //         "prevValue": {
// //           "key": "value"
// //         },
// //         "newValue": "str",
// //         "type": "leaf"
// //       }
// //     ],
// //     "status": "changed",
// //     "type": "tree"
// //   },
// //   {
// //     "key": "group2",
// //     "status": "removed",
// //     "value": {
// //       "abc": 12345,
// //       "deep": {
// //         "id": 45
// //       }
// //     },
// //     "type": "leaf"
// //   },
// //   {
// //     "key": "group3",
// //     "status": "added",
// //     "value": {
// //       "deep": {
// //         "id": {
// //           "number": 45
// //         }
// //       },
// //       "fee": 100500
// //     },
// //     "type": "leaf"
// //   }
// // ]