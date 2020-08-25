import React, { useState } from "react";
import { Product, EditProduct } from "../../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// styling
import profile from "../../../styles/scss/vendor/a_vendors_profile.module.scss";
import v_products from "../../../styles/scss/vendor/a_vendors_products.module.scss";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const VendorProducts = ({
  products,
  vendorId,
  reloadProducts,
  setReloadProducts,
}) => {
  // Opens EditingProduct MODAL
  const [editingProd, setEditingProd] = useState(false); // change back to false
  // Passed to EditingProdcut MODAL // 5e1c9cedcb86ae00173f8aee change back to ""
  const [editingProdId, setEditingProdId] = useState("");
  const [trigger, setTrigger] = useState(false);


  const showEditProduct = (prodId) => {
    setEditingProdId(prodId);
    setEditingProd(true);
  };

  const createNewProduct = async () => {
    await axiosWithAuth()
      .post(`/vendors/me/products`, {
        name: "Give your product a name!",
        price: 0,
        diet_category: [],
      })
      .then((response) => {
        console.log(
          "POST NEW PRODUCT VendorProduct.js createNewProduct() res:",
          response
        );
        //POST new product, then proceed directly to editing mode with the id. I this way we can reuse the EditingProductForm as is.
        setEditingProdId(response.data[0].id);
        setEditingProd(true);
        setReloadProducts(!reloadProducts);
      })
      .catch((error) => {
        console.log("VendorProduct.js createNewProduct() error", error);
      });
  };

  return (
    <div
      className={`${profile.wrapper} ${v_products.products_wrapper}`}
      data-testid="products-wrapper"
    >
      <div
        className={`${profile.inner_container} ${v_products.products_inner_container}`}
      >
        {editingProd && (
          <EditProduct
            setEditingProd={setEditingProd}
            product_id={editingProdId}
            reloadProducts={reloadProducts}
            setReloadProducts={setReloadProducts}
            showEditProduct={showEditProduct}
            trigger={trigger}
            setTrigger = {setTrigger}
          />
        )}
        <header className={v_products.vendor_product_list_title}>
          <h2>Products</h2>
        </header>

        <div className={v_products.vendor_product_list_wrapper}>
          <button
            className={v_products.add_product_btn}
            onClick={createNewProduct}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add product <br />
          </button>
          {products ? (
            products.map((p, idx) => (
              <div
                onClick={() => {
                  showEditProduct(p.id);
                }}
                className="product-wrapper"
              >
                <Product
                  key={p.id} //SHOULD NOT BE INDEX
                  name={p.name}
                  productId={p.id}
                  price={p.price}
                  img={p.imageId ? p.imageId : p.image_Id}
                  setReloadProducts={setReloadProducts}
                  reloadProducts={reloadProducts}
                />
              </div>
            ))
          ) : (
            <p>you don't have any product yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
