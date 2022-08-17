import React, { useEffect, useState } from "react";
import {
  addCategory,
  editCateogry,
  getCategory,
  searchCategories,
} from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import debounce from "debounce-promise";
import AsyncSelect from "react-select/async";
import ImageSelector from "../../Components/Elements/Form/ImageSelector";
import { useMutation, useQuery } from "react-query";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Error from "../../Components/Elements/Modals/Modal.Error";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import { buildFormData, convertToLabelValue } from "../../Util/helpers";

export default function AddMainCategory() {
  const navigation = useNavigate();
  const { id } = useParams();

  const [info, setInfo] = useState({
    id: "",
    name: "",
    status: true,
    description: "",
    category_image: "",
    parent : '',
    // sub_categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [old_sub_categories, setOldSubCategories] = useState([]);

  useEffect(() => {
    handleGetCategories();
  }, []);

  const { isLoading: loadingCategory } = useQuery(
    ["category", id],
    () => id && getCategory(id),
    {
      onSuccess: (res) => {
        const category = res?.data?.category;
        setInfo({
          id: category?._id,
          name: category?.name,
          status: category?.status,
          description: category?.description,
          category_image: category?.category_image,
          parent : category?.parent,
        });
        setOldSubCategories(category?.sub_categories);
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleGetCategories = async (inputValue, callback) => {
    const { data } = await searchCategories(inputValue);
    // data?.categories.push({label : 'Select Category'})  
    if (callback) await callback(data?.categories);
     setCategories(data?.categories);
  };

  const debounceLoadCategories = (inputValue, callBack) =>
    debounce(handleGetCategories(inputValue, callBack), 500, {
      leading: true,
    });

  const { mutate, isLoading } = useMutation(
    (data) => (id ? editCateogry(data) : addCategory(data)),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        navigation("/category/logs");
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const handleSubmit = () => {
    const { id, name, status, description, category_image, parent } =
      info;

    
      if (!category_image && !id)
        return Error("Please Select an image");
    
    const form_data = new FormData();
    buildFormData(form_data,{...info,status : (status?1:0)});

    mutate(form_data);
  };

  const getParent = (id)=> {
      return categories?.find(category => category.value == id) || null;
  };
  return (
    <AppRoot loading={loadingCategory}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Link to="/category/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">
                      {id ? "Update" : "Add"} Category
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <div className="row">
                      <div className="col-xl-9">
                        <form action>
                          <div className="row align-items-center">
                            <div className="col-xl-4 mt-1">
                              <label htmlFor className="all-label">
                                Category Title<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-8 mt-xl-1">
                              <Input
                                type="text"
                                className="p-1 dash-input mt-1"
                                placeholder="Enter Title"
                                value={info?.name}
                                onChange={(name) => setInfo({ ...info, name })}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-4 mt-1">
                              <label htmlFor className="all-label label">
                                Parent<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-8 mt-xl-1">
                              <AsyncSelect
                                loadOptions={(inputValue, callBack) =>
                                  debounceLoadCategories(
                                    inputValue,
                                    callBack
                                  )
                                }
                                onChange={(opt) => {
                                  setInfo({ ...info, parent: opt?.value });
                                }}
                                defaultOptions={categories}
                                value={getParent(info?.parent)}
                                styles={{
                                  control: (styles) => ({
                                    ...styles,
                                    cursor: "pointer",
                                  }),
                                }}
                                placeholder=""
                              />
                              <span>Note: Leave parent category field empty in order to add category as parent.</span>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 py-lg-5 py-2 pl-lg-5 mt-3">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="description-hading">
                          Description And Image
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-8">
                        <textarea
                          rows={8}
                          className="p-1 dash-input mt-1"
                          placeholder="Enter Description (100 words only)"
                          value={info?.description}
                          onChange={(e) =>
                            e.target.value?.length <= 100 &&
                            setInfo({ ...info, description: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-xl-4 mt-xl-auto mt-2">
                        <ImageSelector
                          value={info?.category_image}
                          onChange={(category_image) =>
                            setInfo({ ...info, category_image })
                          }
                          is_edit
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        loading={isLoading}
                        onClick={handleSubmit}
                        className="site-btn d-inline-block mr-1 mt-1"
                      >
                        {id ? "UPDATE" : "ADD"}
                      </Button>
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
