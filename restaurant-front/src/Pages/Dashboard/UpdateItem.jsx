import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosHookPublic from "../../Hooks/useAxiosHookPublic";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useEffect, useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useUserRoll from "../../Hooks/useUserRoll";
import { useNavigate, useParams } from "react-router-dom";
import useMenu from "../../Hooks/useMenu";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
const UpdateItem = () => {
  const axiosPublic = useAxiosHookPublic();
  const axiosProtected = useAxiosHookProtected();
  const { userRollData } = useUserRoll();
  const { customAlert } = useSavourYumContext();
  const [isUpdateItemLoading, setUpdateItemLoading] = useState(false);
  const { menuItemId } = useParams();
  const { allMenuItems } = useMenu();
  const editMenuItem = allMenuItems.find((item) => item._id === menuItemId);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {},
  });
  useEffect(() => {
    if (editMenuItem) {
      reset({
        name: editMenuItem.name,
        category: editMenuItem.category,
        price: editMenuItem.price,
        recipe: editMenuItem.recipe,
      });
    }
  }, [editMenuItem, reset]);
  const onSubmit = async (formData) => {
    try {
      setUpdateItemLoading(true);
      if (userRollData === "Admin") {
        const imageBB_API = import.meta.env.VITE_IMAGEBB_API;
        const imageFile = { image: formData?.image[0] };
        let updatedMenuItem = {};
        // if image file selected, then we post it to imageBB and get the url
        // If image is not selected, we sent an empty string value of image property to the backend and handle there to properly update the menuItem.
        if (imageFile.image) {
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
            updatedMenuItem = {
              recipeName: formData.name,
              recipeDetails: formData.recipe,
              recipeImage: imagePostRes.data.data.display_url,
              recipeCategory: formData.category,
              recipePrice: formData.price,
            };
          }
        } else {
          updatedMenuItem = {
            recipeName: formData.name,
            recipeDetails: formData.recipe,
            recipeImage: "",
            recipeCategory: formData.category,
            recipePrice: formData.price,
          };
        }
        // After getting updated menuItem according to imageFile value, we proceed to update API call
        const patchMenuItem = await axiosProtected.patch(
          `/allMenu/${menuItemId}`,
          updatedMenuItem
        );
        if (patchMenuItem.data.modifiedCount) {
          customAlert("Menu Updated");
          reset();
          setTimeout(() => {
            navigate('/dashboard/manageItems');
          }, 1000);
          
        }
      } else {
        customAlert("Admin Access Only!");
      }
    } catch (error) {
      console.log("from updateItem catch block", error);
      customAlert("Error Updating Item");
    } finally {
      setUpdateItemLoading(false);
    }
  };
  return (
    <div className="px-4 pt-8">
      <div className="mb-12">
        <SectionTitle
          heading={`Update ${editMenuItem?.name}`}
          subHeading={"Keep Improving"}
        ></SectionTitle>
      </div>

      <div className="bg-gray-700 text-gray-200 p-4 rounded-md space-y-4 relative">
        {/* ABSOLUTE CUSTOM LOADING START  */}
        {isUpdateItemLoading && (
          <div className="absolute -top-4 left-0 h-full w-full flex justify-center items-center bg-white/30">
            <CustomLoading size={32}></CustomLoading>
          </div>
        )}
        {/* ABSOLUTE CUSTOM LOADING END  */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name")}
              type="text"
              maxLength={20}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-6">
            <div className="w-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
                <select
                  {...register("category")}
                  className="select select-bordered"
                >
                  <option value={""} disabled></option>
                  <option value={"soup"}>Soup</option>
                  <option value={"pizza"}>Pizza</option>
                  <option value={"salad"}>Salad</option>
                  <option value={"dessert"}>Dessert</option>
                  <option value={"drinks"}>Drinks</option>
                </select>
              </label>
            </div>
            <div className="w-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
                {/* TO BE ABLE TO SET FLOAT NUMBER, step: 'any' and valueAsNumber MENTIONED  */}
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="Price"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe")}
              maxLength={60}
              className="textarea textarea-bordered h-32"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          <div>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
            
          </div>
          <div>
            <button type="submit" className="btn cinzel-semibold">
              Update Item <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
