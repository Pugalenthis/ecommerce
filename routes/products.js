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
// @desc    create a produdct
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
    const products = await Product.find({}).sort({ date: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/:product_id
// @desc    get product by Id
// @access  public

router.get("/:product_id", async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.product_id });
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

// @route   PUT /api/post/like/:post_id
// @desc    like a post
// @access  private

router.put("/like/:post_id", async (req, res, next) => {
  try {
    let like = { user: req.user.id };

    const post = await Post.findOne({ _id: req.params.post_id });
    if (post.likes.some((like) => like.user.toString() == req.user.id)) {
      return next(createError(400, "you have already liked the post"));
    }
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.post_id },
      {
        $push: { likes: like },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/post/unlike/:post_id
// @desc    unlike a post
// @access  private

router.put("/unlike/:post_id", async (req, res, next) => {
  try {
    let unlike = { user: req.user.id };
    const post = await Post.findOne({ _id: req.params.post_id });
    if (!post.likes.some((like) => like.user.toString() == req.user.id)) {
      return next(createError(400, "you haven't liked the post"));
    }
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.post_id },
      {
        $pull: { likes: unlike },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/post/comment/:post_id
// @desc    comment a post
// @access  private

router.put(
  "/comment/:post_id",
  check("text", "Text is Required").notEmpty(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, { errors: errors.array() }));
    }

    try {
      const user = await User.findOne({ _id: req.user.id });
      const comment = {
        ...req.body,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      const post = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        {
          $push: { comments: comment },
        },
        {
          new: true,
        }
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/post/unlike/:post_id
// @desc    delete a comment
// @access  private

router.put("/delete/:post_id/:comment_id", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.post_id,
    });
    let comment = post.comments.find(
      (comment) => comment._id == req.params.comment_id
    );

    if (comment.user.toString() != req.user.id) {
      return next(createError(400, "you are not authorized"));
    }
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.post_id },
      {
        $pull: { comments: { _id: req.params.comment_id } },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

export default router;
