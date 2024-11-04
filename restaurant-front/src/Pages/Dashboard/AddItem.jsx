import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

const AddItem = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="px-4 pt-8">
      <div className="mb-12">
        <SectionTitle
          heading={"Add an item"}
          subHeading={"Healthy and Halal"}
        ></SectionTitle>
      </div>
      <div className="bg-gray-700 text-gray-200 p-4 rounded-md space-y-4">
        <form
        className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name")}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category")}
                className="select select-bordered"
              >
                <option disabled selected>
                  Category
                </option>
                <option value={"soup"}>Soup</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"salad"}>Salad</option>
                <option value={"dessert"}>Dessert</option>
                <option value={"drinks"}>Drinks</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price")}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-32"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          <input
            {...register("image")}
            type="file"
            className="file-input w-full max-w-xs"
          />
          <div>
            <button className="btn cinzel-semibold">Add Item <FaUtensils/></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
