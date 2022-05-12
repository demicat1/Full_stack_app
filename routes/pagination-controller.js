// const db = require("../models/Users-pagination-v2");
// const users = db.users;
// 
// const GetPagination = (page, size) => {
//     const limit = size ? +size : 3;
//     const offset = page ? page * limit : 0;
//     return { limit, offset };
// }
// 
// exports.findAll = (req, res) => {
//     const { page, size, title } = req.query;
//     var condition = title ?
//         { title: { $regex: new ReqExp(title), $options: "i" } } :
//         {};
//     const { limit, offset } = GetPagination(page, size);
//     users.paginate(condition. { offset, limit })
//         .then((data) => {
//             res.send({
//                 totalItems: data.totalDocs,
//                 tutorials: data.docs,
//                 totalPages: data.totalPages,
//                 currentPage: data.page - 1,
//             })
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving tutorials.",
//             });
//         });
// };



//find all