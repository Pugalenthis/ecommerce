import express from "express";
const router = express.Router();
import Product from "../models/Product.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/authMiddleware.js";
// import User from "../../user/models/User.js";
import { createError } from "../utils/error.js";
import { check, validationResult } from "express-validator";

// @route   POST /api/products
// @desc    create a product
// @access  private

router.post(
  "/",
  check("name", "Product Name  is Required").notEmpty(),
  check("image", "Product image  is Required").notEmpty(),
  check("brand", "Product brand  is Required").notEmpty(),
  check("category", "Product category  is Required").notEmpty(),
  check("description", "Product description  is Required").notEmpty(),
  check("price", "Product price  is Required").notEmpty(),
  check("countInStock", "Product countInStock  is Required").notEmpty(),
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, { errors: errors.array() }));
    }

    try {
      const product = await Product.findOne({ _id: req.user.id });
      const newProduct = new Product({
        ...req.body,
        user: req.user.id,
      });
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/products/getallproducts
// @desc    get all products
// @access  public

router.get("/getallproducts", async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({ products, page, pageSize: Math.ceil(count / pageSize) });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/:product_id
// @desc    get product by Id
// @access  public

router.get("/:product_id", async (req, res, next) => {
  console.log("entered into get single product", req.params);
  try {
    const product = await Product.findOne({ _id: req.params.product_id });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/products/:product_id
// @desc    delete product by Id
// @access  private

router.delete(
  "/:product_id",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      await Product.findOneAndRemove({ _id: req.params.product_id });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/products/:product_id
// @desc    update a product
// @access  private

router.put("/:product_id", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    // const product = await Product.findOne({ _id: req.params.post_id });
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.product_id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/post/like/:post_id
// @desc    like a post
// @access  private

router.put(
  "/review/:product_id",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      const post = await Product.findOne({ _id: req.params.product_id });
      if (
        post.reviews.some((review) => review.user.toString() == req.user.id)
      ) {
        return next(createError(400, "you have already review the post"));
      }

      console.log({ ...req.body, user: req.user.id });
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.product_id },
        {
          $push: { reviews: { ...req.body, user: req.user.id } },
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// // @route   PUT /api/post/unlike/:post_id
// // @desc    unlike a post
// // @access  private

// router.put("/unlike/:post_id", async (req, res, next) => {
//   try {
//     let unlike = { user: req.user.id };
//     const post = await Post.findOne({ _id: req.params.post_id });
//     if (!post.likes.some((like) => like.user.toString() == req.user.id)) {
//       return next(createError(400, "you haven't liked the post"));
//     }
//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: req.params.post_id },
//       {
//         $pull: { likes: unlike },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     next(error);
//   }
// });

// // @route   PUT /api/post/unlike/:post_id
// // @desc    delete a comment
// // @access  private

// router.put("/delete/:post_id/:comment_id", async (req, res, next) => {
//   try {
//     const post = await Post.findOne({
//       _id: req.params.post_id,
//     });
//     let comment = post.comments.find(
//       (comment) => comment._id == req.params.comment_id
//     );

//     if (comment.user.toString() != req.user.id) {
//       return next(createError(400, "you are not authorized"));
//     }
//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: req.params.post_id },
//       {
//         $pull: { comments: { _id: req.params.comment_id } },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
