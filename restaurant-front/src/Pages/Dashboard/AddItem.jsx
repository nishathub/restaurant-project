import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosHookPublic from "../../Hooks/useAxiosHookPublic";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useUserRoll from "../../Hooks/useUserRoll";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";

const AddItem = () => {
  const axiosPublic = useAxiosHookPublic();
  const axiosProtected = useAxiosHookProtected();
  const { userRollData } = useUserRoll();

  const { customAlert } = useSavourYumContext();
  const [isAddItemLoading, setAddItemLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (formData) => {
    try {
      setAddItemLoading(true);
      if (userRollData === "Admin") {
        const imageBB_API = import.meta.env.VITE_IMAGEBB_API;
        const imageFile = { image: formData.image[0] };
        const imagePostRes = await axiosPublic.post(imageBB_API, imageFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!imagePostRes.data.success) {
          console.log("failed to post image to imageBB");
          return customAlert("Failed to post Item");
        }
        if (imagePostRes.data.success) {
          const newMenuItem = {
            name: formData.name,
            recipe: formData.recipe,
            image: imagePostRes.data.data.display_url,
            category: formData.category,
            price: formData.price,
          };
          const postMenuRes = await axiosProtected.post(
            "/allMenu",
            newMenuItem
          );
          if (postMenuRes.data.insertedId) {
            customAlert("Menu Added");
            reset();
          }
        }
      } else {
        customAlert("Admin Access Only!");
      }
    } catch (error) {
      console.log("from AddItem catch block", error);
      customAlert("Error Adding Item");
    } finally {
      setAddItemLoading(false);
    }
  };
  return (
    <div className="px-4 lg:pt-8">
      <div className="mb-12">
        <SectionTitle
          heading={"Add an item"}
          subHeading={"Healthy and Halal"}
        ></SectionTitle>
      </div>

      <div className="bg-[rgb(201,201,201)] p-4 rounded-md space-y-4 relative">
        {/* ABSOLUTE CUSTOM LOADING START  */}
          {isAddItemLoading && (
            <div className="absolute -top-4 left-0 h-full w-full flex justify-center items-center bg-black/50">
              <CustomLoading size={32}></CustomLoading>
            </div>
          )}
          {/* ABSOLUTE CUSTOM LOADING END  */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-gray-800">Recipe Name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              type="text"
              maxLength={20}
              placeholder="Recipe Name"
              className="input input-bordered w-full bg-[rgb(250,250,250)] text-gray-800"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 ml-4 mt-1" role="alert">
                Recipe Name is required
              </p>
            )}
          </label>
          <div className="flex gap-6">
            <div className="w-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text text-gray-800">Category*</span>
                </div>
                <select
                  {...register("category", { required: true })}
                  aria-invalid={errors.category ? "true" : "false"}
                  className="select select-bordered bg-[rgb(250,250,250)] text-gray-800"
                  defaultValue=""
                >
                  <option value={""} disabled></option>
                  <option value={"soup"}>Soup</option>
                  <option value={"pizza"}>Pizza</option>
                  <option value={"salad"}>Salad</option>
                  <option value={"dessert"}>Dessert</option>
                  <option value={"drinks"}>Drinks</option>
                </select>
              </label>
              {errors.category?.type === "required" && (
                <p className="text-red-500 ml-4 mt-1" role="alert">
                  Category is required
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text text-gray-800">Price*</span>
                </div>
                <input
                  {...register("price", { required: true })}
                  aria-invalid={errors.price ? "true" : "false"}
                  type="number"
                  placeholder="Price"
                  min={0}
                  className="input input-bordered w-full bg-[rgb(250,250,250)] text-gray-800"
                />
              </label>
              {errors.price?.type === "required" && (
                <p className="text-red-500 ml-4 mt-1" role="alert">
                  Price is required
                </p>
              )}
            </div>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-gray-800">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              aria-invalid={errors.recipe ? "true" : "false"}
              maxLength={60}
              className="textarea textarea-bordered h-32 bg-[rgb(250,250,250)] text-gray-800"
              placeholder="Recipe Details"
            ></textarea>
            {errors.recipe?.type === "required" && (
              <p className="text-red-500 ml-4 mt-1" role="alert">
                Recipe Details is required
              </p>
            )}
          </label>
          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs bg-[rgb(250,250,250)] text-gray-800"
            />
            {errors.image?.type === "required" && (
              <p className="text-red-500 ml-4 mt-1" role="alert">
                Image is required
              </p>
            )}
          </div>
          <div>
            <button type="submit" className="btn text-gray-100 cinzel-semibold">
              Add Item <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
