import React, { useState, useEffect } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import editingProduct from "../../../styles/scss/vendor/editingProduct.module.scss";
// import modal from '../../../styles/scss/browseModal.module.scss';
import { EditProductForm, ProductImageUploader } from "../../index";
// import { Modal } from '../../index';
const EditProduct = (props) => {
  const { setReloadProducts, reloadProducts, showEditProduct } = props;
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({ diet: [""] });
  // POPUP Bools
  const [editingDetails, setEditingDetails] = useState(false); // change back to false
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [allChangesSaved, setAllChangesSaved] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [productDeleted, setProductDeleted] = useState(false);
  // Bool to reload images after POST or DELETE request passed to ProductImageUploader
  const [reloadingImages, setReloadingImages] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/products/${props.product_id}`)
      .then((response) => {;
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadingImages]); // removed , [] dependency


  const delHover = (imgId, span, inOut) => {
    if (inOut === "in") {
      document.getElementById(imgId).style.border = "solid red 3px";
      document.getElementById(span).style.display = "block";
      document.getElementById(imgId).style.transition = "border .3s";
    }
    if (inOut === "out") {
      document.getElementById(imgId).style.border = "none";
      document.getElementById(span).style.display = "none";
    }
  };

  const finishedEditing = () => {
    setAllChangesSaved(true);
    setReloadProducts(!reloadProducts);
    submitProductDetails();
    props.setTrigger(!props.trigger);
    setTimeout(function () {
      setAllChangesSaved(false);
      props.setEditingProd(false);
    }, 2000);
  };

  const submitProductDetails = () => {
    setDetailsSaved(true);
    setTimeout(function () {
      setDetailsSaved(false);
    }, 1500);


    axiosWithAuth()
      .put(`/products/${product.id}`, { ...product })
      .then((res) => {
      })
      .catch((err) => {
        console.log(
          "PUT error & product_id & token:::",
          err,
          product.id,
          localStorage.getItem("token")
        );
      });
  };

  const leaveWithoutSave = () => {
    setConfirmClose(false);
    props.setEditingProd(false);
  };

  const saveAllAndClose = () => {
    const vendorId = localStorage.getItem("user_id");
    setConfirmClose(false);
    setAllChangesSaved(true);
    setReloadProducts(!reloadProducts);
    submitProductDetails();
    setTimeout(function () {
      setAllChangesSaved(false);
      props.setEditingProd(false);
    }, 2000);


    axiosWithAuth()
      .put(`/products/${product.id}`, { ...product })
      .then((res) => {
      })
      .catch((err) => {
        console.log(
          "PUT error & product_id & token:::",
          err,
          product._id,
          localStorage.getItem("token")
        );
      });
  };

  const deleteImage = (image_id) => {

    const vendorId = { vendorId: product.vendor._id };
    axiosWithAuth()
      .delete(`/product-images/${image_id}`, { data: vendorId })
      .then((res) => {
        console.log("DELETE deleteImage EditProduct.js: ", res);
        setReloadingImages(!reloadingImages);
        setImageDeleted(true);
        setTimeout(function () {
          setImageDeleted(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("deleteImage ", err.message);
      });
  };

  const deleteProduct = async () => {
    // const vendorId = { vendorId: product.vendor.id };
    await axiosWithAuth()
      .delete(`/products/${props.product_id}`)
      .then((response) => {
        setReloadProducts(!reloadProducts);
        setProductDeleted(true);

        setTimeout(function () {
          setProductDeleted(false);
          props.setEditingProd(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("Error DELETE EditProduct.js deleteProduct", err);
      });
  };

  return (
    <div className={`${editingProduct.container}`}>
      <div className={editingProduct.inner_wrapper}>
        <i
          onClick={() => setConfirmClose(true)}
          className={`fa fa-times ${editingProduct.close_x}`}
        />
        <div className={editingProduct.top_content}>
          {/* ========= Whole-Modal-POPUPS =========== */}
          {allChangesSaved && ( // big save button
            <div className={editingProduct.all_saved_popup}>
              <h3>
                {" "}
                <i className="fa fa-check" />
                &nbsp;All your changes to "<span>{product.name}</span>" have
                been saved!{" "}
              </h3>
            </div>
          )}
          {confirmDelete && ( // ask vendor if okay to delete -- sames styles as confirm_close_popup
            <div className={editingProduct.confirm_close_popup}>
              <div className={editingProduct.confirm_close_popup_info}>
                <h3>
                  {" "}
                  <i className="fa fa-exclamation" />
                  &nbsp;Are you sure you want to delete "
                  <span>{product.name}</span>"?
                </h3>
                <button onClick={deleteProduct} className="btn btn-danger">
                  Delete Product
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="btn btn-primary"
                >
                  Back to Editing
                </button>
              </div>
            </div>
          )}
          {productDeleted && ( // confirmation product was deleted
            <div className={editingProduct.all_saved_popup}>
              <h3>
                <i className="fa fa-check" />
                &nbsp;Product "<span>{product.name}</span>" has been deleted!{" "}
              </h3>
            </div>
          )}
          {confirmClose && ( // asks to close the window from close x click
            <div className={editingProduct.confirm_close_popup}>
              <div className={editingProduct.confirm_close_popup_info}>
                <h3>
                  {" "}
                  <i className="fa fa-exclamation" />
                  &nbsp;Are you sure you want to close? Make sure your changes
                  to "<span>{product.name}</span>" have been saved!{" "}
                </h3>
                <button
                  onClick={leaveWithoutSave}
                  className={editingProduct.discard_changes_btn}
                >
                  Discard Changes
                </button>
                <button
                  onClick={() => setConfirmClose(false)}
                  className={editingProduct.continue_editing_btn}
                >
                  Continue Editing
                </button>
                <button
                  onClick={saveAllAndClose}
                  className={editingProduct.save_and_close_btn}
                >
                  Save and Close
                </button>
              </div>
            </div>
          )}

          {/* ============= LEFT ============================ */}
          <div
            className={`${editingProduct.edit_product_left} ${editingProduct.inner_container}`}
          >
            <div className={editingProduct.left_upper_container}>
              {/* This doesn't work yet */}
              <div className={editingProduct.add_image_btns}>
                <ProductImageUploader
                  productId={product.id}
                  setReloadingImages={setReloadingImages}
                  reloadingImages={reloadingImages}
                />
              </div>
              {/* Image deleted POPUP */}
              {imageDeleted ? ( // <<<<<< TURNARY
                <h1>
                  <i className="fa fa-check" /> Image Deleted!
                </h1>
              ) : (
                //<<<<<<<< : else:
                <div className={editingProduct.images_container}>
                  {loadingImages ? ( // <<<<<< TURNARY
                    <h1>...Loading Images</h1>
                  ) : (
                    //<<<<<<<< : else:
                    images.map((image, index) => (
                      <div
                        id={image.public_id}
                        key={image._id}
                        className={`${editingProduct.image_wrapper}`}
                      >
                        {images && (
                          <i
                            onMouseEnter={() =>
                              delHover(image.public_id, index, "in")
                            }
                            onMouseLeave={() =>
                              delHover(image.public_id, index, "out")
                            }
                            onClick={() => deleteImage(image._id)}
                            className="fa fa-minus-circle"
                          />
                        )}
                        <span id={index} className={editingProduct.delete_span}>
                          DELETE
                        </span>
                        <CloudinaryContext cloudName="quickstlabs">
                          <Image publicId={image.public_id}>
                            <Transformation
                              width="150"
                              height="150"
                              crop="fill"
                            />
                          </Image>
                        </CloudinaryContext>
                      </div>
                    ))
                  )}
                </div>
              )}{" "}
              {/* closing turnary bracket */}
            </div>
          </div>
          {/* END LEFT */}
          {/* ============= RIGHT ============================ */}

          <div
            className={`${editingProduct.edit_product_right} ${editingProduct.inner_container}`}
          >
            <div
              onClick={() => {
                setEditingDetails(!editingDetails);
              }}
            >
              {/* ==== details saved POPUP  ======*/}
              {detailsSaved && (
                <div className={editingProduct.details_saved_popup}>
                  <h3>
                    <i className="fa fa-check" /> Product Details Saved!
                  </h3>
                </div>
              )}
              <h4 className={editingProduct.edit_details_btn}>
                <i className="fa fa-edit" />
                Edit Details
              </h4>
            </div>

            {editingDetails ? ( // <<<<< TURNARY
              <EditProductForm
                product={product}
                reloadProducts={reloadProducts}
                setReloadProducts={setReloadProducts}
                setProduct={setProduct}
                submitProductDetails={submitProductDetails}
                setEditingDetails={setEditingDetails}
                showEditProduct={showEditProduct}
              />
            ) : (
              // : else do this:
              <div className={editingProduct.details_container}>
                <div className={editingProduct.details_wrapper}>
                  <div className={editingProduct.input_wrapper}>
                    <label htmlFor="">Product Name: </label>
                    <h1>{product.name}</h1>
                  </div>

                  <div className={editingProduct.input_wrapper}>
                    <label htmlFor="">Product Description: </label>
                    <p>{product.description}</p>
                  </div>

                  <div className={editingProduct.input_wrapper}>
                    <label htmlFor="diet">Dietary Category(ies): </label>
                    <div className={editingProduct.diet_category_container}>
                      {product.diet_category &&
                        product.diet_category.map((category) => (
                          <p>{category} &nbsp;</p>
                        ))}
                    </div>
                  </div>
                  <div className={editingProduct.input_wrapper}>
                    <label htmlFor="">Price: </label>
                    <p>
                      ${product.price}/{product.unit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* END TOP_CONTENT */}
        <div className={editingProduct.btn_container}>
          <button
            onClick={finishedEditing}
            className={editingProduct.finished_editing_btn}
          >
            <i className="fa fa-check" /> Finished Editing
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className={editingProduct.delete_product_btn}
          >
            <i className="fa fa-exclamation-triangle" /> Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
