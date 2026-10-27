// try {
//     try {
//         throw new Error('oops');
//     } finally {
//         console.log('finally');
//     }
// } catch (ex) {
//     console.error('outer', ex.message);
// }



// try {
//     try {
//         throw new Error('oops');
//     } catch (error) {
//         console.log('inner error', error.message);
//     } finally {
//         console.log("inner finally")
//     }
// } catch (ex) {
//     console.error('outer error', ex.message);
// } finally {
//     console.log("outer finally");
// }

// try {
//     try {
//         throw new Error('oops');
//     } catch (ex) {
//         console.error('inner', ex.message);
//         throw ex;
//     } finally {
//         console.log('finally');
//     }
// } catch (ex) {
//     console.error('outer', ex.message);
// }

function sum(a, b) {
    // try {
    return a.num + b
    // } catch (error) {
    // console.log(error.message);
    // }
};

const result = sum();
console.log("result", result)