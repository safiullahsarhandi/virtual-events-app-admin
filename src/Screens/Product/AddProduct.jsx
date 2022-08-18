import React, { useEffect, useRef, useState } from "react";
import debounce from "debounce-promise";
import { useMutation, useQuery } from "react-query";
import AsyncSelect from "react-select/async";

import AppRoot from "../../Components/AppRoot";
import Input from "../../Components/Elements/Form/Input";
import InputNumber from "../../Components/Elements/Form/InputNumber";
import ImageSelectDropzone from "../../Components/Elements/Form/ImageSelectDropzone";
import Button from "../../Components/Elements/Form/Button";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Error from "../../Components/Elements/Modals/Modal.Error";

import { Editor } from "@tinymce/tinymce-react";

import {
  addProduct,
  editProduct,
  getMinAttributes,
  getProductDetails,
  searchCategories,
  searchSubCategories,
} from "../../Apis";
import { Link, useNavigate, useParams } from "react-router-dom";
import SimpleSlider from "../../Components/Elements/Carousel/SimpleSlider";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import { buildFormData } from "../../Util/helpers";

export default function AddProduct() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [info, setInfo] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    status: true,
    about_product: "",
    attributes: [],
    images: [],
    sub_category : {},
  });
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState();
  const [categories, setCategories] = useState([]);
  const [sub_categories, setSubCategories] = useState([]);
  const [existing_images, setExistingImages] = useState([]);

  const editorRef = useRef(null);

  useEffect(() => {
    handleGetAttributes();
    handleGetCategories();
  }, []);

  const { data, isLoading: loadingProduct } = useQuery(
    ["product", id],
    () => id && getProductDetails(id),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(()=> {
    if(info?.category){
      setInfo({...info,sub_category : {}});
      // info?.sub_category = {};
      handleGetSubCategories();
    }
  },[info?.category]);

  useEffect(() => {
    if (data?.data?.product) {
      const product = data?.data?.product;
      getSubCategories({parent : product?.category?._id});
      
      setInfo({
        id: product?._id,
        name: product?.name,
        category: {
          label: product?.category?.name,
          value: product?.category?._id,
        },
        price: product?.price,
        status: product?.status,
        about_product: product?.about_product,
        attributes: product?.attributes,
        images: [],
        sub_category : {
          label: product?.sub_category?.name,
          value: product?.sub_category?._id,
        },
      });
      setExistingImages(product?.images);
    }
  }, [data?.data?.product]);

  const handleGetAttributes = async (inputValue, callback) => {
    const { data } = await getMinAttributes(inputValue);
    const formatted = [];
    data?.attributes?.forEach((attribute) => {
      formatted.push({
        label: attribute?.name,
        value: attribute?._id,
        attribute_values: attribute?.attribute_values,
      });
    });

    if (callback) await callback(formatted);
    else setAttributes(formatted);
  };

  const debouncedLoadAttributes = (inputValue, callBack) =>
    debounce(handleGetAttributes(inputValue, callBack), 500, {
      leading: true,
    });

  const handleGetCategories = async (inputValue, callback) => {
    const { data } = await searchCategories(inputValue);

    if (callback) await callback(data?.categories);
    else setCategories(data?.categories);
  };

  const handleGetSubCategories = async (inputValue, callback) => {
    const { data } = await searchSubCategories(inputValue,{parent : info?.category?.value});

    if (callback) await callback(data?.sub_categories);
    else setSubCategories(data?.sub_categories);
  };

  const getSubCategories = async (params = {},callback) => {
    const { data } = await searchSubCategories(params);

    if (callback) await callback(data?.sub_categories);
    else setSubCategories(data?.sub_categories);
  };

  const debounceLoadCategories = (inputValue, callBack) =>
    debounce(handleGetCategories(inputValue, callBack), 500, {
      leading: true,
    });

    const debounceLoadSubCategories = (inputValue, callBack) =>
    debounce(handleGetSubCategories(inputValue, callBack), 500, {
      leading: true,
    });

  const { mutate, isLoading } = useMutation(
    (data) => (info?.id ? editProduct(data) : addProduct(data)),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        navigation("/product/logs");
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const handleSubmit = () => {
    const {
      id,
      name,
      category,
      price,
      status,
      about_product,
      attributes,
      images,
      sub_category
    } = info;
    let is_error = false;
    if (attributes.length === 0)
      return Error("Please Select Atleast One Attribute");
    attributes.forEach((attr) => {
      if (attr?.attribute_values?.length === 0)
        return Error("Please Select Atleast One Sub Attribute");

      for (let i = 0; i < attr?.attribute_values?.length; i++) {
        if (!attr?.attribute_values[i]?.price) {
          is_error = true;
          Error("Please Enter Price For Sub Attributes");
          break;
        }
      }
    });
    if (images?.length === 0 && existing_images?.length === 0)
      return Error("Please Select Images");

    const form_data = new FormData();
    
    buildFormData(form_data,{
      ...info,
      category : category?.value,
      sub_category : sub_category?.value,
      status : (status?1:0),
      attributes : JSON.stringify(attributes),
    });
    if (existing_images?.length > 0)
      form_data.append("existing_images", JSON.stringify(existing_images));

    if (!is_error) mutate(form_data);
  };

  const handleDeleteImage = (index) => {
    const temp_data = [...existing_images];
    temp_data.splice(index, 1);
    setExistingImages(temp_data);
  };
  const getSelectedSubCategory = async (id)=> {
    let sub_category = sub_categories?.find(category => category.value == id) || null;
    setInfo({...info,sub_category});
};
  return (
    <AppRoot loading={isLoading || loadingProduct}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-center">
                    <Link to="/product/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">{id?'Edit':'Add'} Product</h5>
                  </div>
                </div>
                <div className="white-div mt-3 p-lg-3">
                  <div className="white-div-2 py-lg-5">
                    <ImageSelectDropzone
                      files={info?.images}
                      setFiles={(images) => setInfo({ ...info, images })}
                      accept="image/*"
                      maxFiles={10}
                    />
                    {existing_images?.length > 0 && (
                      <>
                        <div className="col-xl-3 mt-1">
                          <label htmlFor className="all-label">
                            Existing Images<span className="red">*</span>
                          </label>
                        </div>
                        <SimpleSlider
                          images={existing_images}
                          enable_delete={true}
                          handleDeleteImage={(index) =>
                            Confirmation(
                              "Are You Sure You Want To Delete This Image? This Action Will Permenantly Delete This Image",
                              "Yes! I'm Sure!",
                              () => handleDeleteImage(index)
                            )
                          }
                        />
                      </>
                    )}
                  </div>
                  <div className="white-div-2 py-5 pl-lg-5 mt-lg-5 mt-3">
                    <div className="row">
                      <div className="col-xl-9">
                        <form action>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Product Title<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <Input
                                type="text"
                                className="p-1 dash-input mt-1"
                                placeholder="Enter Name"
                                value={info?.name}
                                onChange={(name) => setInfo({ ...info, name })}
                                max={64}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Category<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <div className="form-field mb-0">
                                <AsyncSelect
                                  loadOptions={(inputValue, callBack) =>
                                    debounceLoadCategories(inputValue, callBack)
                                  }
                                  onChange={(opt) => {
                                    setInfo({ ...info, category: opt });
                                  }}
                                  defaultOptions={categories}
                                  value={info?.category}
                                  styles={{
                                    control: (styles) => ({
                                      ...styles,
                                      cursor: "pointer",
                                    }),
                                  }}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Sub Category<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <div className="form-field mb-0">
                                <AsyncSelect
                                  loadOptions={(inputValue, callBack) =>
                                    debounceLoadSubCategories(inputValue, callBack)
                                  }
                                  onChange={(opt) => {
                                    setInfo({ ...info, sub_category: opt });
                                  }}
                                  defaultOptions={sub_categories}
                                  value={info?.sub_category}
                                  styles={{
                                    control: (styles) => ({
                                      ...styles,
                                      cursor: "pointer",
                                    }),
                                  }}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Base Price<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <div className="form-group">
                                <InputNumber
                                  type="text"
                                  className="p-1 dash-input mt-1"
                                  placeholder="$ Enter Price"
                                  value={info?.price}
                                  onChange={(price) =>
                                    setInfo({ ...info, price })
                                  }
                                  max={11}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Status<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <div className="form-field mb-0">
                                <select
                                  className="select-dropd-2"
                                  value={info?.status}
                                  onChange={(e) =>
                                    setInfo({ ...info, status: e.target.value })
                                  }
                                >
                                  <option value={true}>Active</option>
                                  <option value={false}>Inactive</option>
                                </select>
                                <i
                                  className="fa fa-chevron-down right-icon select-drop"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Description<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-8 mt-xl-1">
                              <Editor
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  height: 500,
                                  menubar: false,
                                  plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                  ],
                                  toolbar:
                                    "undo redo | formatselect | " +
                                    "fontsizeselect | bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                  content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                }}
                                value={info?.about_product}
                                onEditorChange={(about_product) =>
                                  setInfo({ ...info, about_product })
                                }
                              />
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Select Attributes<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-8 mt-xl-1">
                              <div className="white-div-33">
                                <AsyncSelect
                                  loadOptions={(inputValue, callBack) =>
                                    debouncedLoadAttributes(
                                      inputValue,
                                      callBack
                                    )
                                  }
                                  onChange={(opt) => {
                                    setSelectedAttribute(opt);
                                  }}
                                  defaultOptions={attributes}
                                  value={selectedAttribute}
                                  placeholder=""
                                  isClearable
                                  styles={{
                                    control: (styles) => ({
                                      ...styles,
                                      cursor: "pointer",
                                    }),
                                    // Fixes the overlapping problem of the component
                                    menu: (provided) => ({
                                      ...provided,
                                      zIndex: 9999,
                                    }),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center mt-2">
                            <div className="col-lg-8 offset-lg-3">
                              <div className="d-flex">
                                {selectedAttribute?.attribute_values?.map(
                                  (attribute_value, index) => (
                                    <div className="mr-1" key={index}>
                                      <div className="tag-cstm position-relative">
                                        {attribute_value?.name}
                                        <button
                                          className="btn-close"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            const temp = [
                                              ...selectedAttribute?.attribute_values,
                                            ];
                                            temp.splice(index, 1);
                                            setSelectedAttribute({
                                              ...selectedAttribute,
                                              attribute_values: temp,
                                            });
                                          }}
                                        >
                                          <i className="fas fa-times" />
                                        </button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              {selectedAttribute && (
                                <Button
                                  className="site-btn d-inline-block mr-1 mt-1 float-right"
                                  onClick={() => {
                                    const temp = [...info.attributes];
                                    const already = temp.find(
                                      (attr) =>
                                        selectedAttribute.value === attr.value
                                    );
                                    if (already)
                                      return Error("Attribute Already Added");

                                    temp.push(selectedAttribute);
                                    setInfo({ ...info, attributes: temp });
                                    setSelectedAttribute();
                                  }}
                                >
                                  ADD SELECTION
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Selected Attributes
                                <span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-8 mt-xl-1">
                              {info?.attributes?.length === 0 && (
                                <label htmlFor className="all-label">
                                  No Attributes Selected Yet
                                </label>
                              )}
                              {info?.attributes?.map((attr, index) => (
                                <div
                                  className="row align-items-center"
                                  key={attr?.value}
                                >
                                  <div
                                    className="col-xl-12 mt-1"
                                    style={{ textAlign: "center" }}
                                  >
                                    <div className="mr-1">
                                      <div className="tag-cstm position-relative">
                                        {attr?.label}
                                        <button
                                          className="btn-close"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            const temp = [...info?.attributes];
                                            temp.splice(index, 1);
                                            setInfo({
                                              ...info,
                                              attributes: temp,
                                            });
                                          }}
                                        >
                                          <i className="fas fa-times" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {attr?.attribute_values?.map(
                                    (sub_attr, index_sub) => (
                                      <>
                                        <div
                                          className="col-xl-6 mt-1"
                                          key={sub_attr?._id}
                                        >
                                          <label
                                            htmlFor
                                            className="all-label white-div-33"
                                          >
                                            {sub_attr?.name}
                                            <span className="red">*</span>
                                          </label>
                                        </div>
                                        <div className="col-xl-6 mt-xl-1">
                                          <div className="form-field mb-0">
                                            <InputNumber
                                              type="text"
                                              className="p-1 dash-input mt-1"
                                              placeholder="$ Enter Price"
                                              value={sub_attr?.price}
                                              onChange={(price) => {
                                                const temp = [
                                                  ...info?.attributes,
                                                ];
                                                temp[index].attribute_values[
                                                  index_sub
                                                ].price = price;
                                                setInfo({
                                                  ...info,
                                                  attributes: temp,
                                                });
                                              }}
                                              max={11}
                                            />
                                          </div>
                                        </div>
                                      </>
                                    )
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              loading={isLoading}
                              onClick={handleSubmit}
                              className="site-btn d-inline-block mr-1 mt-1"
                            >
                              {info?.id ? "UPDATE" : "ADD"}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
