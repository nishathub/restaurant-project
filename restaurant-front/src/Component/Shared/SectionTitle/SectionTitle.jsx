
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="max-w-7xl mx-auto my-8 text-center w-fit">
            {/* SUBHEADING  */}
            <div className="p-4">
               <p className="text-lg lg:text-xl text-red-500 italic">{subHeading}</p> 
            </div>
            {/* HEADING  */}
            <div className="pt-3 pb-4 px-4 border-y-2 border-gray-600">
                <h4 className="text-2xl lg:text-4xl uppercase text-gray-200">{heading}</h4>
            </div>
        </div>
    );
};

export default SectionTitle;