
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="max-w-7xl mx-auto my-8 lg:my-12 text-center w-fit">
            {/* SUBHEADING  */}
            <div className="p-2 lg:p-4">
               <p className="text-lg lg:text-xl text-red-500 capitalize italic">{subHeading}</p> 
            </div>
            {/* HEADING  */}
            <div className="lg:pt-3 lg:pb-4 py-2 px-4 border-y-2 border-gray-200">
                <h4 className="text-2xl lg:text-4xl uppercase text-gray-200 cinzel-regular">{heading}</h4>
            </div>
        </div>
    );
};

export default SectionTitle;